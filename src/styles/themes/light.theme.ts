import type { Theme } from './types';
import { tokens } from './tokens';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: {
      primary: tokens.colors.neutral[50],
      secondary: '#ffffff',
      tertiary: tokens.colors.neutral[100],
      inverse: tokens.colors.neutral[900],
    },
    text: {
      primary: tokens.colors.neutral[900],
      secondary: tokens.colors.neutral[600],
      tertiary: tokens.colors.neutral[500],
      inverse: tokens.colors.neutral[50],
      link: tokens.colors.primary[600],
      linkHover: tokens.colors.primary[700],
    },
    border: {
      primary: tokens.colors.neutral[200],
      secondary: tokens.colors.neutral[300],
      focus: tokens.colors.primary[500],
    },
    surface: {
      base: '#ffffff',
      hover: tokens.colors.neutral[50],
      active: tokens.colors.neutral[100],
      disabled: tokens.colors.neutral[200],
    },
    status: {
      success: tokens.colors.success[600],
      warning: tokens.colors.warning[600],
      error: tokens.colors.error[600],
      info: tokens.colors.primary[600],
    },
    brand: {
      primary: tokens.colors.primary[600],
      primaryHover: tokens.colors.primary[700],
      primaryActive: tokens.colors.primary[800],
      secondary: tokens.colors.secondary[600],
    },
  },
  tokens,
};
