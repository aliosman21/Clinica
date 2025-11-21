# Clinica - Medical Lab Management System

A full-stack clinic management system built with TanStack Start and React, featuring patient management, lab order processing, and comprehensive testing workflows.

## Tech Stack

- **Frontend**: React 19, TanStack Router, TanStack Start
- **Backend**: TanStack Start server functions
- **Database**: Prisma ORM with PostgreSQL/SQLite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Testing**: Cypress E2E, Vitest unit tests

## Development

From your terminal:

```sh
npm install
npm run seed        # Set up the database with sample data
npm run dev         # Start development server on http://localhost:3000
```

This starts your app in development mode, rebuilding assets on file changes.

## Testing

The project includes comprehensive end-to-end testing with Cypress:

```sh
# Interactive testing (recommended for development)
npm run test:e2e:dev

# Headless testing (for CI/CD)
npm run test:e2e

# Unit tests
npm run test
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Features

- **Patient Management**: Create, view, edit, and manage patient records
- **Lab Orders**: Process lab test orders with status tracking
- **Authentication**: Secure login/signup with session management
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Validation**: Comprehensive form validation and error handling
- **E2E Testing**: Full test coverage for all user workflows

## Database Setup

The application uses Prisma for database management:

```sh
# Generate Prisma client
npm run prisma-generate

# Run migrations
npx prisma migrate dev

# Seed the database with sample data
npm run seed

# Open Prisma Studio for data visualization
npx prisma studio
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Inputs/         # Form input components
│   ├── Layout/         # Layout components (Header, etc.)
│   ├── Representations/ # Data display components
│   └── ui/             # Shadcn/ui components
├── routes/             # TanStack Router pages
│   ├── login.tsx       # Authentication pages
│   ├── signup.tsx
│   └── _authed/        # Protected routes
│       ├── patients/   # Patient management
│       └── orders/     # Lab order management
├── server/             # Server-side functions
│   ├── auth/           # Authentication logic
│   ├── patients/       # Patient CRUD operations
│   └── orders/         # Order management
└── utils/              # Utility functions
    ├── auth/           # Authentication utilities
    └── database/       # Database configuration
```

## Key Routes

- `/` - Dashboard (requires authentication)
- `/login` - User login
- `/signup` - User registration  
- `/patients` - Patient list and management
- `/orders` - Lab order management

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="your-database-connection-string"
SESSION_SECRET="your-session-secret"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:e2e`
5. Submit a pull request

## License

This project is licensed under the MIT License.
