# Dande - Zimbabwe Travel Booking Platform

A comprehensive booking platform for Zimbabwe travel services including hotels, flights, and VIP transport.

## Features

- **Hotel Bookings**: Search and book accommodations across Zimbabwe
- **Flight Bookings**: Domestic and international flight booking with two-way options
- **Transport Services**: VIP transport, luxury cars, and group transport
- **User Authentication**: Secure sign-in/sign-up with bcrypt password encryption
- **Advanced Search**: Unified search across all services with filters
- **Responsive Design**: Mobile-friendly interface with Zimbabwe-themed colors

## Tech Stack

- **Frontend**: React + TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM (in-memory for development)
- **Authentication**: bcrypt password hashing
- **State Management**: TanStack Query

## Environment Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL (for production)

### Environment Variables
Create a `.env` file in the root directory:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/dande
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment

The application is configured for deployment on platforms like:
- **Render**: Auto-deploy from GitHub
- **Heroku**: With PostgreSQL add-on
- **Railway**: Full-stack deployment
- **Replit**: Development and hosting

### Database Setup
```bash
# Push database schema
npm run db:push

# Generate migrations (if needed)
npm run db:generate
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Search
- `POST /api/search` - Unified search across all services

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/featured` - Get featured hotels
- `POST /api/hotels/search` - Search hotels

### Flights
- `GET /api/flights` - Get all flights
- `POST /api/flights/search` - Search flights

### Transport
- `GET /api/transport` - Get all transport options
- `POST /api/transport/search` - Search transport

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details

## Security Features

- **Password Encryption**: All passwords hashed with bcrypt
- **Input Validation**: Zod schema validation on all endpoints
- **CORS Configuration**: Proper cross-origin resource sharing
- **Session Management**: Secure session handling

## Testing

Use the demo credentials:
- Email: `user@example.com`
- Password: `password123`

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - See LICENSE file for details