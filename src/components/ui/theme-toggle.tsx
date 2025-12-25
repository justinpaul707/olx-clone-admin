import React, { useState } from 'react';
import { useTheme } from '@/app/providers/hooks';
import { Moon, Sun, Palette, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import type { ThemeMode } from '@/styles/themes/types';

export const ThemeToggle: React.FC = () => {
  const { mode, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: Array<{ value: ThemeMode; label: string; icon: React.ReactNode }> = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'red', label: 'Red', icon: <Palette className="h-4 w-4" /> },
  ];

  const currentTheme = themes.find(t => t.value === mode) || themes[0];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
        aria-label="Select theme"
      >
        {currentTheme.icon}
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-40 bg-surface border-primary rounded-md shadow-lg z-50 overflow-hidden">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  setTheme(theme.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-none cursor-pointer",
                  mode === theme.value 
                    ? "bg-brand-primary text-inverse" 
                    : "bg-surface text-primary hover:bg-surface-hover"
                )}
              >
                {theme.icon}
                <span className="font-medium">{theme.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
