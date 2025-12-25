# Theme System Documentation

## Overview
This application uses a flexible, type-safe theme system built with React 19, Context API, and CSS variables for runtime theme switching.

## Architecture

### File Structure
```
src/
├── styles/
│   ├── themes/
│   │   ├── tokens.ts           # Design tokens (colors, typography, spacing)
│   │   ├── types.ts            # TypeScript types and interfaces
│   │   ├── light.theme.ts      # Light theme configuration
│   │   ├── dark.theme.ts       # Dark theme configuration
│   │   └── index.ts            # Barrel exports
│   └── theme-variables.css     # CSS variables and utilities
├── app/
│   └── providers/
│       ├── ThemeProvider.tsx   # Theme context provider
│       ├── useTheme.ts         # Custom hook for theme access
│       └── index.tsx           # Combined providers (Redux + Theme)
└── components/
    └── ui/
        └── theme-toggle.tsx    # Theme toggle button component
```

## Core Concepts

### 1. Design Tokens
Atomic design values defined in `tokens.ts`:
- **Colors**: Primary, secondary, success, warning, error, neutral palettes
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (0-24)
- **Border Radius**: Predefined radius values
- **Shadows**: Shadow scale (sm to 2xl)
- **Transitions**: Duration and timing functions
- **Z-Index**: Layering system

### 2. Theme Types
**ThemeMode**: `'light' | 'dark'`

**Theme Interface**:
```typescript
interface Theme {
  mode: ThemeMode;
  colors: {
    background: { primary, secondary, tertiary, inverse }
    text: { primary, secondary, tertiary, inverse, link, linkHover }
    border: { primary, secondary, focus }
    surface: { base, hover, active, disabled }
    status: { success, warning, error, info }
    brand: { primary, primaryHover, primaryActive, secondary }
  };
  tokens: typeof tokens;
}
```

### 3. Theme Provider
The `ThemeProvider` component:
- ✅ Wraps the application with theme context
- ✅ Manages theme state with localStorage persistence
- ✅ Detects system color scheme preference
- ✅ Applies CSS variables to DOM dynamically
- ✅ Listens for system theme changes
- ✅ Provides toggle and set methods

### 4. CSS Variables
Theme colors are applied as CSS variables:
```css
--color-bg-primary
--color-text-primary
--color-border-primary
--color-surface-base
--color-status-success
--color-brand-primary
/* ... and more */
```

## Usage Guide

### Basic Usage: useTheme Hook
```typescript
import { useTheme } from '@/app/providers';

function MyComponent() {
  const { theme, mode, toggleTheme, setTheme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.surface.base }}>
      <p style={{ color: theme.colors.text.primary }}>
        Current mode: {mode}
      </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Using CSS Variables
```typescript
function StyledComponent() {
  return (
    <div className="bg-surface text-primary border-primary">
      Content with theme-aware colors
    </div>
  );
}
```

### Using Theme Tokens
```typescript
import { useTheme } from '@/app/providers';

function TokenComponent() {
  const { theme } = useTheme();

  return (
    <p style={{ 
      fontSize: theme.tokens.typography.fontSize.lg,
      fontWeight: theme.tokens.typography.fontWeight.semibold,
      color: theme.colors.brand.primary
    }}>
      Typography with tokens
    </p>
  );
}
```

### Theme Toggle Component
Already available as `<ThemeToggle />`:
```typescript
import { ThemeToggle } from '@/components/ui/theme-toggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Module-Level Theming

### Option 1: Component-Level Styling
```typescript
import { useTheme } from '@/app/providers';
import { Card } from '@/components/ui/card';

export const ThemedCard: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface.base,
        borderColor: theme.colors.border.primary,
        color: theme.colors.text.primary,
      }}
    >
      {children}
    </Card>
  );
};
```

### Option 2: Module-Specific Theme Overrides
Create module-specific theme files:

```typescript
// features/propertyManagement/theme/property.theme.ts
import { Theme } from '@/styles/themes/types';

export const getPropertyTheme = (baseTheme: Theme) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    // Override specific colors for this module
    brand: {
      ...baseTheme.colors.brand,
      primary: '#10b981', // Green for properties
    },
  },
});
```

Then use it:
```typescript
import { useTheme } from '@/app/providers';
import { getPropertyTheme } from './theme/property.theme';

function PropertyComponent() {
  const { theme: baseTheme } = useTheme();
  const theme = getPropertyTheme(baseTheme);

  return <div style={{ color: theme.colors.brand.primary }}>...</div>;
}
```

