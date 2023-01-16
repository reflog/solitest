import * as THREE from "three";
import { CardContainer } from "./card";
import { Deck } from "../types/deck";
import { Card } from "../types/card";
import { type Game } from "../game";
import { MeshBasicMaterial } from "three";
import GUI from "lil-gui";

export class DeckContainer extends THREE.Group {
  guiFolder: GUI;
  constructor(
    protected game: Game,
    public deck: Deck,
    name: string,
    onDeckTap: (d: DeckContainer, c: CardContainer) => void,
    position: [x: number, y: number, z: number]
  ) {
    super();
    this.name = name;
    this.position.set(...position);
    const hitTest = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1.45),
      new MeshBasicMaterial({ visible: false })
    );
    hitTest.userData.interactive = true;
    hitTest.position.set(0, 0.2, 0.1);
    hitTest.addEventListener("clicked", (e) => {
      if (!deck.empty()) onDeckTap(this, this.topCardContainer());
    });
    this.add(hitTest);
    this.setup();
    this.deck.addEventListener("changed", () => this.deckChanged());
    this.rotateX(THREE.MathUtils.degToRad(-45));
  }

  topCardContainer() {
    return this.getObjectByName(this.deck.top.string()) as CardContainer;
  }

  deckChanged() {
    this.children
      .filter((x) => x instanceof CardContainer)
      .forEach((x) => x.removeFromParent());
    this.setup();
  }

  protected setup() {
    [...this.deck.cards].reverse().map((c: Card, i) => {
      const cc = new CardContainer(this.game, c);
      cc.position.z = -i * 0.005;
      this.add(cc);
    });
  }
}
export class PileContainer extends DeckContainer {
  constructor(
    game: Game,
    deck: Deck,
    name: string,
    onDeckTap: (d: DeckContainer, c: CardContainer) => void,
    position: [x: number, y: number, z: number]
  ) {
    super(game, deck, name, onDeckTap, position);
    this.rotateX(THREE.MathUtils.degToRad(45));
  }
  protected setup(): void {
    [...this.deck.cards].map((c: Card, i) => {
      const cc = new CardContainer(this.game, c);
      cc.position.set(0, -i * 0.1, i * 0.005);
      this.add(cc);
    });
  }
}
