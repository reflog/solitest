export enum Rank {
  ACE = "A",
  KING = "K",
  QUEEN = "Q",
  JACK = "J",
  TEN = "10",
  NINE = "9",
  EIGHT = "8",
  SEVEN = "7",
  SIX = "6",
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
}
const Rank2Weight = {
  [Rank.ACE]: 14,
  [Rank.KING]: 13,
  [Rank.QUEEN]: 12,
  [Rank.JACK]: 11,
  [Rank.TEN]: 10,
  [Rank.NINE]: 9,
  [Rank.EIGHT]: 8,
  [Rank.SEVEN]: 7,
  [Rank.SIX]: 6,
  [Rank.FIVE]: 5,
  [Rank.FOUR]: 4,
  [Rank.THREE]: 3,
  [Rank.TWO]: 2,
};

export function ranksFit(a: Rank, b: Rank): boolean {
  const diff = Rank2Weight[a] - Rank2Weight[b];
  if (diff === -1 || diff === 1) {
    return true;
  }
  if (
    (a === Rank.ACE && b === Rank.TWO) ||
    (b === Rank.ACE && a === Rank.TWO)
  ) {
    return true;
  }
  return false;
}
