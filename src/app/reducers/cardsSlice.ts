import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { cardsText } from "../../service/constants";

export type TCard = {
  id: string;
  name: string;
  isPopular: boolean;
  isDiscount: boolean;
  [index: string]: any;
};

interface ICardsState {
  initialCards: TCard[];
  cards: TCard[];
  status: string;
  error: string | undefined;
}

const initialState: ICardsState = {
  initialCards: [],
  cards: [],
  status: "idle",
  error: undefined,
};

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetch("https://t-pay.iqfit.app/subscribe/list-test", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  });
  return response as TCard[];
});

const postsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        const countPercent = (discountPrice: number, basePrice: number) =>
          Math.round((1 - discountPrice / basePrice) * 10) * 10;
        const sortType = (a: TCard, b: TCard) => (a.price > b.price ? 1 : -1);
        state.status = "succeeded";

        const baseCards = action.payload
          .filter(c => !c.isPopular && !c.isDiscount)
          .sort(sortType);

        const popularCards = action.payload
          .filter(c => c.isPopular)
          .sort(sortType)
          .map((c, i) => ({
            ...c,
            slogan: cardsText[i],
            percent: countPercent(c.price, baseCards[i].price),
            basePrice: baseCards[i].price,
          }));

        const discountCards = action.payload
          .filter(c => c.isDiscount)
          .sort(sortType)
          .map((c, i) => ({
            ...c,
            percent: countPercent(c.price, baseCards[i].price),
            basePrice: baseCards[i].price,
          }));

        const formattedCards = baseCards.concat(popularCards, discountCards);
        state.initialCards = state.cards;
        state.cards = formattedCards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectAllCards = (state: RootState) => state.cards.cards;

export const selectPopularCards = createSelector(
  [(state: RootState) => state.cards],
  cards => cards.cards.filter(c => c.isPopular),
);

export const selectDiscountCards = createSelector(
  [(state: RootState) => state.cards],
  cards => cards.cards.filter(c => c.isDiscount),
);

export const selectBaseCards = createSelector(
  [(state: RootState) => state.cards],
  cards => cards.cards.filter(c => !c.isPopular && !c.isDiscount),
);
