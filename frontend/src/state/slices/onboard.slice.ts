import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardState {
  stages: string[];
  continueable: boolean;
}

export const initialState: OnboardState = {
  stages: [""],
  continueable: false,
};

export const OnboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    addStage: (state, action: PayloadAction<string>) => {
      state.stages.push(action.payload);
    },
    removeStage: (state, action: PayloadAction<number>) => {
      if (state.stages.length === 1) {
        return;
      }

      if (action.payload === -1) {
        return;
      }

      state.stages = state.stages.filter(
        (_, index) => index !== action.payload,
      );
    },
    setStageName: (
      state,
      action: PayloadAction<{ index: number; name: string }>,
    ) => {
      state.stages[action.payload.index] = action.payload.name;
    },
    setContinueable: (state, action: PayloadAction<boolean>) => {
      state.continueable = action.payload;
    },
  },
});

export const { addStage, removeStage, setStageName, setContinueable } =
  OnboardSlice.actions;

export default OnboardSlice.reducer;
