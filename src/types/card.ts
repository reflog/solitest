import { Rank } from "./rank";
import { Suit, Suit2Color } from "./suit";

export class Card {
  constructor(public suit: Suit, public rank: Rank, public open: boolean) { }
  string() {
    return `${this.rank} ${this.suit}`;
  }
  color() {
    return Suit2Color[this.suit];
  }
  clone() {
    return new Card(this.suit, this.rank, this.open);
  }
}
