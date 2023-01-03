import * as THREE from "three";
import React from "react";
import { CardContainer } from "./card";
import { Deck } from "../types/deck";
import { Card } from "../types/card";

export const DeckContainer = ({
  onDeckTap,
  deck,
  position,
  flipped,
}: {
  onDeckTap: () => void;
  deck: Deck;
  position: [x: number, y: number, z: number];
  flipped?: boolean;
}) => {
  if (!deck) return;
  return (
    <group position={position} rotation={[THREE.MathUtils.degToRad(-45), 0, 0]}>
      <mesh
        position-y={0.2}
        position-z={0.1}
        onClick={(e) => {
          e.stopPropagation();
          if (!deck.empty()) onDeckTap();
        }}
      >
        <planeGeometry args={[1, 1.45]} />
        <meshBasicMaterial color="purple" visible={false} />
      </mesh>

      {[...deck.cards].reverse().map((c: Card, i) => (
        <CardContainer position-z={-i * 0.005} key={c.string()} card={c} />
      ))}
    </group>
  );
};

export const PileContainer = ({
  deck,
  onDeckTap,
  position,
}: {
  deck: Deck;
  onDeckTap: (d: Deck) => void;

  position: [x: number, y: number, z: number];
}) => {
  if (!deck) return;

  return (
    <group position={position}>
      <mesh
        position-z={0.1}
        onClick={(e) => {
          e.stopPropagation();
          if (!deck.empty()) onDeckTap(deck);
        }}
      >
        <planeGeometry args={[1, 2]} />
        <meshBasicMaterial color="purple" visible={false} />
      </mesh>
      {deck.cards.map((c, i) => (
        <CardContainer
          key={c.string()}
          card={c}
          position={[0, -i * 0.1, i * 0.005]}
        />
      ))}
    </group>
  );
};
