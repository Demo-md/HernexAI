# Design Token Schema

Use CSS custom properties as semantic tokens, then expose them through Tailwind v4 utilities where useful.

```css
:root {
  --color-brand: ...;
  --color-brand-contrast: ...;
  --color-surface: ...;
  --color-surface-muted: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --space-section: ...;
  --container-page: ...;
  --radius-sm: ...;
  --radius-md: ...;
  --shadow-soft: ...;
  --motion-fast: ...;
  --motion-slow: ...;
  --focus-ring: ...;
}
```

Define a small scale for each family. Add a token only when it has repeated semantic use. Keep raw values at component boundaries rare and explain intentional exceptions.
