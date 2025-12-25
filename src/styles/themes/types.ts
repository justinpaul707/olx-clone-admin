import { tokens } from './tokens';

export type ThemeMode = 'light' | 'dark' | 'red';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      link: string;
      linkHover: string;
    };
    border: {
      primary: string;
      secondary: string;
      focus: string;
    };
    surface: {
      base: string;
      hover: string;
      active: string;
      disabled: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    brand: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      secondary: string;
    };
  };
  tokens: typeof tokens;
}

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}
