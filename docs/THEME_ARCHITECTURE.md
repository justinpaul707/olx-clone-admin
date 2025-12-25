# Theme System Architecture

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Entry                         │
│                          (main.tsx)                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              AppProviders Wrapper                         │ │
│  │                                                           │ │
│  │  ┌─────────────┐        ┌───────────────────────┐       │ │
│  │  │   Redux     │        │   ThemeProvider       │       │ │
│  │  │   Provider  │───────▶│   (Context API)       │       │ │
│  │  │             │        │                       │       │ │
│  │  └─────────────┘        └───────────────────────┘       │ │
│  │                                    │                     │ │
│  │                                    ▼                     │ │
│  │                         ┌───────────────────┐            │ │
│  │                         │  Theme Context    │            │ │
│  │                         │  - theme          │            │ │
│  │                         │  - mode           │            │ │
│  │                         │  - toggleTheme    │            │ │
│  │                         │  - setTheme       │            │ │
│  │                         └───────────────────┘            │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌──────────────────────┐        ┌──────────────────────┐
        │   Component Tree      │        │   CSS Variables      │
        │   (React Components)  │        │   (DOM :root)        │
        │                       │        │                      │
        │   useTheme() hook     │        │   --color-bg-*       │
        │   ↓                   │        │   --color-text-*     │
        │   Access theme,       │        │   --color-border-*   │
        │   mode, functions     │        │   --color-brand-*    │
        └──────────────────────┘        └──────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Theme System Layers                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 1: Design Tokens (tokens.ts)                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  • Colors (primary, secondary, success, warning, error)   │ │
│  │  • Typography (fonts, sizes, weights, line-heights)       │ │
│  │  • Spacing (0-24 scale)                                   │ │
│  │  • Shadows (sm → 2xl)                                     │ │
│  │  • Border Radius (sm → full)                              │ │
│  │  • Transitions (duration, timing)                         │ │
│  │  • Z-Index (layering)                                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                          ↓                                      │
│  Layer 2: Theme Definitions (light.theme.ts, dark.theme.ts)   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Light Theme          │         Dark Theme                │ │
│  │  ─────────────        │         ──────────                │ │
│  │  • bg-primary: #fff   │         • bg-primary: #0a0a0a     │ │
│  │  • text-primary: #000 │         • text-primary: #fff      │ │
│  │  • Uses tokens        │         • Uses tokens             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                          ↓                                      │
│  Layer 3: Provider & Context (ThemeProvider.tsx)              │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  • Manages active theme state                             │ │
│  │  • LocalStorage persistence                               │ │
│  │  • System preference detection                            │ │
│  │  • Applies CSS variables to DOM                           │ │
│  │  • Provides toggle/set methods                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                          ↓                                      │
│  Layer 4: Consumption (useTheme hook + Components)            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Components use:                                          │ │
│  │  1. useTheme() hook → Direct theme object access         │ │
│  │  2. CSS variables → className utilities                  │ │
│  │  3. Inline styles → theme.colors.* values               │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Action (Toggle Button Click)
         │
         ▼
toggleTheme() function
         │
         ├──▶ Update state: setMode(newMode)
         │
         ├──▶ Save to localStorage: localStorage.setItem()
         │
         └──▶ Apply to DOM: applyThemeToDOM()
                  │
                  ├──▶ Set CSS variables on :root
                  │    (--color-bg-primary, --color-text-primary, etc.)
                  │
                  └──▶ Set data-theme attribute on <html>
                       (data-theme="light" or "dark")
                            │
                            ▼
                  CSS automatically updates all themed elements
                            │
                            ▼
                  Components re-render (only if using useTheme())
```

## Module Integration Patterns

### Pattern 1: Global Theme (Current)
```
App
 └─ AppProviders
     ├─ Redux Provider
     └─ ThemeProvider (Global)
         └─ All Components inherit theme
```

### Pattern 2: Module-Specific Override
```
PropertyManagement Module
 │
 ├─ PropertyManagementPage
 │   └─ useTheme() → baseTheme
 │       └─ getPropertyTheme(baseTheme) → moduleTheme
 │           └─ Components use moduleTheme
 │
 └─ Property-specific theme values
     (e.g., green accent instead of blue)
```

### Pattern 3: Hybrid Approach
```
App (Global Theme)
 │
 ├─ Header (uses global theme)
 │   └─ ThemeToggle
 │
 ├─ Dashboard (uses global theme)
 │   └─ Stats cards with global colors
 │
 └─ PropertyManagement (module theme)
     ├─ Inherits global theme
     └─ Overrides specific colors
         └─ Brand primary: green (properties)
