import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useAnimationControls } from "framer-motion";
import { OrthographicCamera, Plane, Backdrop } from "@react-three/drei";
import { CardContainer, CARD_PADDING, CARD_WIDTH } from "./objects/card";
import { DeckContainer, PileContainer } from "./objects/deck";
import { Deck } from "./types/deck";
import { Card } from "./types/card";
import { Suit, Suit2Color } from "./types/suit";
import { Rank, ranksFit } from "./types/rank";

function Suits({ counts }: { counts: Record<Suit, number> }) {
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

function buildHeart() {
  const x = 0,
    y = 0;
  const heartShape = new THREE.Shape()
    .moveTo(x + 25, y + 25)
    .bezierCurveTo(x + 25, y + 25, x + 20, y, x, y)
    .bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35)
    .bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95)
    .bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35)
    .bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y)
    .bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
  return new THREE.ShapeGeometry(heartShape);
}
const heartGeometry = buildHeart();

function App() {
  const [counts, setCounts] = useState<Record<Suit, number>>({
    [Suit.CLUB]: 0,
    [Suit.DIAMOND]: 0,
    [Suit.HEART]: 0,
    [Suit.SPADE]: 0,
  });
  const [deckCards, setDeckCards] = useState(new Deck());
  const [pile1Cards, setPile1Cards] = useState(new Deck());
  const [pile2Cards, setPile2Cards] = useState(new Deck());
  const [pile3Cards, setPile3Cards] = useState(new Deck());
  const [graveCards, setGraveCards] = useState(new Deck());
  const [travelingCard, setTravelingCard] = useState<Card | undefined>(
    new Card(Suit.CLUB, Rank.QUEEN, false)
  );
  const initialPos = {
    x: -0.6,
    y: -2,
    rotateX: THREE.MathUtils.degToRad(-45),
    rotateY: THREE.MathUtils.degToRad(180),
  };
  const targetPos = {
    x: [-0.6, -0.6, 0.6],
    y: -2,
    z: [0, 1, 0],
    rotateY: THREE.MathUtils.degToRad(0),
  };
  const controls = useAnimationControls();
  useEffect(() => {
    const fullDeck = new Deck();
    fullDeck.fill();
    setPile1Cards(fullDeck.subDeck(5));
    setPile2Cards(fullDeck.subDeck(5));
    setPile3Cards(fullDeck.subDeck(5));

    setDeckCards(fullDeck);
  }, []);
  useEffect(() => {
    if (!pile1Cards.empty()) {
      pile1Cards.top.open = true;
      setPile1Cards(pile1Cards.clone());
    }
    if (!pile3Cards.empty()) {
      pile3Cards.top.open = true;
      setPile3Cards(pile3Cards.clone());
    }
    if (!pile2Cards.empty()) {
      pile2Cards.top.open = true;
      setPile2Cards(pile2Cards.clone());
    }
  }, [deckCards]);
  useEffect(() => {
    if (travelingCard) {
      controls.start(targetPos, { duration: 1, ease: "easeInOut" }).then(() => {
        travelingCard.open = true;
        graveCards.add(travelingCard);
        setGraveCards(graveCards.clone());
        setTravelingCard(undefined);
      });
    }
  }, [travelingCard]);

  const grabCard = () => {
    if (travelingCard) return;
    const c = deckCards.draw();
    setTravelingCard(c);
    setDeckCards(deckCards.clone());
  };

  const playCard = () => {
    graveCards.draw();
    setGraveCards(graveCards.clone());
  };

  const onPileCardTap = (
    d: Deck,
    setter: React.Dispatch<React.SetStateAction<Deck>>
  ) => {
    if (ranksFit(d.top.rank, graveCards.top.rank)) {
      const c = d.draw();
      graveCards.add(c);
      counts[c.suit]++;
      setCounts({ ...counts });
      setGraveCards(graveCards.clone());
      setter(d.clone());
    }
  };

  return (
    <group>
      {travelingCard && (
        <CardContainer
          card={travelingCard}
          initial={initialPos}
          animate={controls}
        />
      )}

      <PileContainer
        deck={pile1Cards}
        position={[-1 * CARD_WIDTH - CARD_PADDING, 2, 0]}
        onDeckTap={(d) => onPileCardTap(d, setPile1Cards)}
      />
      <PileContainer
        deck={pile2Cards}
        position={[0 * CARD_WIDTH, 2, 0]}
        onDeckTap={(d) => onPileCardTap(d, setPile2Cards)}
      />
      <PileContainer
        deck={pile3Cards}
        position={[1 * CARD_WIDTH + CARD_PADDING, 2, 0]}
        onDeckTap={(d) => onPileCardTap(d, setPile3Cards)}
      />

      <DeckContainer
        onDeckTap={grabCard}
        deck={deckCards}
        flipped
        position={[-0.6, -2, 0]}
      />
      <DeckContainer
        onDeckTap={playCard}
        deck={graveCards}
        position={[0.6, -2, 0]}
      />
      <Html transform pointerEvents="none" position={[2.5, -2, -1.3]}>
        <Suits counts={counts} />
      </Html>
      <mesh
        geometry={heartGeometry}
        scale={0.008}
        rotation={[0, 0, THREE.MathUtils.degToRad(180)]}
        position={[-1.6, -1.4, 0]}
      >
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

createRoot(document.getElementById("game")).render(
  <Canvas
    camera={{
      position: [0, 0, 5],
    }}
  >
    <OrbitControls />
    <Backdrop
      receiveShadow={false}
      castShadow={false}
      floor={24}
      position={[0, -10, -10]}
      scale={[50, 30, 10]}
    >
      <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
    </Backdrop>
    <App />

    <ambientLight />
    <directionalLight color={"white"} position={[0, 0, 20]} />
  </Canvas>
);
