import { RootState } from "../../store";

export const selectUsedCompanyCount = (state: RootState) => state.companiesInfo.usedCompanyCount;
export const selectCompanyLimit = (state: RootState) => state.companiesInfo.companyLimit;