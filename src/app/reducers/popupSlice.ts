import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IPopupState {
  isOpen: boolean;
}

const initialState: IPopupState = { isOpen: false };

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(state) {
      state.isOpen = true;
    },
    closeAllPopups() {
      return initialState;
    },
  },
});

export const { openPopup, closeAllPopups } = popupSlice.actions;

export const selectPopupState = (state: RootState) => state.popup.isOpen;

export default popupSlice.reducer;
