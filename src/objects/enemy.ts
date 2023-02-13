import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { type Game } from "../game";
const tl = new THREE.TextureLoader();
const sideTexture = tl.load("/assets/textures/stack_side.png");
const sideMat = new THREE.MeshStandardMaterial({
  map: sideTexture,
  name: "sidemat",
});
const enemyTexture = tl.load("/assets/textures/enemy.png");
enemyTexture.flipY = false;
const enemyMat = new THREE.MeshStandardMaterial({
  map: enemyTexture,
  name: "enemy",
});

export class EnemyContainer extends THREE.Group {
  meshGroup: THREE.Group;
  constructor(
    protected game: Game,
    position: [x: number, y: number, z: number]
  ) {
    super();
    this.name = "enemy";
    this.position.set(...position);
    const loader = new GLTFLoader();

    loader.load("/assets/models/enemy_stack.glb", (gltf) => {
      gltf.scene.scale.setScalar(0.25);
      this.add(gltf.scene);
      const g1 = gltf.scene.children[0] as THREE.Group;
      (g1.children[0] as THREE.Mesh).material = enemyMat;
      (g1.children[1] as THREE.Mesh).material = sideMat;

      this.meshGroup = g1;

      this.setup();
    });
  }
  setup() {}
}
