import { createContext } from 'react';
import type { ThemeContextValue } from '@/styles/themes/types';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
