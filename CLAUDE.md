# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Important Development Guidelines

## Package Management
- **CRITICAL**: This project uses `pnpm`, not `npm`. All commands must use `pnpm`.
- Dependencies are locked to specific versions for stability
- The project uses `pnpm-workspace.yaml` for workspace configuration

## Development Workflow
- Always run `pnpm run lint` after making code changes
- Use `pnpm run generate` to regenerate sample data when needed
- The development server runs on http://localhost:3000 via `pnpm run dev`

## Architecture Constraints
- **Never create new files** unless absolutely necessary - always prefer editing existing files
- Follow the existing component organization patterns in `src/components/ui/`
- Maintain TypeScript strict typing throughout the codebase
- Use existing utility functions from `src/lib/utils.ts` and `src/lib/chartUtils.ts`

## Cloudflare Edge Runtime
- The application uses edge runtime (`next.config.mjs`) for Cloudflare Pages compatibility
- Build for Cloudflare using `pnpm run pages:build`
- Preview builds locally with `pnpm run preview`

# Dashboard Project Specification

## Project Overview

**Name**: template-dashboard-3  
**Version**: 0.1.0  
**Type**: Next.js SaaS Dashboard Template  
**License**: Tremor License (Commercial)  

This is a modern dashboard application built with Next.js 14, Tremor Raw components, and TypeScript. It provides a comprehensive analytics interface with data visualization, user management, and settings functionality.

## Technology Stack

### Core Framework
- **Next.js**: 14.2.23 (App Router)
- **React**: 18.2.0
- **TypeScript**: ^5.8.2
- **Tailwind CSS**: ^3.4.17

### UI Components & Libraries
- **Tremor Raw**: Custom dashboard components
- **Radix UI**: Headless UI primitives
  - Dialog, Dropdown, Popover, Select, Switch, Tooltip, etc.
- **Recharts**: ^2.15.1 (Data visualization)
- **Remix Icon**: ^4.6.0 (Icon library)

### Data Management
- **TanStack Table**: ^8.21.2 (Advanced table functionality)
- **Date-fns**: ^3.6.0 (Date manipulation)
- **React Day Picker**: ^8.10.1 (Date selection)

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting with Tailwind plugin
- **PostCSS**: CSS processing

## Project Structure

```
template-dashboard-main/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main layout group
│   │   │   ├── overview/      # Dashboard overview page
│   │   │   ├── details/       # Data details page  
│   │   │   ├── history/       # Price history visualization
│   │   │   └── layout.tsx     # Main layout wrapper
│   │   ├── settings/          # Settings pages
│   │   │   ├── general/
│   │   │   ├── billing/
│   │   │   ├── users/
│   │   │   └── layout.tsx
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── not-found.tsx      # 404 page
│   │   └── siteConfig.ts      # Site configuration
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Specialized UI components
│   │   │   ├── navigation/    # Navigation components
│   │   │   ├── overview/      # Dashboard-specific components
│   │   │   ├── settings/      # Settings-specific components
│   │   │   ├── data-table/    # Advanced table components
│   │   │   └── icons/         # Custom icons
│   │   └── [Component].tsx    # Base UI components
│   ├── data/                  # Data management
│   │   ├── schema.ts          # TypeScript type definitions
│   │   ├── overview-data.ts   # Dashboard data
│   │   ├── data.ts            # Sample data
│   │   └── generateData.js    # Data generation script
│   └── lib/                   # Utility functions
│       ├── utils.ts           # General utilities
│       ├── chartUtils.ts      # Chart configuration utilities
│       └── useOnWindowResize.tsx # Custom React hook
├── public/                    # Static assets
│   └── data/                  # CSV data files
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
└── package.json              # Project dependencies
```

## Features & Pages

### Navigation Structure
- **Overview** (`/overview`) - Main dashboard with KPIs and charts
- **Details** (`/details`) - Detailed data table view
- **History** (`/history`) - Historical price data visualization
- **Settings** (`/settings`) - Application settings
  - General settings
  - Billing management
  - User management

### Key Components

#### Data Visualization
- **LineChart**: Dual-axis chart component using Recharts
- **DashboardChartCard**: Chart widgets for overview
- **DashboardProgressBarCard**: Progress indicators
- **DashboardCategoryBarCard**: Category breakdown charts

#### Data Tables
- **DataTable**: Advanced table with TanStack Table
- **DataTableFilter**: Search and filtering
- **DataTablePagination**: Table pagination
- **DataTableRowActions**: Row-level actions

#### Navigation
- **Sidebar**: Main navigation with workspace dropdown
- **MobileSidebar**: Responsive mobile navigation
- **UserProfile**: User account management

## Data Schema

### Usage Data
```typescript
type Usage = {
  owner: string
  status: string
  costs: number
  region: string
  stability: number
  lastEdited: string
}
```

### Overview Analytics
```typescript
type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}
```

### Historical Price Data
```typescript
interface HistoryData {
  date: string
  sol_price: number
  msol_price: number
  btc_price: number
  msol_holdings: number
  daily_msol_sold: number
  daily_usd_sold: number
  daily_zbtc_bought: number
  cum_zbtc: number
}
```

## Chart Configuration

### Available Colors
Chart utilities provide predefined color schemes:
- `blue`, `emerald`, `violet`, `amber`, `gray`, `cyan`, `indigo`, `pink`
- Colors include variants for `bg`, `stroke`, `fill`, and `text` utilities

