# Times in Lisbon - Newsletter Landing Page

## Overview

This is a full-stack newsletter landing page application for "Times in Lisbon" - a Portuguese newsletter service featuring interviews, restaurant recommendations, and curated content. The application is built with a modern React frontend and Express.js backend, using Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: TailwindCSS with shadcn/ui components
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Node.js with ESM modules

### Architecture Pattern
The application follows a monorepo structure with clear separation between client, server, and shared code:
- **Client**: React SPA with component-based architecture
- **Server**: RESTful API with Express.js
- **Shared**: Common schemas and types used by both client and server

## Key Components

### Frontend Architecture
- **Pages**: Home landing page and Contact page with 404 fallback
- **Components**: Reusable UI components including subscription forms, navigation, social media links
- **Internationalization**: Multi-language support (English, Portuguese, French) with localStorage persistence
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

### Backend Architecture
- **API Routes**: RESTful endpoints for newsletter subscription and contact form submission
- **Data Storage**: PostgreSQL database with Drizzle ORM for persistent data storage
- **Validation**: Zod schema validation for all input data
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Schema
Two main entities:
- **Subscribers**: Newsletter subscriptions with optional name/phone, required email, and language preference
- **Contacts**: Contact form submissions with name, email, message, and language

## Data Flow

### Newsletter Subscription Flow
1. User fills subscription form with email (required), optional name/phone
2. Frontend validates input using Zod schema
3. POST request to `/api/subscribe` with user data and language preference
4. Backend checks for duplicate email addresses
5. New subscriber record created in database
6. Success response with confirmation message

### Contact Form Flow
1. User completes contact form with name, email, and message
2. Form validation ensures all fields are properly filled
3. POST request to `/api/contact` with form data and language
4. Backend creates contact record in database
5. Success confirmation displayed to user

### Language Management
- Language preference stored in localStorage
- Dynamic content switching without page reload
- Language preference included in all API requests
- Translations managed through centralized translation files

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@radix-ui/***: Accessible UI primitive components
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **wouter**: Lightweight React routing

### Development Tools
- **Vite**: Build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire application
- **TailwindCSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend compiles to `dist/index.js` using ESBuild
3. Single Node.js server serves both static assets and API

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development mode with hot reloading via Vite middleware
- Production mode serves pre-built static assets

### Database Management
- Drizzle migrations stored in `./migrations` directory
- Schema definitions in `shared/schema.ts` for type safety
- Push-based database updates using `drizzle-kit push`

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon serverless)
- Environment variable support for database connection
- Static file serving capability

### Vercel Deployment Configuration
- **Build Command**: `npm run build` (builds frontend with Vite and backend with ESBuild)
- **Output Directory**: `dist/public` (contains static frontend assets)
- **Functions**: `dist/index.js` (Node.js 20.x serverless function for API and SSR)
- **Routes Configuration**: Static files served from `dist/public`, all API routes and fallbacks handled by `dist/index.js`
- **Environment Variables**: Requires `DATABASE_URL` for PostgreSQL connection
- **Build Process**: Frontend assets compiled to `dist/public/`, backend compiled to `dist/index.js`