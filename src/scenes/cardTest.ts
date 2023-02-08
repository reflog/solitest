import * as THREE from "three";
import { type Game } from "../game";

export class CardTestScene extends THREE.Group {
  constructor(public game: Game) {
    super();
    // const c1 = new CardContainer(game, new Card(Suit.CLUB, Rank.EIGHT, true));
    // const c2 = new CardContainer(game, new Card(Suit.SPADE, Rank.JACK, false));
    // c1.position.set(1, 0, 0);
    // c2.position.set(-1, 0, 0);
    // this.add(c1);
    // this.add(c2);
    const tl = new THREE.TextureLoader();
const cardSide = tl.load("/assets/card_side.png");
    const p1 = tl.load("/assets/p1.png");
    const p2 = tl.load("/assets/p2.png");
    const lrtex = cardSide.clone()
    lrtex.rotation = THREE.MathUtils.degToRad(-90);
    const lrside = new THREE.MeshStandardMaterial({ map: lrtex, color: 'red' })
    const tbside = new THREE.MeshStandardMaterial({ map: cardSide, color: 'blue' })
    cardSide.wrapT = THREE.ClampToEdgeWrapping;
    cardSide.wrapS = THREE.RepeatWrapping;
// cardSide.repeat.set( 1, 1 );
const materials = [
  lrside,
  lrside,
  tbside,
  tbside,
  new THREE.MeshStandardMaterial({ map: p2, transparent: true }),//, transparent: true
  new THREE.MeshStandardMaterial({ map: p2, transparent: true })
   
];
const dice = new THREE.Mesh( new THREE.BoxGeometry( 0.6, 1, 1, 1, 1, 1 ), materials );
this.add( dice );
  }
}
