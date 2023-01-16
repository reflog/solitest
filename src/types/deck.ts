import { EventDispatcher } from "three";
import { Card } from "./card";
import { Rank } from "./rank";
import { Suit } from "./suit";

export class Deck extends EventDispatcher {
  clone(): Deck {
    const d = new Deck();
    d.cards = this.cards;
    return d;
  }
  cards: Card[] = [];

  shuffle() {
    const array = this.cards;
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  fill() {
    const open = false;
    let s: keyof typeof Suit;
    let r: keyof typeof Rank;
    for (s in Suit) {
      for (r in Rank) {
        this.cards.push(new Card(Suit[s], Rank[r], open));
      }
    }
    this.cards = this.shuffle();
  }

  empty() {
    return this.cards.length === 0;
  }

  draw() {
    if (!this.empty()) {
      const t = this.cards.pop();
      this.dispatchEvent({ type: "changed" });
      return t;
    }
  }

  public get top(): Card | undefined {
    if (!this.empty()) {
      return this.cards[this.cards.length - 1];
    }
  }
  subDeck(size: number) {
    const d = new Deck();
    let i = 0;
    while (i < size) {
      const c = this.draw();
      if (c) {
        d.add(c);
      }
      i++;
    }
    this.dispatchEvent({ type: "changed" });
    return d;
  }

  add(c: Card) {
    this.cards.push(c);
    this.dispatchEvent({ type: "changed" });
  }

  prepend(c: Card) {
    this.cards.unshift(c);
    this.dispatchEvent({ type: "changed" });
  }
}
