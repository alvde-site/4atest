export const newCardsData = (
  bd: any[],
  cardType: string,
  cardsText: string[],
) => {
  return bd.map((c, i) => (c[cardType] ? { ...c, slogan: cardsText[i] } : c));
};
