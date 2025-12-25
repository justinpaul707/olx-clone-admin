import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Theme, ThemeMode } from '@/styles/themes/types';
import { lightTheme } from '@/styles/themes/light.theme';
import { darkTheme } from '@/styles/themes/dark.theme';
import { redTheme } from '@/styles/themes/red.theme';
import { ThemeContext } from './ThemeContext';

const THEME_STORAGE_KEY = 'app-theme-mode';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode,
  storageKey = THEME_STORAGE_KEY,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Try to get from localStorage
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'red')) {
      return stored;
    }

    // Use provided default
    if (defaultMode) {
      return defaultMode;
    }

    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  const theme: Theme = useMemo(() => {
    if (mode === 'dark') return darkTheme;
    if (mode === 'red') return redTheme;
    return lightTheme;
  }, [mode]);

  const setTheme = useCallback(
    (newMode: ThemeMode) => {
      setMode(newMode);
      localStorage.setItem(storageKey, newMode);
      const selectedTheme = newMode === 'dark' ? darkTheme : newMode === 'red' ? redTheme : lightTheme;
      applyThemeToDOM(selectedTheme);
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setTheme(newMode);
  }, [mode, setTheme]);

  // Apply theme to DOM on mount and when theme changes
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(storageKey);
      // Only auto-switch if user hasn't set a preference
      if (!stored) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      toggleTheme,
      setTheme,
    }),
    [theme, mode, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Helper function to apply theme CSS variables to DOM
function applyThemeToDOM(theme: Theme): void {
  const root = document.documentElement;

  // Apply color variables
  root.style.setProperty('--color-bg-primary', theme.colors.background.primary);
  root.style.setProperty('--color-bg-secondary', theme.colors.background.secondary);
  root.style.setProperty('--color-bg-tertiary', theme.colors.background.tertiary);
  root.style.setProperty('--color-bg-inverse', theme.colors.background.inverse);

  root.style.setProperty('--color-text-primary', theme.colors.text.primary);
  root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
  root.style.setProperty('--color-text-tertiary', theme.colors.text.tertiary);
  root.style.setProperty('--color-text-inverse', theme.colors.text.inverse);
  root.style.setProperty('--color-text-link', theme.colors.text.link);
  root.style.setProperty('--color-text-link-hover', theme.colors.text.linkHover);

  root.style.setProperty('--color-border-primary', theme.colors.border.primary);
  root.style.setProperty('--color-border-secondary', theme.colors.border.secondary);
  root.style.setProperty('--color-border-focus', theme.colors.border.focus);

  root.style.setProperty('--color-surface-base', theme.colors.surface.base);
  root.style.setProperty('--color-surface-hover', theme.colors.surface.hover);
  root.style.setProperty('--color-surface-active', theme.colors.surface.active);
  root.style.setProperty('--color-surface-disabled', theme.colors.surface.disabled);

  root.style.setProperty('--color-status-success', theme.colors.status.success);
  root.style.setProperty('--color-status-warning', theme.colors.status.warning);
  root.style.setProperty('--color-status-error', theme.colors.status.error);
  root.style.setProperty('--color-status-info', theme.colors.status.info);

  root.style.setProperty('--color-brand-primary', theme.colors.brand.primary);
  root.style.setProperty('--color-brand-primary-hover', theme.colors.brand.primaryHover);
  root.style.setProperty('--color-brand-primary-active', theme.colors.brand.primaryActive);
  root.style.setProperty('--color-brand-secondary', theme.colors.brand.secondary);

  // Add data attribute for theme mode
  root.setAttribute('data-theme', theme.mode);
}
