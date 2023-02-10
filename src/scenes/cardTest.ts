import * as THREE from "three";
import { type Game } from "../game";
import { DeckContainer } from "../objects/deck";
// const tl = new THREE.TextureLoader();



// const enemyTexture = tl.load('/assets/textures/enemy.png');
// const enemyMat = new THREE.MeshStandardMaterial({ map: enemyTexture, name: 'enemy' });


// fixTex(frontTexture);
// fixTex(enemyTexture);
// fixTex(cardBack1Texture);
// fixTex(cardBgTexture);

export class CardTestScene extends THREE.Group {
  constructor(public game: Game) {
    super();
    const d = new DeckContainer(game, "test", () => { }, [0, 0, 0]);
    this.add(d)
    // const c1 = new CardContainer(game, new Card(Suit.CLUB, Rank.EIGHT, true));
    // const c2 = new CardContainer(game, new Card(Suit.SPADE, Rank.JACK, false));
    // c1.position.set(1, 0, 0);
    // c2.position.set(-1, 0, 0);
    // this.add(c1);
    // this.add(c2);

    // const loader = new GLTFLoader();
    // loader.load("/assets/models/enemy_stack.glb", (gltf) => {
    //   gltf.scene.setRotationFromEuler(new THREE.Euler(0, Math.PI, 0));
    //   this.add(gltf.scene);
    //   const g1 = gltf.scene.children[0] as THREE.Group;
    //   (g1.children[0] as THREE.Mesh).material = enemyMat;
    //   (g1.children[1] as THREE.Mesh).material = sideMat;
    // });
    // loader.load("/assets/models/card.glb", (gltf) => {
    //   this.add(gltf.scene);
    //   const g1 = gltf.scene.children[0] as THREE.Group;
    //   (g1.children[0] as THREE.Mesh).material = cardBack1Mat;
    //   (g1.children[1] as THREE.Mesh).material = cardBgMat;
    // });
    // loader.load("/assets/models/stack.glb", (gltf) => {
    //   this.add(gltf.scene);

    //   const g1 = gltf.scene.children[0] as THREE.Group;
    //   (g1.children[0] as THREE.Mesh).material = frontMat;
    //   (g1.children[1] as THREE.Mesh).material = sideMat;

    // });
  }
}
