# Product Catalog

A responsive, accessible product catalog built with React and Vite. It loads products from the [DummyJSON](https://dummyjson.com/docs/products) API, shows them in a card grid, and filters them by title as you type.

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Features

- **Product grid**: each card shows the image, title, description, price, availability status, rating, SKU, tags and reviews.
- **Search**: filters products by title as you type (case-insensitive) and shows how many results match.
- **Loading, error and empty states**: each has its own message.
- **Responsive layout**: the grid goes from one column on phones to several columns on wider screens without media queries.
- **Light and dark mode**: follows the operating system setting.

## Project structure

```
src/
├── App.jsx                  # Fetching, search state and page layout
├── App.css                  # Catalog, grid and card styles
├── components/
│   └── ProductCard.jsx      # A single product card
├── index.css                # Global tokens (colors, fonts) and base styles
└── main.jsx                 # Entry point
```

## Implementation notes

- **Data fetching** happens once on mount inside a `useEffect`. The async function is defined inside the effect, as the `react-hooks/set-state-in-effect` lint rule expects.
- **Filtering** is computed from `products` and `query` on every render rather than stored in separate state, so the two can never get out of sync.
- **Grid**: `repeat(auto-fill, minmax(min(100%, 240px), 1fr))` creates as many columns as fit. The `min(100%, …)` prevents overflow on very narrow screens.
- **Card layout**: cards are flex columns, and the price block uses `margin-top: auto`, so prices line up across each row regardless of description length. Descriptions are clamped to three lines and reviews are collapsed in a `<details>` element.
- **Price** is formatted with `Intl.NumberFormat` as USD.
- **Availability badge** colors are green for "In Stock", amber for "Low Stock" and red for "Out of Stock". The status is always shown as text too.

## Accessibility

- Semantic landmarks: `header`, `main` and a `form` with `role="search"`.
- Each card is an `article` labelled by its `h2` title via `aria-labelledby`.
- The search field has a visible `<label>`.
- The result count is announced to screen readers through `aria-live="polite"`. The loading message uses `role="status"` and the error message uses `role="alert"`.
- Screen-reader-only text gives context to bare values ("Price:", "Rated 4.5 out of 5", "Availability:"). The decorative star icon is hidden with `aria-hidden`.
- Lists styled with `list-style: none` keep `role="list"`, because Safari otherwise drops their list semantics.
- Interactive elements have a visible focus ring (`:focus-visible`).
- Hover motion is disabled for users who prefer reduced motion.
- The search input uses a 16px font size so iOS Safari doesn't zoom in on focus.

