import * as THREE from "three";
import { Card } from "../types/card";
import { GradientMaterial } from "../materials/gradient";
import { type Game } from "../game";
import { createCatmulRomLine } from "./catmulRomLine";
// @ts-ignore
import { Text } from "troika-three-text";

import GUI from "lil-gui";
export const CARD_WIDTH = 1;
export const CARD_HEIGHT = 1.5;
export const CARD_PADDING = 0.1;
function createRoundedRectGeometry(
  x = -0.5,
  y = -0.5,
  width = 1,
  height = 1.5,
  radius = 0.1
) {
  let shape = new THREE.Shape();
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  return new THREE.ShapeGeometry(shape);
}

function createEllipse(
  aX: number,
  aY: number,
  xRadius: number,
  yRadius: number,
  aStartAngle: number,
  aEndAngle: number,
  aClockwise: boolean,
  aRotation: number
) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.ellipse(
    aX,
    aY,
    xRadius,
    yRadius,
    aStartAngle,
    aEndAngle,
    aClockwise,
    aRotation
  );
  return shape;
}

const faceGeometry = createRoundedRectGeometry();
const faceGeometryEdges = new THREE.EdgesGeometry(faceGeometry);
const faceCircle = createEllipse(0, 0, 1, 1.4, 0, 2 * Math.PI, false, 0);
const faceCircleSmall = createEllipse(0, 0, 1, 1, 0, 2 * Math.PI, false, 0);
const faceCirclePoints = faceCircle.getPoints();
const faceCircleSmallPoints = faceCircleSmall.getPoints();
const faceCircleGeometry = new THREE.ShapeGeometry(faceCircle);
const faceCircleSmallGeometry = new THREE.ShapeGeometry(faceCircleSmall);

enum Layers {
  FrontCircle = 0.001,
  FrontCircleOutline = 0.002,
  TextRank = 0.003,
  FrontBottomCircle = 0.008,
  FrontBottomCircleOutline = 0.009,
  TextSuit = 0.01,
  Back = -0.01,
}

function prepareText(text: string, size: number) {
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

export class CardContainer extends THREE.Group {
  constructor(public game: Game, public card: Card) {
    super();

    this.name = card.string();
    this.rotateY(!card.open ? THREE.MathUtils.degToRad(180) : 0);

    const color = card.color();

    const front = new THREE.Mesh(
      faceGeometry,
      new THREE.MeshPhongMaterial({ color })
    );
    front.name = "Front";
    this.add(front);

    const frontCircle = new THREE.Mesh(
      faceCircleGeometry,
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    frontCircle.name = "FrontCircle";

    frontCircle.scale.setScalar(0.45);
    frontCircle.position.set(0, 0.3, Layers.FrontCircle);
    this.add(frontCircle);

    const back = new THREE.Mesh(
      faceGeometry,
      GradientMaterial(new THREE.Color(0xffffff), new THREE.Color(0x000000))
    );
    back.name = "Back";
    back.rotateY(THREE.MathUtils.degToRad(180));
    back.position.set(0, 0, Layers.Back);
    this.add(back);

    const frontCircOutline = createCatmulRomLine(
      faceCirclePoints,
      new THREE.Color(color)
    );
    frontCircOutline.scale.set(0.424, 0.424, 0.424);
    frontCircOutline.position.set(0.0, 0.3, Layers.FrontCircleOutline);
    frontCircOutline.name = "FrontCircOutline";
    this.add(frontCircOutline);

    const frontCircBottom = new THREE.Mesh(
      faceCircleSmallGeometry,
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    frontCircBottom.name = "FrontCircBottom";
    frontCircBottom.scale.set(0.3, 0.3, 0.3);
    frontCircBottom.position.set(0, -0.19, Layers.FrontBottomCircle);
    this.add(frontCircBottom);

    const frontCircBottomOutline1 = createCatmulRomLine(
      faceCircleSmallPoints,
      new THREE.Color(color),
      2
    );
    frontCircBottomOutline1.scale.set(0.27, 0.27, 0.27);
    frontCircBottomOutline1.position.set(
      0.0,
      -0.19,
      Layers.FrontBottomCircleOutline
    );
    frontCircBottomOutline1.name = "frontCircBottomOutline1";
    this.add(frontCircBottomOutline1);

    const frontCircBottomOutline2 = createCatmulRomLine(
      faceCircleSmallPoints,
      new THREE.Color(color)
    );
    frontCircBottomOutline2.scale.set(0.23, 0.23, 0.23);
    frontCircBottomOutline2.position.set(
      0.0,
      -0.19,
      Layers.FrontBottomCircleOutline
    );
    frontCircBottomOutline2.name = "frontCircBottomOutline2";
    this.add(frontCircBottomOutline2);

    const edge = new THREE.LineSegments(
      faceGeometryEdges,
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    this.add(edge);
    const rankText = prepareText(card.rank, 0.7);
    rankText.position.y += 0.3;
    rankText.position.z = Layers.TextRank;
    this.add(rankText);

    const suitText = prepareText(card.suit, 0.3);
    suitText.position.y = -0.23;
    suitText.position.z = Layers.TextSuit;
    this.add(suitText);
  }
}