```

## Storage & Persistence

```
┌──────────────────────────────────────────────────────────┐
│                   Theme Persistence                       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  1. Initial Load                                        │
│     ┌─────────────────────────────────────────────┐    │
│     │ Check localStorage → Found?                 │    │
│     │   ├─ Yes → Use stored value                 │    │
│     │   ├─ No  → Check defaultMode prop           │    │
│     │   └─ None → Detect system preference        │    │
│     └─────────────────────────────────────────────┘    │
│                         │                               │
│                         ▼                               │
│  2. Theme Change                                       │
│     ┌─────────────────────────────────────────────┐    │
│     │ User toggles → New mode                     │    │
│     │   ├─ Update React state                     │    │
│     │   ├─ Save to localStorage                   │    │
│     │   └─ Apply CSS variables                    │    │
│     └─────────────────────────────────────────────┘    │
│                         │                               │
│                         ▼                               │
│  3. Page Refresh                                       │
│     ┌─────────────────────────────────────────────┐    │
│     │ Read localStorage → Apply theme instantly   │    │
│     │ (No flash of wrong theme!)                  │    │
│     └─────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## File Dependencies

```
ThemeProvider.tsx
 ├─ imports → types.ts (Theme, ThemeMode, ThemeContextValue)
 ├─ imports → light.theme.ts (lightTheme)
 ├─ imports → dark.theme.ts (darkTheme)
 └─ exports → ThemeContext

useTheme.ts
 ├─ imports → ThemeProvider.tsx (ThemeContext)
 ├─ imports → types.ts (ThemeContextValue)
 └─ exports → useTheme hook

light.theme.ts / dark.theme.ts
 ├─ imports → types.ts (Theme)
 ├─ imports → tokens.ts (tokens)
 └─ exports → lightTheme / darkTheme

tokens.ts
 └─ exports → tokens object (const)

AppProviders (index.tsx)
 ├─ imports → Redux Provider + store
 ├─ imports → ThemeProvider
 └─ exports → AppProviders component

main.tsx
 ├─ imports → AppProviders
 └─ wraps App with AppProviders

Components
 ├─ imports → useTheme from '@/app/providers'
 └─ consumes → theme, mode, toggleTheme, setTheme
```

## Performance Characteristics

```
┌────────────────────────────────────────────────────────────┐
│                Performance Optimizations                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Context Updates                                       │
│     • useMemo for theme object                           │
│     • useCallback for toggle/set functions               │
│     • Only consuming components re-render                │
│                                                            │
│  2. CSS Variables                                         │
│     • Instant theme switching                            │
│     • No React re-renders needed for colors              │
│     • Browser-native updates                             │
│                                                            │
│  3. LocalStorage                                          │
│     • Read once on mount                                 │
│     • Write only on change                               │
│     • Synchronous (fast)                                 │
│                                                            │
│  4. System Preference Listener                            │
│     • Passive event listener                             │
│     • Properly cleaned up                                │
│     • Only fires on system change                        │
│                                                            │
│  5. Token System                                          │
│     • Const object (no computation)                      │
│     • Imported statically                                │
│     • TypeScript optimizes away at runtime               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Extension Points

```
Want to add:                    Modify:
─────────────                   ────────
New colors                  →   tokens.ts + themes + CSS vars
New token type              →   tokens.ts + types.ts
Module-specific theme       →   Create module/theme/custom.theme.ts
New theme mode (e.g., auto) →   types.ts + ThemeProvider logic
Theme presets               →   Create preset files + UI
Analytics on theme change   →   Add to toggleTheme function
Backend persistence         →   Replace localStorage with API calls
```

---

## Quick Reference

### Import Paths
- Theme hook: `@/app/providers` (useTheme)
- Theme types: `@/styles/themes/types`
- Tokens: `@/styles/themes/tokens`
- Themes: `@/styles/themes/light.theme` or `dark.theme`

### Common Patterns
```typescript
// Access theme
const { theme } = useTheme();

// Access mode
const { mode } = useTheme();

// Toggle theme
const { toggleTheme } = useTheme();
toggleTheme();

// Set specific theme
const { setTheme } = useTheme();
setTheme('dark');

// Use CSS variables
<div className="bg-surface text-primary" />

// Use theme object
<div style={{ color: theme.colors.text.primary }} />

// Use tokens
<p style={{ fontSize: theme.tokens.typography.fontSize.lg }} />
```

This architecture provides maximum flexibility while maintaining simplicity!
