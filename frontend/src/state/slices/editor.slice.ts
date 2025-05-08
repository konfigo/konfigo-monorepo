import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
  editingBuffer: string;
  originalBuffer: string;
  oldBuffer?: string;
  selectedComponentId?: string;
  visualizeDiff: boolean;
}

const initialState: EditorState = {
  editingBuffer: "",
  originalBuffer: "",
  selectedComponentId: undefined,
  visualizeDiff: false,
};

export const EditorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    setEditingBuffer: (state, action: PayloadAction<string>) => {
      state.editingBuffer = action.payload;
    },
    setOriginalBuffer: (state, action: PayloadAction<string>) => {
      state.originalBuffer = action.payload;
    },
    setOldBuffer: (state, action: PayloadAction<string>) => {
      state.oldBuffer = action.payload;
    },
    setSelectedComponentId: (state, action: PayloadAction<string>) => {
      if (state.editingBuffer !== state.originalBuffer) {
        const result = confirm(
          "Are you sure you want to discard changes done to the currently selected configuration?",
        );
        if (!result) {
          return;
        }
      }
      state.selectedComponentId = action.payload;
    },

    setVisualizeDiff: (state, action: PayloadAction<boolean>) => {
      state.visualizeDiff = action.payload;
    },
  },
});

export const {
  setEditingBuffer,
  setOriginalBuffer,
  setOldBuffer,
  setSelectedComponentId,
  setVisualizeDiff,
} = EditorSlice.actions;

export default EditorSlice.reducer;
