// Auth related types
export interface User {
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
  username?: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthError {
  message: string;
  code: string;
  field?: string;
}

export interface PasswordResetData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Auth state types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

// API request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}
export interface LoginData {
  email: string;
  password: string;
}

// GraphQL Response Types
export interface LoginMutationResponse {
  login: {
    data: {
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
    };
    errors?: string[];
  };
}

export interface SignupMutationResponse {
  signup: {
    success: boolean;
    message: string;
    errors?: string[];
    data?: {
      user: {
        id: string;
        email: string;
        phone?: string;
        status: string;
        profile: {
          id: string;
          fullName: string;
          profileCompletionScore: number;
        };
      };
    };
  };
}
