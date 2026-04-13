# DSA Visualizer

An interactive visualizer for classic sorting and pathfinding algorithms. Built as a single-page Angular application with the strategy pattern at its core — each algorithm is a generator that yields snapshots of its intermediate state, and a small runner steps through them for play / pause / step-through / scrub-back controls.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Angular 21](https://angular.dev) — standalone components, new `@if` / `@for` control flow, signal inputs (`input()`, `model()`, `output()`), `inject()`-based DI |
| Change detection | Zoneless (`provideZonelessChangeDetection()`) |
| UI components | [Tessera UI](https://github.com/jkguidaven/tessera-ui) — Stencil-based web components (`ts-button`, `ts-slider`, `ts-toolbar`, `ts-sidebar`, `ts-page-header`, `ts-nav`, `ts-select`, `ts-checkbox`, `ts-icon`) |
| Build | `@angular/build:application` (esbuild-based) |
| Styling | SCSS, Tessera design tokens overridden on `:root[data-theme]` |
| Icons | Lucide (shipped via `@tessera-ui/core`) |
| Fonts | Quicksand (self-hosted), JetBrains Mono (Google Fonts) |
| Package manager | Yarn 1 |
| Tests | Vitest (via `@angular/build:unit-test`) |

## Project structure

```
src/
├── app/
│   ├── app.ts / app.html              # Root standalone component
│   ├── app.config.ts                  # providers (router, zoneless CD)
│   ├── app.routes.ts                  # /sorting, /pathfinder
│   ├── common/
│   │   ├── classes/                   # framework-agnostic TypeScript
│   │   │   ├── models/
│   │   │   │   ├── array.model.ts
│   │   │   │   └── graph.model.ts
│   │   │   └── strategies/
│   │   │       ├── sort/              # 6 sort strategies + runner + factory
│   │   │       └── pathfinder/        # 2 pathfinder strategies + runner + factory
│   │   ├── components/
│   │   │   ├── array-display/         # SVG bar chart
│   │   │   └── graph-display/         # SVG grid with drag interactions
│   │   ├── layout/
│   │   │   ├── layout.component.*     # ts-app-layout + ts-sidebar + ts-page-header
│   │   │   └── page-sidenav/          # ts-nav + ts-nav-item routing menu
│   │   ├── theme.service.ts           # signal-based theme with localStorage
│   │   └── theme-toggle.component.ts  # sun/moon toggle in the header
│   └── views/
│       ├── sorting-view/
│       └── pathfinder-view/
├── index.html                         # Inline pre-paint theme bootstrap
├── styles.scss                        # Tessera token overrides + canvas
└── main.ts                            # bootstrapApplication(App, appConfig)
```

### Runner design

Each strategy is an ES generator:

```ts
*iterator(model: ArrayObjectModel): Generator {
  // mutate the model, `yield model` to record a snapshot
}
```

The runner (`SortRunner` / `PathFinderRunner`):
- Pushes each yielded snapshot onto a state stack
- Drives playback via `setTimeout` at a speed derived from input size
- Supports scrubbing backward through the stack (step-backward uses cached snapshots)
- Exposes `onUpdate: () => void` so the view component can trigger change detection in zoneless mode (`cdr.markForCheck()`)

This keeps the algorithm code completely free of Angular concerns.

## Getting started

### Prerequisites
- Node.js ≥ 20 (tested on 25)
- Yarn 1.x

### Install & run

```bash
yarn install
yarn start     # http://localhost:4200
```

### Build

```bash
yarn build              # production build → dist/dsa-visualizer
yarn watch              # dev build with --watch
```

### Test

```bash
yarn test
```

## License

MIT — see [LICENSE](./LICENSE).
