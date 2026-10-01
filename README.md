# Renova Expert Hub

A modern, full-stack web application built with **React**, **TypeScript**, and **Tailwind CSS**, featuring a sophisticated UI powered by Radix UI components and Supabase backend integration.

## Overview

Renova Expert Hub is a feature-rich platform designed to deliver a seamless user experience with a professional, responsive interface. The application leverages modern web technologies and best practices to provide a scalable and maintainable codebase.

## Tech Stack

### Frontend
- **React 18.3** - UI library for building interactive components
- **TypeScript 5.5** - Type-safe JavaScript development
- **Vite 5.4** - Next-generation frontend build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **Shadcn/ui** - High-quality React components built on Radix UI and Tailwind CSS
- **React Router DOM 6.30** - Client-side routing
- **React Hook Form 7.53** - Efficient form management
- **Zod 3.23** - TypeScript-first schema validation

### Backend & Database
- **Supabase** - Open-source Firebase alternative with PostgreSQL backend
- **PostgreSQL** - Relational database (via Supabase)

### State Management & Data Fetching
- **TanStack React Query 5.56** - Powerful server state management
- **React Hook Form** - Form state management

### UI Components & Styling
- **Lucide React** - Beautiful, consistent icon library
- **Recharts 2.12** - Composable charting library for data visualization
- **Embla Carousel** - Lightweight carousel solution
- **Sonner** - Toast notifications
- **Next Themes** - Dark mode support
- **CVA (Class Variance Authority)** - Type-safe component variants

### Developer Tools
- **ESLint 9.9** - Code quality and consistency
- **Prettier** - Code formatter
- **Tailwind CSS** - Pre-configured with custom design system
- **SWC** - Fast JavaScript compiler for Vite

## Project Structure

```
renova-expert-hub/
├── src/
│   ├── components/       # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/
│   │   └── supabase/    # Supabase client setup and types
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── App.tsx          # Main application component
├── tailwind.config.ts   # Tailwind CSS configuration
├── vite.config.ts       # Vite build configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## Language Composition

- **TypeScript**: 93.2%
- **PLpgSQL**: 4.5% (PostgreSQL stored procedures)
- **CSS**: 1.5%
- **Other**: 0.8%

## Key Features

✨ **Modern UI Design** - Built with Radix UI and Tailwind CSS for a polished, professional appearance

🎨 **Dark Mode Support** - Seamless theme switching with next-themes

📊 **Data Visualization** - Recharts integration for interactive charts and graphs

🔒 **Type Safety** - Full TypeScript support with Zod validation

🚀 **Performance Optimized** - Vite for fast builds, React Query for efficient data fetching

♿ **Accessibility** - Radix UI ensures WCAG compliance and accessible components

📱 **Responsive Design** - Mobile-first approach with Tailwind CSS

🎯 **Form Handling** - React Hook Form with Zod validation for robust form management

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdulfetah-Tech/renova-expert-hub.git
cd renova-expert-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Supabase credentials (already configured in the codebase).

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode for debugging
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Component Library

The project uses **Shadcn/ui** components, which include:
- Accordion, Alert Dialog, Avatar
- Buttons, Cards, Checkboxes
- Dialogs, Dropdowns, Forms
- Navigation menus, Tabs, Tables
- Toast notifications, Tooltips
- And many more...

All components are fully customizable through Tailwind CSS and stored in `src/components/ui/`

## Database Integration

Supabase provides:
- PostgreSQL database with real-time capabilities
- Authentication and authorization
- Row-level security
- RESTful API
- Real-time subscriptions

Database types are auto-generated and available in `src/integrations/supabase/types.ts`

## Performance

- **Fast Builds**: Vite provides sub-second builds
- **Optimized Bundle**: Tree-shaking and code splitting
- **Efficient Data Fetching**: TanStack React Query with caching
- **Code Splitting**: Automatic route-based code splitting with React Router

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private. For license information, please contact the repository owner.

## Author

**Abdulfetah-Tech** - [GitHub Profile](https://github.com/Abdulfetah-Tech)

## Support

For issues, bug reports, or feature requests, please open an [issue](https://github.com/Abdulfetah-Tech/renova-expert-hub/issues) on GitHub.

---

**Last Updated**: 2025
