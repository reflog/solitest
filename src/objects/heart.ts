import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { lerp } from "three/src/math/MathUtils";
// @ts-ignore
import { Text } from "troika-three-text";
import { Game } from "../game";

function prepareText(text: string, size: number): any {
  const t = new Text();

  t.text = text;
  t.fontSize = size;
  t.textAlign = "center";
  t.anchorX = "center";
  t.anchorY = "middle";
  t.color = 0x002d2d;
  t.sync();
  return t;
}

export class Heart extends THREE.Group {
  mat: THREE.MeshStandardMaterial;
  text: any;
  _current = 0;
  _total = 100;
  update() {
    this.text.text = `${this._current}/${this._total}`;
    this.text.sync();
    this.mat.opacity = lerp(-0.5, 0.5, this._current / this._total);
    this.mat.needsUpdate = true;
  }

  public set total(v: number) {
    this._total = v;
    this.update();
  }

  public set current(v: number) {
    this._current = v;
    this.update();
  }

  constructor(private game: Game) {
    super();

    const loader = new GLTFLoader();
    let mm: THREE.MeshStandardMaterial;
    loader.load("/assets/models/heart.glb", (gltf) => {
      const m = gltf.scene.children[0] as THREE.Mesh;

      this.mat = m.material as THREE.MeshStandardMaterial;
      this.mat.transparent = true;
      this.mat.side = THREE.FrontSide;
      this.mat.onBeforeCompile = (shader, renderer) => {
        shader.vertexShader = shader.vertexShader.replace(
          "varying vec3 vViewPosition;",
          "varying vec3 vViewPosition;\nvarying vec3 vUv;"
        );
        shader.vertexShader = shader.vertexShader.replace(
          "}",
          "\nvUv = position;}"
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          "varying vec3 vViewPosition;",
          "varying vec3 vViewPosition;\nvarying vec3 vUv;"
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          `vec4 diffuseColor = vec4( diffuse, vUv.z < -1.0*opacity ? 0.5 : 1.0 );`
        );
      };
      this.add(m);
      this.update();
    });
    this.text = prepareText("10/10", 0.2);
    this.text.position.set(0.1, 0.1, 0.3);

    this.name = "heart";
    this.position.set(-2.5, -2, 0);
    this.add(this.text);
  }
}
