import * as THREE from "three";
import { type Game } from "../game";
import { Card } from "../types/card";
// @ts-ignore

import { GLTFLoader } from "three-stdlib";

enum Layers {
  FrontCircle = 0.001,
  FrontCircleOutline = 0.002,
  TextRank = 0.003,
  FrontBottomCircle = 0.008,
  FrontBottomCircleOutline = 0.009,
  TextSuit = 0.01,
  Back = -0.01,
}
const tl = new THREE.TextureLoader();
const il = new THREE.ImageLoader();
const cardBack1Texture = tl.load("/assets/textures/card_back_1.png");
const cardBack1Mat = new THREE.MeshStandardMaterial({
  map: cardBack1Texture,
  name: "card_back_1",
});

const cardBgTexture = il.load("/assets/textures/card_bg.png");
cardBack1Texture.center.set(0.5, 0.5);
cardBack1Texture.flipY = false;

function generateTexture(card: Card) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.transform(1, 0, 0, -1, 0, canvas.height);
  ctx.drawImage(cardBgTexture, 0, 0);
  ctx.fillStyle = "black";
  ctx.font = "30pt Calibri";
  ctx.textAlign = "center";
  ctx.fillText(card.string(), 256, 256);
  const color = card.color();

  return new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(canvas),
    color,
  });
}

export class CardContainer extends THREE.Group {
  backMesh: THREE.Mesh;
  frontMesh: THREE.Mesh;
  g1: THREE.Group;
  constructor(public game: Game, public card: Card) {
    super();
    const loader = new GLTFLoader();
    loader.load("/assets/models/card.glb", (gltf) => {
      this.add(gltf.scene);
      this.g1 = gltf.scene.children[0] as THREE.Group;
      this.g1.rotateX(Math.PI / 2);
      this.layout();
      this.backMesh = this.g1.children[0] as THREE.Mesh;
      this.frontMesh = this.g1.children[1] as THREE.Mesh;
      this.backMesh.material = cardBack1Mat;
      this.frontMesh.material = generateTexture(card);
    });

    this.name = card.string();
  }

  public layout() {
    this.g1.rotateZ(!this.card.open ? 0 : Math.PI);
  }
}
