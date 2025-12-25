import type { Theme } from './types';
import { tokens } from './tokens';

export const redTheme: Theme = {
  mode: 'light',
  colors: {
    background: {
      primary: '#fef2f2',      // red-50 - Very light red background
      secondary: '#fee2e2',    // red-100 - Card backgrounds
      tertiary: '#fecaca',     // red-200 - Subtle backgrounds
      inverse: '#450a0a',      // red-950 - Dark red for dark mode text
    },
    text: {
      primary: '#7f1d1d',      // red-900 - Main text
      secondary: '#991b1b',    // red-800 - Secondary text
      tertiary: '#b91c1c',     // red-700 - Tertiary text
      inverse: '#fef2f2',      // red-50 - Text on dark backgrounds
      link: '#dc2626',         // red-600 - Links
      linkHover: '#b91c1c',    // red-700 - Link hover
    },
    border: {
      primary: '#fca5a5',      // red-300 - Main borders
      secondary: '#fecaca',    // red-200 - Subtle borders
      focus: '#dc2626',        // red-600 - Focus rings
    },
    surface: {
      base: '#ffffff',         // White - Card base
      hover: '#fef2f2',        // red-50 - Hover state
      active: '#fee2e2',       // red-100 - Active state
      disabled: '#f5f5f5',     // Disabled state
    },
    status: {
      success: '#16a34a',      // green-600 - Keep green for success
      warning: '#ea580c',      // orange-600 - Keep orange for warning
      error: '#dc2626',        // red-600 - Red for errors
      info: '#dc2626',         // red-600 - Red theme for info
    },
    brand: {
      primary: '#dc2626',           // red-600 - Main brand color
      primaryHover: '#b91c1c',      // red-700 - Hover state
      primaryActive: '#991b1b',     // red-800 - Active state
      secondary: '#f87171',         // red-400 - Secondary brand
    },
  },
  tokens,
};
