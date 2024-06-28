import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import cardsSlice from "./reducers/cardsSlice";
import popupSlice from "./reducers/popupSlice";
import stateSlice from "./reducers/timerSlice";

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    popup: popupSlice,
    timer: stateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
