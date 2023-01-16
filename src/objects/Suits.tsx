import React from "react";
import { Suit, Suit2Color } from "../types/suit";

export function Suits({ counts }: { counts: Record<Suit, number> }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: Suit2Color[Suit.DIAMOND],
        }}
      >
        D
        <br />
        {counts[Suit.DIAMOND]}
      </div>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: Suit2Color[Suit.SPADE],
        }}
      >
        S
        <br />
        {counts[Suit.SPADE]}
      </div>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: Suit2Color[Suit.CLUB],
        }}
      >
        C
        <br />
        {counts[Suit.CLUB]}
      </div>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: Suit2Color[Suit.HEART],
        }}
      >
        H
        <br />
        {counts[Suit.HEART]}
      </div>
    </div>
  );
}
