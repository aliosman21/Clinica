# Clinica Management System

A modern clinic management system built with TanStack Start, Prisma, and TypeScript.

## Features

- Patient management
- Lab test orders and tracking
- User authentication

## How to Run This App

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   yarn
   ```

3. **Configure environment**
   - Open the `.env` and update the `DATABASE_URL`



4. **Run the database migrations**
   ```bash
   yarn prisma-migrate
   ```

5. **Seed the database**
   ```bash
   yarn seed
   ```

6. **Start the development server**
   ```bash
   yarn dev
   ```
7. **Running the e2e tests**
   ```bash
   yarn test:e2e
   ```

## Login Credentials

- **Email**: `ali@test.com`
- **Password**: `Aa1234!!`

Alternatively, you can enter any email to be redirected to the signup page to create a new account.

## Tech Stack

- **Frontend**: TanStack Start, React, TypeScript
- **Backend**: TanStack Start API Routes
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns


### TanStack Start for SSR
I chose **TanStack Start** as our full-stack framework because it provides excellent Server-Side Rendering (SSR) capabilities out of the box. This ensures better SEO, faster initial page loads, and improved user experience

### Server Function Organization
All server-side functionality is systematically organized in the **`server/` directory**, with each feature having its own dedicated function file:
- `server/auth/` - Authentication handlers (login, logout, signup, user management)
- `server/patients/` - Patient CRUD operations
- `server/orders/` - Order management functions
- `server/lab-tests/` - Lab test operations

This modular approach makes the codebase more maintainable, testable, and easier to scale.

### File-Based Routing
I utilize **TanStack Router's file-based routing system**, which provides:
- Automatic route generation based on file structure
- Type-safe navigation and parameters
- Nested routing with layout support
- Built-in loading states and error boundaries

The routing structure in `src/routes/` clearly maps to the application's URL structure, making navigation intuitive for both developers and users.

### Component Architecture
**Reusable components** are organized in the `components/` directory and built using **shadcn/ui** patterns:
- `components/ui/` - Base UI primitives shadcn (buttons, inputs, dialogs)
- `components/Inputs/` - Form input components with validation
- `components/Representations/` - Complex display components (tables, dialogs)
- `components/Layout/` - Layout and navigation components

### Form Management
I use **TanStack Form** for robust form handling, providing:
- Type-safe form validation
- Real-time field validation
- Optimized re-renders
- Excellent developer experience with TypeScript integration

### State Management & API Calls
**TanStack React Query** handles all API communication, offering:
- Automatic caching and background updates
- Optimistic updates for better UX
- Loading and error states management
- Efficient data synchronization betIen server and client

### Utility Functions & Testing
Business logic is extracted into the **`utils/` directory** with comprehensive unit testing:
- `utils/general/formatters.ts` - Data formatting utilities
- `utils/general/order-calculations.ts` - Business logic calculations
- `utils/general/status-helpers.ts` - Status management utilities
- `utils/__tests__/` - Unit tests ensuring code reliability

### Custom Hooks
Reusable logic is encapsulated in **custom hooks** stored in the `hooks/` directory:
- `useConfirmDialog` - Dialog state management
- `usePagination` - Table pagination logic
- `useDebounce` - Input debouncing for search

### End-to-End Testing
**Cypress** is integrated for comprehensive E2E testing, ensuring:
- User workflow validation
- Cross-browser compatibility
- Regression prevention
- Confidence in deployments

This architecture promotes code reusability, maintainability, and scalability while providing excellent developer experience and robust testing coverage.

## Known Limitations & Areas for Improvement

While the current implementation demonstrates solid full-stack development practices, there are several areas that could be enhanced for production-ready deployment:

### 🔒 Enhanced Security & Authentication

**Current State**: Basic authentication with simple session management
**Improvements Needed**:
- **Secure Session Management**: Implement HTTPS-only and HttpOnly cookies for session tokens
- **Role-Based Access Control (RBAC)**: Different permission levels for doctors, nurses, lab technicians, and administrators
- **Session Security**: Proper token rotation, secure logout, and session timeout handling
- **Input Sanitization**: Additional layers of protection against XSS and SQL injection

### 📝 Type Safety & Validation

**Current State**: Basic TypeScript types with TanStack Form validation
**Improvements Needed**:
- **Zod Integration**: Runtime type validation with Zod schemas for all API endpoints
- **Shared Type Definitions**: Common schemas between client and server for better type safety
- **API Response Validation**: Ensure all server responses match expected types
- **Form Validation Enhancement**: More comprehensive validation rules using Zod schemas