### Option 3: CSS Variables with Module Prefix
```css
/* features/propertyManagement/styles/property.css */
.property-module {
  --property-accent: var(--color-brand-primary);
  --property-surface: var(--color-surface-base);
}

.property-card {
  background: var(--property-surface);
  border-left: 4px solid var(--property-accent);
}
```

## Best Practices

### ✅ DO:
- Use the `useTheme` hook to access theme in components
- Prefer CSS variables for simple color/background changes
- Use theme tokens for consistent spacing, typography, shadows
- Create module-specific themed components when needed
- Keep theme logic in styled components or CSS-in-JS
- Use semantic color names (e.g., `text.primary` not `neutral.900`)

### ❌ DON'T:
- Hard-code color values (use theme colors)
- Mix multiple theming approaches in one component
- Override theme values directly (create module themes instead)
- Forget to handle both light and dark modes
- Use inline styles when CSS variables work

## Example: Themed Property Stats Card

```typescript
import React from 'react';
import { useTheme } from '@/app/providers';
import { Card } from '@/components/ui/card';
import { Home } from 'lucide-react';

export const PropertyStatsCard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Card
      className="p-6 hover:shadow-lg transition-all"
      style={{
        backgroundColor: theme.colors.surface.base,
        borderColor: theme.colors.border.primary,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p style={{ color: theme.colors.text.secondary }}>
            Total Properties
          </p>
          <h3
            className="text-3xl font-bold"
            style={{ color: theme.colors.text.primary }}
          >
            1,234
          </h3>
        </div>
        <div
          className="p-3 rounded-lg"
          style={{
            backgroundColor: `${theme.colors.brand.primary}15`,
          }}
        >
          <Home
            className="w-6 h-6"
            style={{ color: theme.colors.brand.primary }}
          />
        </div>
      </div>
    </Card>
  );
};
```

## Extending the Theme

### Adding New Color Palettes
1. Update `tokens.ts` with new color scale
2. Add to theme types in `types.ts`
3. Include in `light.theme.ts` and `dark.theme.ts`
4. Add CSS variables in `theme-variables.css`
5. Update `ThemeProvider.tsx` to apply new variables

### Adding New Tokens
```typescript
// tokens.ts
export const tokens = {
  // ... existing tokens
  animation: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
};
```

## Testing Themes

### Manual Testing
1. Open application
2. Click theme toggle in header
3. Verify all colors update smoothly
4. Check localStorage persistence (refresh page)
5. Test system preference detection

### Component Testing
```typescript
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

test('renders with theme', () => {
  render(
    <ThemeProvider defaultMode="light">
      <MyComponent />
    </ThemeProvider>
  );
});
```

## Performance Considerations

- ✅ Theme context updates trigger re-renders only for consuming components
- ✅ CSS variables enable instant theme switching without re-renders
- ✅ `useMemo` used for theme object to prevent unnecessary recalculations
- ✅ LocalStorage reads happen once on mount
- ✅ System preference listener is cleaned up properly

## Browser Support

- Modern browsers: Full support
- IE11: Requires CSS variable polyfill
- Safari: Full support (iOS 9.3+)
- Firefox: Full support
- Chrome/Edge: Full support

## Future Enhancements

- [ ] Theme presets (e.g., "Ocean", "Forest", "Sunset")
- [ ] Per-module theme customization UI
- [ ] Theme export/import functionality
- [ ] Accessibility contrast checker
- [ ] CSS-in-JS integration (styled-components/emotion)
- [ ] Theme animation transitions
- [ ] Color blind friendly palettes

## Troubleshooting

### Theme not applying
- Check if `AppProviders` wraps your app in `main.tsx`
- Verify `theme-variables.css` is imported in `index.css`
- Inspect DOM for `data-theme` attribute on `<html>`

### Colors not updating
- Check if CSS variables are defined in `:root`
- Verify component uses `useTheme` hook correctly
- Check browser DevTools for CSS variable values

### LocalStorage issues
- Clear browser cache
- Check localStorage key: `app-theme-mode`
- Verify no errors in console

## Support

For questions or issues, please contact the development team or create an issue in the repository.

---

**Last Updated**: 2024
**Version**: 1.0.0
