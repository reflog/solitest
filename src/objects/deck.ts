import anime from "animejs";
import * as THREE from "three";
import { MathUtils } from "three";
import { GLTFLoader } from "three-stdlib";
import { type Game } from "../game";
import { Deck } from "../types/deck";
import { CardContainer } from "./card";
const tl = new THREE.TextureLoader();
const sideTexture = tl.load('/assets/textures/stack_side.png');
const sideMat = new THREE.MeshStandardMaterial({ map: sideTexture, name: 'sidemat' });
const cardBack1Texture = tl.load('/assets/textures/card_back_1.png');
cardBack1Texture.flipY = false;
const cardBack1Mat = new THREE.MeshStandardMaterial({ map: cardBack1Texture, name: 'card_back_1' });

export class DeckContainer extends THREE.Group {
  meshGroup: THREE.Group;
  constructor(
    protected game: Game,
    public deck: Deck,
    public name: string,
    onDeckTap: (d: DeckContainer) => void,
    position: [x: number, y: number, z: number]
  ) {
    super();
    this.name = name;
    this.position.set(...position);
    const loader = new GLTFLoader();
    this.deck.addEventListener("changed", () => this.deckChanged());

    loader.load("/assets/models/stack.glb", (gltf) => {
      this.add(gltf.scene);

      const g1 = gltf.scene.children[0] as THREE.Group;
      const frontMesh = g1.children[0] as THREE.Mesh;
      frontMesh.material = cardBack1Mat;
      const sideMesh = g1.children[1] as THREE.Mesh;
      sideMesh.material = sideMat;
      g1.rotateX(THREE.MathUtils.degToRad(45));

      frontMesh.userData.interactive = true;
      frontMesh.addEventListener("clicked", (e) => {
        onDeckTap(this);
      });

      this.meshGroup = g1;

      this.setup();
    });
  }
  setup() {
    const yscale = MathUtils.lerp(0, 0.5, this.deck.cards.length / 54);
    this.meshGroup.scale.set(0.5, yscale, 0.5)
    if (!this.deck.empty() && this.deck.top.open) {
      const cc = new CardContainer(this.game, this.deck.top);
      cc.scale.setScalar(0.5)
      cc.position.setZ(yscale)
      cc.rotateX(THREE.MathUtils.degToRad(- 45));
      this.add(cc);
    }
  }

  deckChanged() {
    this.children
      .filter((x) => x instanceof CardContainer)
      .forEach((x) => x.removeFromParent());
    this.setup();
  }

  moveTopCardTo(position: [x: number, y: number, z: number]): Promise<CardContainer> {
    if (anime.running.length > 0) return Promise.resolve(null);

    const tmp = this.deck.top.clone();
    console.log("moving", tmp.string())
    const c = new CardContainer(this.game, tmp);
    c.scale.setScalar(0.5)
    c.rotateX(THREE.MathUtils.degToRad(- 45));
    c.position.setZ(0.3)
    this.add(c);



    anime({
      targets: c.position,
      z: 0.3,
      duration: 1000,
    });
    return anime({
      targets: c.rotation,
      easing: "easeInOutSine",
      keyframes: [
        { y: THREE.MathUtils.degToRad(5) },
        { y: THREE.MathUtils.degToRad(-5) },
      ],
      duration: 300,
      loop: 2,
      direction: "alternate",
    }).finished.then(() => {
      anime({
        targets: c.position,
        x: 1.2,
        z: position[2],
        duration: 1000,
      });

      return anime({
        targets: c.rotation,
        easing: "linear",
        y: THREE.MathUtils.degToRad(-180),
        duration: 100,
      }).finished.then(() => {
        return c;
      });
    });

  }

}
