import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { type Game } from "../game";
import { DeckSidesMaterial } from "../materials/side";

export class CardTestScene extends THREE.Group {
  constructor(public game: Game) {
    super();
    // const c1 = new CardContainer(game, new Card(Suit.CLUB, Rank.EIGHT, true));
    // const c2 = new CardContainer(game, new Card(Suit.SPADE, Rank.JACK, false));
    // c1.position.set(1, 0, 0);
    // c2.position.set(-1, 0, 0);
    // this.add(c1);
    // this.add(c2);
    const loader = new GLTFLoader();
    loader.load("/assets/untitled.glb", (gltf) => {
      const deck = gltf.scene.children[0];
      this.add(deck);
      const back = deck.children[0];
      const front = deck.children[2];
      const side = deck.children[1] as THREE.Mesh;
      // back.visible = false;
      // front.visible = false;
      side.material = DeckSidesMaterial();
    });
  }
}
