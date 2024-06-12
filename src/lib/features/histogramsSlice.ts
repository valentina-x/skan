import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HistogramData {
  date: string;
  value: number;
  histogramType: string;
}

export interface HistogramResponse {
  histogramType: string;
  data: HistogramData[];
}

interface HistogramsState {
  histograms: any;
}

const initialState: HistogramsState = {
  histograms: [],
};

const histogramsSlice = createSlice({
  name: "histograms",
  initialState,
  reducers: {
    setHistograms(state, action: PayloadAction<HistogramResponse[]>) {
      state.histograms = action.payload;
    },
  },
});

export const { setHistograms } = histogramsSlice.actions;

export default histogramsSlice.reducer;
