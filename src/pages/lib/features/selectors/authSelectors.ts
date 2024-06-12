import { RootState } from "../../store";

export const selectIsAuthenticated = (state: RootState) => state.auth?.isAuthenticated;

export const selectAccessToken = (state: RootState) => state.auth?.accessToken;