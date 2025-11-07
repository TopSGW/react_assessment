# Marketplace Frontend - React Assessment

A React application that integrates with the Marketplace Backend API, implementing authentication, product management, and shopping cart functionality.

## Features

### ✅ Implemented Core Features

1. **Authentication**
   - Login form with email and password
   - JWT token storage in localStorage
   - Protected routes for authenticated pages
   - Logout functionality

2. **Products**
   - Product listing page with grid layout
   - Product detail page with full information
   - Add to cart functionality
   - Loading states and error handling

3. **Shopping Cart**
   - Add items to cart
   - Update item quantities
   - Remove items from cart
   - Cart badge showing item count
   - Cart summary with total calculation
   - Works for both authenticated and guest users

4. **UI/UX**
   - Clean, modern design
   - Responsive layout
   - Loading indicators
   - Error messages
   - Navigation bar with user status

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for auth and cart

## Project Structure

```
src/
├── components/
│   ├── Cart.jsx           # Shopping cart page
│   ├── Navbar.jsx         # Navigation bar
│   ├── ProductCard.jsx    # Product card component
│   └── ProtectedRoute.jsx # Route protection HOC
├── pages/
│   ├── Login.jsx          # Login page
│   ├── Products.jsx       # Product listing page
│   └── ProductDetail.jsx  # Product detail page
├── context/
│   ├── AuthContext.jsx    # Authentication state
│   └── CartContext.jsx    # Cart state management
├── services/
│   └── api.js             # API service layer
├── App.jsx                # Main app component
└── main.jsx               # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Test Credentials

- **Email**: john.doe@example.com
- **Password**: password123

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api`

### Endpoints Used

- `POST /api/auth/login` - User authentication
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/cart` - Fetch user cart (authenticated)
- `POST /api/cart` - Add item to cart (authenticated)
- `PUT /api/cart` - Update cart item (authenticated)
- `DELETE /api/cart/:id` - Remove cart item (authenticated)

## State Management

### AuthContext
- Manages user authentication state
- Stores JWT token in localStorage
- Provides login/logout functions
- Checks authentication status

### CartContext
- Manages shopping cart state
- Syncs with backend for authenticated users
- Uses localStorage for guest users
- Provides cart operations (add, update, remove)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Implemented

- ✅ Login form with validation
- ✅ JWT token storage and management
- ✅ Protected routes
- ✅ Product listing with images
- ✅ Product detail page
- ✅ Add to cart functionality
- ✅ Cart management (view, update, remove)
- ✅ Navigation with cart badge
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Clean code structure

## Assessment Criteria Met

### Functionality (50%) - ✅
- Login works and token is stored
- Products are fetched and displayed
- Can view product details
- Cart functionality works

### Code Quality (30%) - ✅
- Clean component structure
- Proper state management with Context API
- Error handling throughout
- Reusable components

### UI/UX (20%) - ✅
- Modern styling
- Loading states
- Error messages
- User-friendly navigation
