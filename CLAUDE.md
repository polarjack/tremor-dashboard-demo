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

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate` - Generate sample data

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

### Tailwind Configuration
- Dark mode support with selector strategy
- Custom animations and keyframes
- Form plugin integration
- Extended theme configuration

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