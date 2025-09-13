# Admin Dashboard Setup

This is a Next.js admin dashboard that integrates with your existing Node.js backend using Redux Toolkit for state management.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file in the dashboard directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the dashboard:**
- Open http://localhost:3000
- You'll be redirected to the login page
- Use your existing backend credentials to log in

## Features

- ✅ **Authentication**: Integrates with your existing backend auth system
- ✅ **Protected Routes**: Only authenticated users can access the dashboard
- ✅ **User Management**: View user information from your backend
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Redux Toolkit**: Modern state management with async thunks
- ✅ **TypeScript**: Fully typed Redux store and components

## Backend Integration

The dashboard connects to your existing backend API endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `GET /auth/check-auth` - Verify authentication
- `GET /users` - Get all users (for future user management)
- `PUT /users/profile` - Update user profile
- `PUT /users/password` - Change password

## File Structure

```
src/
├── app/
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── page.tsx          # Root redirect
├── components/
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── providers/        # Redux provider
│   └── ui/               # Base UI components
└── lib/
    ├── api.ts            # API client
    ├── storage.ts        # Safe localStorage utilities
    ├── store.ts          # Redux store configuration
    ├── hooks.ts          # Typed Redux hooks
    ├── slices/           # Redux Toolkit slices
    └── types.ts          # TypeScript types
```

## Redux Toolkit Features

- **Async Thunks**: Handle API calls with loading states
- **TypeScript Integration**: Fully typed store and actions
- **Persistent Storage**: Auth state persisted in localStorage
- **Error Handling**: Centralized error management
- **Selectors**: Optimized state selection

## Redux Store Structure

```typescript
{
  auth: {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
  }
}
```

## Available Actions

- `loginUser(credentials)` - Login with email/phone and password
- `registerUser(userData)` - Register new user
- `checkAuth()` - Verify current authentication
- `logoutUser()` - Logout and clear auth state
- `clearError()` - Clear error messages
- `initializeAuth()` - Initialize auth from localStorage

## Next Steps

1. **Add more dashboard features** (users, projects, news management)
2. **Implement charts** for analytics
3. **Add file upload** functionality
4. **Customize styling** to match your brand
5. **Add more API endpoints** as needed

## Development

- The dashboard uses Redux Toolkit for state management
- All API calls are handled by async thunks
- Authentication state is persisted in localStorage
- The app is fully TypeScript typed with Redux integration
