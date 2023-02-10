import * as THREE from "three";
import { type Game } from "../game";
import { DeckContainer } from "../objects/deck";
import { Heart } from "../objects/heart";
import { Deck } from "../types/deck";
import { Suit } from "../types/suit";
export class CardFightScene extends THREE.Group {
  counts = {
    [Suit.CLUB]: 0,
    [Suit.DIAMOND]: 0,
    [Suit.HEART]: 0,
    [Suit.SPADE]: 0,
  };
  deck = new Deck();
  grave = new Deck();

  constructor(public game: Game) {
    super();
    this.deck.fill();
    const c = this.deck.draw();
    c.open = true;
    this.grave.add(c);

    this.buildScene();
  }


  buildScene() {
    this.add(
      new DeckContainer(
        this.game,
        this.deck,
        "deck",
        (d) => {
          d.moveTopCardTo([0.6, -2, 0]).then(cc => {
            if (!cc) return;
            cc.removeFromParent();
            const c = d.deck.draw();
            c.open = true;
            this.grave.add(c);
          });
        },
        [-0.6, -2, 0]
      ),
      new DeckContainer(this.game, this.grave, "grave", () => { }, [0.6, -2, 0]),
      new Heart()
    );
  }
}
