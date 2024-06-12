import { RootState } from "../../store";

export const selectHistogramInfo = (state: RootState) => state.histograms.histograms;