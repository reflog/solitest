import { CardContainer } from "../objects/card";
import { Card } from "../types/card";
import { Suit } from "../types/suit";
import { Rank } from "../types/rank";
import * as THREE from "three";
import { type Game } from "../game";

export class CardTestScene extends THREE.Group {
  constructor(public game: Game) {
    super();
    const c1 = new CardContainer(game, new Card(Suit.CLUB, Rank.EIGHT, true));
    const c2 = new CardContainer(game, new Card(Suit.SPADE, Rank.JACK, false));
    c1.position.set(1, 0, 0);
    c2.position.set(-1, 0, 0);
    this.add(c1);
    this.add(c2);
  }
}
