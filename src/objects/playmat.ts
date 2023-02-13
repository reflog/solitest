import * as THREE from "three";
import { Game } from "../game";
import { Card } from "../types/card";
import { Deck } from "../types/deck";
import { ranksFit } from "../types/rank";
import { CardContainer } from "./card";

export abstract class PlaymatLayout {
  constructor(protected deck: Deck) {}
  abstract createContainer(game: Game, card: Card): CardContainer;
  abstract draw(card: Card): Card | null;
}

class ColumnsLayout extends PlaymatLayout {
  subDecks: Deck[];
  constructor(deck: Deck, private columns: number) {
    super(deck.clone());
    this.deck.cards = this.deck.shuffle();
    const sdSize = this.deck.cards.length / columns;
    this.subDecks = [];
    for (let i = 0; i < columns; i++) {
      this.subDecks.push(this.deck.subDeck(sdSize));
    }
  }
  isEmpty() {
    for (let i = 0; i < this.columns; i++) {
      if (this.subDecks[i].cards.length !== 0) return false;
    }
    return true;
  }
  createContainer(game: Game, card: Card): CardContainer {
    let x = -1;
    let y = 1;
    let z = 0;
    for (let i = 0; i < this.columns; i++) {
      const c = this.subDecks[i].cards.find((x) => x.uuid === card.uuid);
      if (c) {
        const posInStack = this.subDecks[i].cards.indexOf(c);
        y -= posInStack * 0.1;
        z += posInStack * 0.001;
        if (posInStack === this.subDecks[i].cards.length - 1) {
          card.open = true;
        }
        break;
      }
      x += 1.3;
    }
    const cc = new CardContainer(game, card);
    cc.position.set(x, y, z);
    cc.scale.setScalar(0.5);

    return cc;
  }

  draw(card: Card): Card | null {
    for (let i = 0; i < this.columns; i++) {
      const c = this.subDecks[i].cards.find((x) => x.uuid === card.uuid);
      if (c) {
        this.subDecks[i].draw();
        const newTop = this.subDecks[i].top;
        if (newTop) {
          newTop.open = true;
          return newTop;
        } else {
          return null;
        }
      }
    }
    return null;
  }
}

export class Playmat extends THREE.Group {
  constructor(
    protected game: Game,
    public deck: Deck,
    public grave: Deck,
    public name: string,
    private matchHandler: (pp: Playmat, cc: CardContainer) => void,
    public layout: PlaymatLayout = new ColumnsLayout(deck, 3)
  ) {
    super();
    this.name = name;
    this.setup();
  }

  moveCard(cc: CardContainer, position: THREE.Vector3Tuple) {
    this.draw(cc.card);
    return Promise.resolve(cc);
  }

  draw(card: Card) {
    const nextcard = this.layout.draw(card);
    for (const cc of this.children) {
      if (cc instanceof CardContainer) {
        if (cc.card.uuid === card.uuid) cc.removeFromParent();
        if (nextcard && cc.card.uuid === nextcard.uuid) {
          this.setupClickHandlerOnCard(cc);
          cc.layout();
        }
      }
    }

    return card;
  }
  setupClickHandlerOnCard(cc: CardContainer) {
    if (cc.card.open) {
      cc.userData.interactive = true;
      cc.addEventListener("clicked", () => {
        if (ranksFit(this.grave.top.rank, cc.card.rank)) {
          this.matchHandler(this, cc);
        }
      });
    }
  }
  setup() {
    for (const c of this.deck.cards) {
      const cc = this.layout.createContainer(this.game, c);
      this.setupClickHandlerOnCard(cc);
      this.add(cc);
    }
  }
}
