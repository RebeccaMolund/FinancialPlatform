# FinancialPlatform

FinancialPlatform is a Swedish-first financial dashboard prototype for companies
that process large volumes of invoices. It provides invoice and spend analytics,
dashboard KPIs, configurable charts, saved analyses, due-date monitoring, and
supplier and cost breakdowns. The interface can be changed to English from the
settings page.

The project is currently a frontend prototype. It does not yet include sign-in,
a production API, or a database. The application uses a local invoice dataset
and browser storage to make the main workflows usable before those services are
connected.

## Technical Decisions

### Frontend and tooling

- React with TypeScript is used for the application UI and type-safe domain
  models. I chose TypeScript specifically because this handles financial
  data, type safety catches the kind of mistake that's expensive to catch
  late.
- Vite is used for local development and production builds.
- Tailwind CSS provides utility styling, while CSS theme variables define the
  application's visual tokens and light/dark themes.
- Radix UI primitives (via Claude Code's suggestion) provide accessible
  interaction patterns for controls such as dialogs, menus, popovers, tabs,
  and switches. I kept this choice because it meant I didn't have to
  hand-roll keyboard navigation and ARIA attributes myself, freeing up time
  for the data layer and dashboard logic, while still landing a 95 on
  Accessibility in Lighthouse.
- Lucide React provides the interface icons.

### Application architecture

- The application is a single-page app with lazy-loaded pages for the dashboard,
  new analysis, saved analyses, and settings.
- Shared invoice data is the source for dashboard KPIs and chart datasets.
  Derivation functions in `src/services` keep calculations consistent across
  views.
- Service modules form the integration boundary for data access. They currently
  return local mock data and can later be replaced with API requests without
  moving data-fetching logic into the UI components. I designed it this way
  so a real backend could be connected later without touching the UI.
- Recharts is used for responsive bar, line, area, pie, and donut charts.

### State and persistence

- Application state is managed with React state at the app and page level.
- `localStorage` persists settings, saved analyses, the selected page, dashboard
  filters, selected currency, and dashboard edit mode.
- Dashboard cards support built-in and saved-analysis cards, chart variants,
  color choices, and user-configurable placement.

### Product and localization decisions

- Swedish is the default language and the default formatting locale.
- English is available as a user-selectable language in settings.
- SEK is the default currency; the dashboard also supports EUR and USD display.
- The layout is responsive and includes a mobile navigation experience.
- Light and dark themes are controlled through user settings, built on
  Material Design 3 token-based theming rather than hardcoded colors. I'd
  used MD3 before on a dashboard at ILT Education, where accessibility was
  critical since the products were used by students and teachers in
  schools, and I knew it held up well there, so I carried the same
  approach into Finsikt for consistency and accessibility from the start.
- Lazy-loaded pages use a skeleton loading state while their content is loaded.

## A Decision I'd Defend

Early on, chart titles were separate strings from the data they described,
and the two could drift out of sync, a title could say one thing while the
chart plotted something else. I fixed this by introducing a `ChartSpec`
type (`{ subject, groupBy, metric }`) as the single source of truth: the
same spec both derives the chart's data and generates its title through a
shared label map. It's a small change, but it makes it structurally
impossible for a title to lie about what's on screen, which matters more
in a financial dashboard than almost anywhere else.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Current Prototype Boundaries

The following production capabilities are intentionally outside the current
scope:

- User sign-in, authorization, and account management
- A production backend API
- Persistent server-side storage and a database
- Live invoice imports and synchronization
- Production-grade currency conversion and financial data integrations

## Component library

### Storybook

Run the component documentation locally:

```bash
npm run storybook
```

Create a static Storybook build with:

```bash
npm run build-storybook
```

Use the Theme toolbar control to view stories in light or dark mode. Storybook
loads the same stylesheet as the app, so components receive the application
theme tokens.

### Design tokens

Color tokens live in `src/styles/theme.css` as CSS custom properties. The
`--md3-*` values are the underlying palette; semantic aliases such as
`--background`, `--foreground`, `--primary`, and `--surface-*` are mapped to
Tailwind color utilities. The `.dark` class switches the values for dark mode.
Spacing follows Tailwind's 4px base scale, and typography uses Inter with IBM
Plex Sans as the additional font family. See the Design tokens story for a
side-by-side overview.

### Adding a component

1. Keep reusable app components in `src/app/components`; put shared primitive
   wrappers in `src/app/components/ui`.
2. Export a named TypeScript props type and use it as the component's props
   annotation. Add JSDoc for the component and each custom prop, including
   what it is for, when to use it, and when not to use it. Document observed
   behavior only.
3. Add a colocated `*.stories.tsx` file. Type its metadata with
   `Meta<typeof Component>` and stories with `StoryObj<typeof meta>` so
   Storybook can infer controls from the component's TypeScript props.
4. Cover the default state, supported variants and sizes, disabled/error
   states where applicable, and both themes. Use only props and states the
   component actually supports.
5. Run `npm run build` and `npm run build-storybook`.

### Components covered and pending review

Stories cover the project-specific components (`ColorPicker`, `VariantPicker`,
`DateFieldButton`, `Header`, `Sidebar`, `StatCard`, and `ImageWithFallback`)
and every UI primitive found to use application theme tokens or used by those
components: `Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`,
`Breadcrumb`, `Button`, `Calendar`, `Card`, `Chart`, `Checkbox`, `Command`,
`ContextMenu`, `Dialog`, `Drawer`, `DropdownMenu`, `Form`, `HoverCard`, `Input`,
`InputOTP`, `Menubar`, `NavigationMenu`, `Popover`, `Progress`, `RadioGroup`,
`ScrollArea`, `Select`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Slider`,
`Switch`, `Table`, `Tabs`, `Textarea`, `Toggle`, `ToggleGroup`, and `Tooltip`.

The props aliases for the documented primitives are exported from
`src/app/components/ui/props.ts` (and `ButtonProps` is also exported directly
from `button.tsx`). The component-specific props types for app components are
exported from their component modules.

These existing UI primitives do not use the application's semantic theme
tokens and are left undocumented in Storybook for separate review:
`AspectRatio`, `Carousel`, `Collapsible`, `Label`, `Pagination`, and `Sonner`.
The `use-mobile` hook and `cn` helper are utilities, not components.

Known API inconsistencies are documented rather than changed: the app
components do not expose disabled/error states where none exist; `Sidebar`
accepts a `darkMode` prop although its visual theme is controlled globally;
`StatCard.backgroundColor` is an unrestricted CSS class string; and
`DateFieldButton` exposes only its date-picker-specific click/open API rather
than native button props. Pagination's previous/next exports are links, not
disabled controls. The `Resizable` wrapper is also left undocumented because
its current `react-resizable-panels` imports (`PanelGroup` and
`PanelResizeHandle`) do not exist in the installed package API; the existing
TypeScript check reports those mismatches.
