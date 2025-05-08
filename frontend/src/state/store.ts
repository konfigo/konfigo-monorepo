import { configureStore } from "@reduxjs/toolkit";
import { EditorSlice } from "./slices/editor.slice";
import { OnboardSlice } from "./slices/onboard.slice";

export const store = configureStore({
  reducer: {
    editor: EditorSlice.reducer,
    onboard: OnboardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
