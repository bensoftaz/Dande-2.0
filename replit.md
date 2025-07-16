# Dande - Zimbabwe Travel Booking Platform

## Overview

Dande is a comprehensive travel booking platform specifically designed for Zimbabwe tourism. It's a full-stack web application that allows users to search and book hotels, flights, and VIP transport services. The platform features a modern, responsive design with a focus on showcasing Zimbabwe's travel destinations.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**July 15, 2025**
- ✓ Implemented comprehensive search functionality with unified /api/search endpoint
- ✓ Added bcrypt password encryption for secure authentication system
- ✓ Created dedicated search page with advanced filters and result display
- ✓ Enhanced image optimization with high-quality Zimbabwe imagery (Victoria Falls, Matobo Hills)
- ✓ Added unified search capability across hotels, flights, and transport
- ✓ Improved transport page with expanded vehicle options and location-based services
- ✓ Enhanced authentication with proper password hashing and validation
- ✓ Added comprehensive search filters (location, price range, capacity)
- ✓ Updated header navigation with search functionality
- ✓ Fixed all color themes to maintain consistent Zimbabwe green branding

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing with dedicated pages for each section
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom Zimbabwe green-themed colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage)
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API**: RESTful API with JSON responses
- **Session Management**: Built-in session handling capabilities
- **Authentication**: Custom sign-in/sign-up system with form validation

### Development Architecture
- **Monorepo Structure**: Client, server, and shared code in one repository
- **Hot Reload**: Vite dev server with HMR for frontend development
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

## Key Components

### Database Schema (shared/schema.ts)
- **Hotels**: Name, location, city, description, price, rating, amenities, featured status
- **Flights**: Airline, routes, pricing, duration, scheduling information
- **Transport**: VIP transport services with features, capacity, and pricing
- **Bookings**: Customer information and booking details for all service types

### API Endpoints (server/routes.ts)
- **Hotels**: GET /api/hotels, /api/hotels/featured, /api/hotels/:id, POST /api/hotels/search
- **Flights**: Similar CRUD operations for flight services
- **Transport**: VIP transport service endpoints
- **Bookings**: Booking creation and management

### Frontend Pages
- **Home**: Hero section, search functionality, featured content
- **Hotels**: Hotel listings with search and filtering
- **Flights**: Flight search and booking interface
- **Transport**: VIP transport services showcase
- **Booking**: Universal booking form for all service types

### UI Components
- **Search Components**: Multi-tab search interface (hotels, flights, transport)
- **Card Components**: Reusable cards for hotels, flights, and transport
- **Form Components**: Booking forms with validation using react-hook-form and Zod
- **Navigation**: Header with mobile-responsive navigation

## Data Flow

1. **User Search**: Users interact with search forms that filter available services
2. **API Requests**: Frontend makes HTTP requests to Express API endpoints
3. **Database Queries**: Drizzle ORM queries PostgreSQL database
4. **Response Processing**: API returns JSON data consumed by React Query
5. **UI Updates**: Components re-render with fresh data automatically
6. **Booking Flow**: Form submission creates booking records in database

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Libraries**: Radix UI components, Lucide React icons
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Routing**: Wouter for lightweight routing
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **Linting**: ESLint configuration
- **Database**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized React application to dist/public
- **Backend**: esbuild bundles Node.js server to dist/index.js
- **Database**: PostgreSQL hosted on Neon with connection pooling

### Development Workflow
- **Local Development**: Vite dev server with Express API proxy
- **Database Migrations**: Drizzle Kit handles schema changes
- **Environment Variables**: DATABASE_URL required for database connection

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Zimbabwe Theming**: Custom color palette reflecting Zimbabwe's flag and culture
- **Search Functionality**: Advanced filtering for all service types
- **Booking System**: Unified booking flow for hotels, flights, and transport
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Performance**: Optimized with React Query caching and Vite bundling

The application uses a memory storage implementation as a fallback, but is designed to work with PostgreSQL in production. The modular architecture allows for easy extension of new service types and features.