### Chart Features
- Responsive design with `ResponsiveContainer`
- Custom tooltips with dark theme styling
- Dual-axis support for different data scales
- Interactive legends and hover effects
- Grid lines and axis customization

## Development Commands

### Core Development
- `pnpm install` - Install dependencies (CRITICAL: project uses pnpm, not npm)
- `pnpm run dev` - Start development server at http://localhost:3000
- `pnpm run build` - Build production application
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint for code quality (run after code changes)

### Data Management
- `pnpm run generate` - Generate sample data using `src/data/generateData.js`

### Cloudflare Pages Deployment
- `pnpm run pages:build` - Build for Cloudflare Pages using @cloudflare/next-on-pages
- `pnpm run preview` - Preview Cloudflare Pages build locally
- `pnpm run deploy` - Deploy to Cloudflare Pages

### Key Configuration Files
- `next.config.mjs` - Next.js configuration with Cloudflare edge runtime setup
- `wrangler.jsonc` - Cloudflare Workers configuration
- `pnpm-workspace.yaml` - pnpm workspace configuration

## Styling Guidelines

### Design System
- **Dark Theme**: Primary design aesthetic
- **Typography**: Inter font family
- **Color Palette**: Tailwind CSS with custom extensions
- **Spacing**: Consistent padding and margin system
- **Animations**: Custom keyframes for smooth transitions

### Component Patterns
- Consistent prop interfaces across components
- Forwarded refs for composite components
- TypeScript strict typing
- Accessibility-first design with Radix UI

## Recent Additions

### History Page (`/history`)
A specialized data visualization page featuring:
- **Dual-axis line chart** showing SOL Price vs Cumulative zBTC
- **Custom colors**: SOL Price (#9C5CE9), Cumulative zBTC (#FFE46B)
- **Dark theme styling** with custom tooltips
- **CSV data loading** from `/public/data/history-price.csv`
- **Responsive design** for all screen sizes

## Architecture Patterns

### Next.js App Router Structure
The application uses Next.js 14 App Router with route groups:
- **Root Layout** (`src/app/layout.tsx`) - Contains Sidebar and ThemeProvider
- **Main Route Group** (`src/app/(main)/`) - Dashboard pages with shared layout
- **Settings Route Group** (`src/app/settings/`) - Settings pages with separate layout
- **Root Redirect** - `/` automatically redirects to `/overview`

### Layout Hierarchy
```
RootLayout (sidebar + theme)
├── (main)/layout.tsx (page padding wrapper)
│   ├── overview/page.tsx
│   ├── details/page.tsx  
│   └── history/page.tsx
└── settings/layout.tsx (settings-specific layout)
    ├── general/page.tsx
    ├── billing/page.tsx
    └── users/page.tsx
```

### Component Architecture
- **Base Components** (`src/components/`) - Reusable Tremor Raw components (Button, Card, Input, etc.)
- **UI Components** (`src/components/ui/`) - Feature-specific components organized by domain:
  - `navigation/` - Sidebar, UserProfile, workspace dropdowns
  - `data-table/` - Advanced table components with TanStack Table (filtering, pagination, row actions)
  - `overview/` - Dashboard-specific cards and widgets (charts, progress bars, KPI cards)
  - `settings/` - Settings-specific modals and forms
  - `icons/` - Custom animated icons

### Key Architectural Patterns
- **Sidebar Navigation**: Fixed sidebar (lg:pl-72) with mobile responsive drawer
- **Theme System**: Uses `next-themes` with dark mode as primary aesthetic
- **Route Groups**: `(main)` group for dashboard pages, separate `settings` group
- **CSV Data Loading**: Historical data loaded from `/public/data/` directory client-side
- **Chart System**: Centralized color utilities in `chartUtils.ts` with dark mode support

### Data Layer
- **Schema** (`src/data/schema.ts`) - TypeScript type definitions
- **Static Data** (`src/data/data.ts`, `overview-data.ts`) - Sample data
- **CSV Loading** (`public/data/`) - Historical data loaded client-side
- **Data Generation** (`generateData.js`) - Script for creating sample datasets

### Styling System
- **Tremor Raw** - Core component library built on Radix UI primitives
- **Chart Colors** (`src/lib/chartUtils.ts`) - Centralized color system with dark mode support
- **Custom Animations** - Defined in `tailwind.config.ts` for smooth transitions

## Configuration Files

### Site Configuration
```typescript
// src/app/siteConfig.ts
export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/overview", 
    details: "/details",
    history: "/history",
    settings: { /* ... */ }
  }
}
```

### Runtime Configuration
- **Edge Runtime** - Configured in `next.config.mjs` for Cloudflare Pages compatibility
- **Dark Mode** - Uses `next-themes` with class-based strategy
- **Font Optimization** - Inter font loaded via `next/font/google`

## Best Practices

### Code Organization
- Feature-based component organization
- Consistent naming conventions
- TypeScript strict mode
- Prop interface documentation

### Performance
- Next.js App Router for optimal loading
- Component lazy loading where appropriate
- Optimized image and font loading
- Efficient data fetching patterns

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## Dependencies Management

All dependencies are locked to specific versions for stability. Major libraries include:
- **UI Framework**: Radix UI components for accessibility
- **Charts**: Recharts for data visualization
- **Tables**: TanStack Table for advanced table features
- **Dates**: date-fns and React Day Picker for date handling
- **Styling**: Tailwind CSS with custom configuration

This specification provides a comprehensive overview of the dashboard project structure, features, and implementation details for development and maintenance purposes.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.