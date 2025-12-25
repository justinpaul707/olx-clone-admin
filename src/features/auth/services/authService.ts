import { setAuthToken } from '@app/services/graphqlClient';

export interface AuthTokenData {
  token: string;
  user: {
    id: string;
    email: string;
    phone?: string;
    role: {
      id: string;
      name: string;
    };
    profile: {
      fullName: string;
    };
  };
}

export const authService = {
  setAuthData: (data: AuthTokenData) => {
    const { token, user } = data;
    localStorage.setItem('AUTH_TOKEN', token);
    localStorage.setItem('USER', JSON.stringify(user));
    setAuthToken(token);
  },

  clearAuthData: () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER');
    setAuthToken(null);
  },

  getAuthData: () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const userStr = localStorage.getItem('USER');
    
    if (!token || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      return { token, user };
    } catch {
      authService.clearAuthData();
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('AUTH_TOKEN');
  },
};
