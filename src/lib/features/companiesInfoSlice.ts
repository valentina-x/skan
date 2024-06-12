import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompaniesInfo {
  usedCompanyCount: number;
  companyLimit: number;
}

export interface CompaniesInfoPayload {
  usedCompanyCount: number;
  companyLimit: number;
}

const initialState: CompaniesInfo = {
	companyLimit: 0,
	usedCompanyCount: 0,
};

const companiesInfoSlice = createSlice({
  name: 'companiesInfo',
  initialState,
  reducers: {
    setComaniesInfo(state, action: PayloadAction<CompaniesInfoPayload>) {
		state.companyLimit = action.payload.companyLimit;
		state.usedCompanyCount = action.payload.usedCompanyCount;
    },
  },
});

export const { setComaniesInfo } = companiesInfoSlice.actions;

export default companiesInfoSlice.reducer;
