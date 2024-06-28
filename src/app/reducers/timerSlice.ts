import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const NORMAL = "normal";
export const DANGER = "danger";
export const STOPPED = "stopped";

export interface ITimerState {
  timerState: "normal" | "danger" | "stopped";
}

const initialState: ITimerState = { timerState: NORMAL };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerState(state, action) {
      const { timerState } = action.payload;
      state.timerState = timerState;
    },
  },
});

export const selectTimerState = (state: RootState) => state.timer.timerState;

export const { setTimerState } = timerSlice.actions;

export default timerSlice.reducer;
