import * as THREE from "three";
import { CardContainer, CARD_PADDING, CARD_WIDTH } from "../objects/card";
import { DeckContainer, PileContainer } from "../objects/deck";
import { Deck } from "../types/deck";
import { Card } from "../types/card";
import { Suit } from "../types/suit";
import { Rank, ranksFit } from "../types/rank";
import { type Game } from "../game";
import { Heart } from "../objects/Heart";
import anime from "animejs";
export class CardFightScene extends THREE.Group {
  counts = {
    [Suit.CLUB]: 0,
    [Suit.DIAMOND]: 0,
    [Suit.HEART]: 0,
    [Suit.SPADE]: 0,
  };
  deck = new Deck();
  pile1 = new Deck();
  pile2 = new Deck();
  pile3 = new Deck();
  grave = new Deck();

  constructor(public game: Game) {
    super();
    this.deck.fill();
    this.pile1 = this.deck.subDeck(1);
    this.pile2 = this.deck.subDeck(1);
    this.pile3 = this.deck.subDeck(1);

    this.pile1.top.open = true;
    this.pile2.top.open = true;
    this.pile3.top.open = true;

    this.grave.add(new Card(Suit.CLUB, Rank.KING, true));
    this.grave.add(new Card(Suit.CLUB, Rank.ACE, true));
    this.buildScene();
  }
  animateCardPickup(c: CardContainer) {
    if (anime.running.length > 0) return;
    anime({
      targets: c.position,
      z: 0.3,
      duration: 1000,
    });
    anime({
      targets: c.rotation,
      easing: "easeInOutSine",
      keyframes: [
        { y: THREE.MathUtils.degToRad(5) },
        { y: THREE.MathUtils.degToRad(-5) },
      ],
      duration: 300,
      loop: 2,
      direction: "alternate",
    }).finished.then(() => {
      const targetZ = this.grave.cards.length * 0.005;
      anime({
        targets: c.position,
        x: 1.2,
        z: targetZ,
        duration: 1000,
      });

      anime({
        targets: c.rotation,
        easing: "linear",
        y: THREE.MathUtils.degToRad(-180),
        duration: 100,
      }).finished.then(() => {
        const c = this.deck.draw();
        c.open = true;
        this.grave.add(c);
      });
    });
  }

  pileClickHandler(d: DeckContainer, c: CardContainer) {
    if (this.grave.empty()) {
      return;
    }
    if (ranksFit(c.card.rank, this.grave.top.rank)) {
      const c = d.deck.draw();
      this.grave.add(c);
      // counts[c.suit]++;
      // setCounts({ ...counts });
      // setGraveCards(graveCards.clone());
      // setter(d.clone());
    }
  }
  buildScene() {
    this.add(
      new PileContainer(
        this.game,
        this.pile1,
        "pile1",
        (d, c) => this.pileClickHandler(d, c),
        [-1 * CARD_WIDTH - CARD_PADDING, 1, 0]
      ),
      new PileContainer(
        this.game,
        this.pile2,
        "pile2",
        (d, c) => this.pileClickHandler(d, c),
        [0, 1, 0]
      ),
      new PileContainer(
        this.game,
        this.pile3,
        "pile3",
        (d, c) => this.pileClickHandler(d, c),
        [1 * CARD_WIDTH + CARD_PADDING, 1, 0]
      ),
      new DeckContainer(
        this.game,
        this.deck,
        "deck",
        (_, c) => {
          this.animateCardPickup(c);
        },
        [-0.6, -2, 0]
      ),
      new DeckContainer(this.game, this.grave, "grave", () => {}, [0.6, -2, 0]),
      new Heart()
    );
    //   return (
    // <SheetProvider sheet={demoSheet}>
    //   <group name="g">
    //     {/* {travelingCard && (
    //       <motion.group initial={initialPos} animate={controls}>
    //         <CardContainer card={travelingCard} />
    //       </motion.group>
    //     )} */}

    //     <DeckContainer
    //       name="deck"
    //       onDeckTap={grabCard}
    //       deck={deckCards}
    //       flipped
    //       position={[-0.6, -2, 0]}
    //     />
    //     <DeckContainer
    //       name="grave"
    //       onDeckTap={playCard}
    //       deck={graveCards}
    //       position={[0.6, -2, 0]}
    //     />
    //     <Html transform pointerEvents="none" position={[2.5, -2, -1.3]}>
    //       <Suits counts={counts} />
    //     </Html>
    //     <Heart />
    //   </group>
    // </SheetProvider>
  }

  // }, [deckCards]);
  // useEffect(() => {
  //   if (travelingCard) {
  //     // controls.start(targetPos, { duration: 1, ease: "easeInOut" }).then(() => {
  //     //   travelingCard.open = true;
  //     //   graveCards.add(travelingCard);
  //     //   setGraveCards(graveCards.clone());
  //     //   setTravelingCard(undefined);
  //     // });
  //   }
  // }, [travelingCard]);

  // const grabCard = () => {
  //   if (travelingCard) return;
  //   const c = deckCards.draw();
  // };

  // const playCard = () => {
  //   graveCards.draw();
  //   setGraveCards(graveCards.clone());
  // };

  // const onPileCardTap = (
  //   d: Deck,
  //   setter: React.Dispatch<React.SetStateAction<Deck>>
  // ) => {
  //   // if (ranksFit(d.top.rank, graveCards.top.rank)) {
  //   //   const c = d.draw();
  //   //   graveCards.add(c);
  //   //   counts[c.suit]++;
  //   //   setCounts({ ...counts });
  //   //   setGraveCards(graveCards.clone());
  //   //   setter(d.clone());
  //   // }
  // };
}
