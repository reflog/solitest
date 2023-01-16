import anime from "animejs";
import * as THREE from "three";
import { Color } from "three";
import { lerp } from "three/src/math/MathUtils";
// @ts-ignore
import { Text } from "troika-three-text";
import { RangeMaterial } from "../materials/range";

function buildHeart() {
  const x = 0,
    y = 0;
  const heartShape = new THREE.Shape()
    .moveTo(x + 25, y + 25)
    .bezierCurveTo(x + 25, y + 25, x + 20, y, x, y)
    .bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35)
    .bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95)
    .bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35)
    .bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y)
    .bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
  return new THREE.ShapeGeometry(heartShape);
}
export const heartGeometry = buildHeart();

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
  mat: THREE.ShaderMaterial;
  text: any;
  _current = 10;
  _total = 10;
  update() {
    this.text.text = `${this._current}/${this._total}`;
    this.text.sync();
    this.mat.uniforms.t.value = lerp(-1, 1, this._current / this._total);
  }

  public set total(v: number) {
    this._total = v;
    this.update();
  }

  public set current(v: number) {
    this._current = v;
    this.update();
  }

  constructor() {
    super();

    this.mat = RangeMaterial(new Color("red"), 1);
    const m = new THREE.Mesh(heartGeometry, this.mat);
    this.text = prepareText("10/10", 0.2);
    this.text.position.set(0.08, -0.1, 1.0);

    this.name = "heart";
    m.scale.setScalar(0.008);
    m.rotateZ(THREE.MathUtils.degToRad(180));
    this.position.set(-1.6, -1.4, 0);
    this.add(m);
    this.add(new THREE.BoxHelper(m, 0x00ff00));
    this.add(this.text);
  }
}
