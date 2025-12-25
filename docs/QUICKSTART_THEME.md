# Theme System - Quick Start Guide

## 🚀 5-Minute Quick Start

### 1. Already Done ✅
- Theme system is installed and configured
- ThemeProvider wraps your app
- Theme toggle button is in the header

### 2. Test It Now
1. Run your app: `pnpm dev`
2. Look for the **sun/moon icon** in the header (top right)
3. Click it to toggle between light and dark themes
4. Refresh the page - your theme preference persists!

### 3. Use Theme in Your Components

#### Option A: Using CSS Variables (Easiest)
```tsx
function MyCard() {
  return (
    <div className="bg-surface text-primary border-primary p-4">
      <h2 className="text-primary">Title</h2>
      <p className="text-secondary">Description</p>
    </div>
  );
}
```

#### Option B: Using the Hook (More Control)
```tsx
import { useTheme } from '@/app/providers';

function MyCard() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.surface.base,
      color: theme.colors.text.primary,
      borderColor: theme.colors.border.primary,
    }} className="p-4">
      <h2>Title</h2>
    </div>
  );
}
```

#### Option C: Access Current Mode
```tsx
import { useTheme } from '@/app/providers';

function MyComponent() {
  const { mode } = useTheme();
  
  return (
    <div>
      Current theme: {mode}
      {mode === 'dark' ? '🌙' : '☀️'}
    </div>
  );
}
```

## 📋 Common Use Cases

### 1. Conditional Styling Based on Theme
```tsx
import { useTheme } from '@/app/providers';

function Logo() {
  const { mode } = useTheme();
  
  return (
    <img 
      src={mode === 'dark' ? '/logo-dark.png' : '/logo-light.png'} 
      alt="Logo" 
    />
  );
}
```

### 2. Custom Toggle Button
```tsx
import { useTheme } from '@/app/providers';

function CustomToggle() {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
```

### 3. Status Colors
```tsx
import { useTheme } from '@/app/providers';

function StatusBadge({ status }: { status: 'success' | 'error' | 'warning' }) {
  const { theme } = useTheme();
  
  const colors = {
    success: theme.colors.status.success,
    error: theme.colors.status.error,
    warning: theme.colors.status.warning,
  };
  
  return (
    <span style={{ color: colors[status] }}>
      {status}
    </span>
  );
}
```

### 4. Using Design Tokens
```tsx
import { useTheme } from '@/app/providers';

function StyledText() {
  const { theme } = useTheme();
  
  return (
    <p style={{
      fontSize: theme.tokens.typography.fontSize.lg,
      fontWeight: theme.tokens.typography.fontWeight.semibold,
      lineHeight: theme.tokens.typography.lineHeight.relaxed,
      marginBottom: theme.tokens.spacing[4],
    }}>
      Consistently styled text
    </p>
  );
}
```

## 🎨 Available CSS Variables

Use these in your className:
- `.bg-primary` - Primary background
- `.bg-secondary` - Secondary background
- `.bg-surface` - Surface background
- `.text-primary` - Primary text
- `.text-secondary` - Secondary text
- `.text-tertiary` - Tertiary text
- `.border-primary` - Primary border
- `.text-success` - Success color
- `.text-warning` - Warning color
- `.text-error` - Error color
- `.text-info` - Info color

## 🎯 Property Management Integration

### Update Existing Components
Replace hard-coded colors in your Property Management components:

**Before:**
```tsx
<div className="bg-white text-black border-gray-300">
```

**After:**
```tsx
<div className="bg-surface text-primary border-primary">
```

### Use Themed Stats Card
```tsx
import { ThemedStatsCard } from '@/features/propertyManagement/components';
import { Home } from 'lucide-react';

function Dashboard() {
  return (
    <ThemedStatsCard
      title="Total Properties"
      value={1234}
      icon={Home}
      trend={{ value: "12%", isPositive: true }}
    />
  );
}
```

## 🔧 Customization

### Change Default Theme
Edit `src/app/providers/index.tsx`:
```tsx
<ThemeProvider defaultMode="dark">
```

### Add New Colors
1. Update `src/styles/themes/tokens.ts`
2. Update `src/styles/themes/types.ts`
3. Update `src/styles/themes/light.theme.ts` and `dark.theme.ts`
4. Update `src/styles/theme-variables.css`
5. Update `src/app/providers/ThemeProvider.tsx` (applyThemeToDOM function)

### Module-Specific Theme
Create `features/yourModule/theme/custom.theme.ts`:
```tsx
import { Theme } from '@/styles/themes/types';

export const getCustomTheme = (baseTheme: Theme) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    brand: {
      ...baseTheme.colors.brand,
      primary: '#10b981', // Your custom color
    },
  },
});
```

Use it:
```tsx
import { useTheme } from '@/app/providers';
import { getCustomTheme } from './theme/custom.theme';

function MyComponent() {
  const { theme: baseTheme } = useTheme();
  const theme = getCustomTheme(baseTheme);
  
  return <div style={{ color: theme.colors.brand.primary }}>...</div>;
}
```

## 📚 Available Theme Values

### Theme Object Structure
```typescript
{
  mode: 'light' | 'dark',
  colors: {
    background: { primary, secondary, tertiary, inverse },
    text: { primary, secondary, tertiary, inverse, link, linkHover },
    border: { primary, secondary, focus },
    surface: { base, hover, active, disabled },
    status: { success, warning, error, info },
    brand: { primary, primaryHover, primaryActive, secondary }
  },
  tokens: {
    colors: { /* color palettes */ },
    typography: { fontFamily, fontSize, fontWeight, lineHeight },
    spacing: { 0-24 },
    borderRadius: { none, sm, base, md, lg, xl, 2xl, 3xl, full },
    shadows: { sm, base, md, lg, xl, 2xl, inner, none },
    transitions: { duration, timing },
    zIndex: { dropdown, sticky, fixed, modalBackdrop, modal, popover, tooltip }
  }
}
```

## 🐛 Troubleshooting

### Theme not applying?
1. Check `main.tsx` has `<AppProviders>` wrapper
2. Verify `theme-variables.css` imported in `index.css`
3. Open DevTools → Check `<html data-theme="...">`

### Colors not updating?
1. Make sure component uses `useTheme()` hook or CSS variables
2. Check CSS variable names match (e.g., `--color-bg-primary`)
3. Verify not using hard-coded colors

### localStorage issues?
1. Clear browser cache
2. Check localStorage key: `app-theme-mode`
3. Try incognito mode

## 📖 Full Documentation

- **THEME_SYSTEM.md** - Complete usage guide
- **THEME_ARCHITECTURE.md** - Visual diagrams and architecture
- **IMPLEMENTATION_SUMMARY.md** - What was built

## ✨ Pro Tips

1. **Use CSS variables for simple colors** - Fastest and cleanest
2. **Use useTheme() for dynamic logic** - When you need mode checking
3. **Use tokens for consistent spacing/typography** - Maintains design system
4. **Create module themes for special sections** - Keep customization organized
5. **Test both themes regularly** - Ensure everything looks good in both modes

## 🎉 You're Ready!

Start using themes in your components now. The system is flexible - use what works best for each situation!

**Need help?** Check the full documentation files or the example components.
