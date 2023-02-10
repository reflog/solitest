import THREE from "three";
import { Game } from "../game";
import { Deck } from "../types/deck";

export enum PlaymatLayout {
  COLUMNS,
}

export class Playmat extends THREE.Group {
  constructor(
    protected game: Game,
    public deck: Deck,
    public name: string,
    public layout: PlaymatLayout = PlaymatLayout.COLUMNS
  ) {
    super();
    this.name = name;
  }
}
