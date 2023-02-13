import * as THREE from "three";
import { type Game } from "../game";
import { DeckContainer } from "../objects/deck";
import { EnemyContainer } from "../objects/enemy";
import { Heart } from "../objects/heart";
import { Playmat } from "../objects/playmat";
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
  playDeck: Deck;

  constructor(public game: Game) {
    super();
    this.deck.fill();
    this.playDeck = this.deck.subDeck(15);
    const c = this.deck.draw();
    c.open = true;
    this.grave.add(c);

    this.buildScene();
  }

  buildScene() {
    this.add(
      new EnemyContainer(this.game, [-0.5, 2.5, 0]),
      new Playmat(
        this.game,
        this.playDeck,
        this.grave,
        "playmat",
        (playmat, cc) => {
          playmat.moveCard(cc, [0.6, -2, 0]).then((cc) => {
            if (!cc) return;
            console.log("adding to grave", cc.card);
            this.grave.add(cc.card);
            console.log("grave", this.grave, this.grave.top);
          });
        }
      ),
      new DeckContainer(
        this.game,
        this.deck,
        "deck",
        (d) => {
          d.moveTopCardTo([0.6, -2, 0]).then((cc) => {
            if (!cc) return;
            cc.removeFromParent();
            const c = d.deck.draw();
            c.open = true;
            this.grave.add(c);
          });
        },
        [-0.6, -2, 0]
      ),
      new DeckContainer(this.game, this.grave, "grave", () => {}, [0.6, -2, 0]),
      new Heart(this.game)
    );
  }
}
