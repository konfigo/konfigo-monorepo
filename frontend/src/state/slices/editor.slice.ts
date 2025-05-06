import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
  editingBuffer: string;
  originalBuffer: string;
  selectedComponentId?: string;
}

const initialState: EditorState = {
  editingBuffer: "",
  originalBuffer: "",
  selectedComponentId: undefined,
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
    setSelectedComponentId: (state, action: PayloadAction<string>) => {
      state.selectedComponentId = action.payload;
    },
  },
});

export const { setEditingBuffer, setOriginalBuffer, setSelectedComponentId } =
  EditorSlice.actions;

export default EditorSlice.reducer;
