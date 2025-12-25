import type { Theme } from './types';
import { tokens } from './tokens';

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: {
      primary: tokens.colors.neutral[950],
      secondary: tokens.colors.neutral[900],
      tertiary: tokens.colors.neutral[800],
      inverse: tokens.colors.neutral[50],
    },
    text: {
      primary: tokens.colors.neutral[50],
      secondary: tokens.colors.neutral[300],
      tertiary: tokens.colors.neutral[400],
      inverse: tokens.colors.neutral[900],
      link: tokens.colors.primary[400],
      linkHover: tokens.colors.primary[300],
    },
    border: {
      primary: tokens.colors.neutral[800],
      secondary: tokens.colors.neutral[700],
      focus: tokens.colors.primary[500],
    },
    surface: {
      base: tokens.colors.neutral[900],
      hover: tokens.colors.neutral[800],
      active: tokens.colors.neutral[700],
      disabled: tokens.colors.neutral[800],
    },
    status: {
      success: tokens.colors.success[500],
      warning: tokens.colors.warning[500],
      error: tokens.colors.error[500],
      info: tokens.colors.primary[500],
    },
    brand: {
      primary: tokens.colors.primary[500],
      primaryHover: tokens.colors.primary[400],
      primaryActive: tokens.colors.primary[600],
      secondary: tokens.colors.secondary[500],
    },
  },
  tokens,
};
