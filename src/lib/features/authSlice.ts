import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  expire: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  accessToken: string;
  expire: string | null;
}

export type AuthAction = {
  type: string;
  payload: LoginPayload;
};

const initialState: AuthState = {
  accessToken: null,
  expire: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.accessToken = action.payload.accessToken;
      state.expire = action.payload.expire;
      state.isAuthenticated = true;
    },
    logout() {
      return initialState;
    },
    checkToken(state) {
      const currentTime = new Date().getTime();
      if (state.expire && currentTime > new Date(state.expire).getTime()) {
        return initialState;
      }
    },
  }
});

export const { login, logout, checkToken } = authSlice.actions;

export default authSlice.reducer;
