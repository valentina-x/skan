import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentsState {
  documentsIDs: { ids: string[] };
}

const initialState: DocumentsState = {
  documentsIDs: { ids: [] },
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocumentsIDs(state, action: PayloadAction<{ ids: string[] }>) {
      state.documentsIDs = action.payload;
    },
  },
});

export const { setDocumentsIDs } = documentsSlice.actions;

export default documentsSlice.reducer;
