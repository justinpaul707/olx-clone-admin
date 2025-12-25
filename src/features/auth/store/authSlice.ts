import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@app/features/auth/types';
import { authService } from '@app/features/auth/services/authService';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('AUTH_TOKEN'),
  user: null,
  isAuthenticated: !!localStorage.getItem('AUTH_TOKEN'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string; user?: User }>) {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload.user;
        authService.setAuthData({ 
          token: action.payload.accessToken, 
          user: action.payload.user 
        });
      }
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      authService.clearAuthData();
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;