# React + TypeScript + Tailwind + Storybook Components

Two reusable UI components built with React, TypeScript, TailwindCSS, and Storybook:

- **InputField** — labeled text input with states (disabled, invalid, loading), variants (filled, outlined, ghost), sizes (sm, md, lg), optional clear and password toggle, and basic accessibility.
- **DataTable** — tabular display with column sorting, row selection (single/multi via checkboxes), loading and empty states.

## Tech
- React 18 + TypeScript
- Vite for dev/build
- TailwindCSS
- Storybook (React + Vite)
- Vitest + Testing Library

## Getting Started

```bash
pnpm i         # or npm i / yarn
pnpm dev       # run Vite dev server
pnpm storybook # run Storybook on http://localhost:6006
pnpm test      # run unit tests
```

## Project Structure

```text
src/
  components/
    DataTable.tsx
    DataTable.stories.tsx
    InputField.tsx
    InputField.stories.tsx
    __tests__/
      DataTable.test.tsx
      InputField.test.tsx
  lib/
    cn.ts
  playground/
    App.tsx         # demo usage in Vite app
  index.css
  main.tsx
.storybook/
  main.ts
  preview.ts
tailwind.config.ts
postcss.config.cjs
vite.config.ts
tsconfig.json
```

## Accessibility Notes
- `InputField` uses `aria-invalid`, `aria-describedby`, and `role="alert"` for error text, and supports loading states via `aria-busy`.
- `DataTable` indicates sort direction with `aria-sort` on headers and supports row selection via checkboxes with accessible labels.

## Approach
- Clean component APIs matching assignment props with a few ergonomic additions.
- Tailwind utility classes for variants/sizes with a small `cn()` helper for class merging.
- Generic `DataTable<T>` with typed columns and optional custom cell `render`.
- Minimal, readable styles with dark mode awareness (via `dark:` hooks).

## Deploying Storybook
- Build: `pnpm build-storybook` (outputs `storybook-static/`).
- Deploy to Chromatic or Vercel per your preference. See:
  - https://www.chromatic.com/
  - https://vercel.com/

## License
MIT
