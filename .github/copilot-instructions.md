# Chatify App - Copilot Instructions

## Project Overview
**Chatify** is a real-time messaging application with a **Node.js/Express backend** and **React frontend**. The backend provides authentication (signup/login/logout) and messaging APIs, while the frontend is built with React + Vite for modern development.

### Architecture Pattern
- **Backend**: Node.js + Express, port 3000 (configurable via `PORT` env var)
- **Frontend**: React 19 + Vite, handles UI and client-side state
- **Authentication**: JWT-based (bcryptjs for hashing, jsonwebtoken for tokens)
- **Database**: MongoDB via Mongoose (installed but schema/controllers not yet implemented)
- **Communication**: Express routes at `/api/auth/*` and `/api/message/*`

## Key Files & Patterns

### Backend Structure (`/backend/src`)
- **server.js**: Entry point, initializes Express, mounts routes, loads `.env`
- **routes/auth.route.js**: Authentication endpoints (signup/login/logout) - currently stubs
- **routes/message.route.js**: Messaging endpoints (send) - currently stubs
- **controllers/**: Empty directory (intended for business logic separation)

**Important**: Routes are currently returning placeholder text. Controllers should be implemented here to handle actual signup/login/message logic.

### Frontend Structure (`/frontend/src`)
- **App.jsx**: Root React component (currently default Vite template)
- **main.jsx**: React DOM entry point
- **assets/**: Static images and resources

**Important**: Frontend is not yet fully built out. App.jsx needs to be replaced with actual messaging UI.

## Development Workflows

### Starting Development
```bash
# Backend: Watch mode with hot reload
cd backend
npm run dev

# Frontend: Vite dev server (localhost:5173 by default)
cd frontend
npm run dev
```

### Production Deployment
```bash
# Backend: Production start
npm start

# Frontend: Build for production
npm run build
npm run preview
```

### Code Quality
```bash
# Frontend: Run ESLint checks
npm run lint
```

## Project-Specific Conventions

### Environment Configuration
- Backend uses `dotenv` to load `.env` file (keep sensitive values here, never hardcode)
- Example: `PORT=3000` sets the server port (see `server.js` comment: "do ukrywania wartości aby nie były zakodowane")

### Route Organization
- All routes prefixed: `/api/auth` for authentication, `/api/message` for messaging
- Routes should delegate to controller functions, not contain business logic
- Use Express router pattern: `import` router, mount with `app.use()`

### Frontend Configuration
- ESLint configured with React-specific rules (reactHooks, reactRefresh)
- Rule: Unused variables generate errors unless they match `^[A-Z_]` pattern (constants)
- No TypeScript yet; using vanilla JSX

### Dependencies to Be Aware Of
- **bcryptjs**: Used for password hashing (not yet implemented in controllers)
- **jsonwebtoken**: Used for session management (not yet implemented)
- **mongoose**: MongoDB ODM (installed but models not yet created)
- **cookie-parser**: Middleware for cookie handling (mounted in server.js, not yet used)
- **express**: Core routing and middleware framework

## Common Tasks & Examples

### Adding a New Route
1. Create handler in `controllers/` (e.g., `authController.js`)
2. Import and use in `routes/auth.route.js`
3. Example pattern from existing stubs:
```javascript
// routes/auth.route.js
import authController from "../controllers/authController.js";
router.post("/signup", authController.signup);
```

### Implementing JWT Authentication
- Middleware not yet created; should check `req.headers.authorization` or `req.cookies`
- Tokens generated in signup/login endpoints
- Verify tokens in protected message endpoints

### Adding Frontend Components
- Create `.jsx` files in `src/` subdirectories (e.g., `src/components/`)
- Import in `App.jsx` and render
- Use React hooks (useState, useEffect) for state and API calls
- CSS: Import `.css` files alongside components or in `index.css`

## Notes for AI Agents
- **Early stage project**: Many features are stub endpoints—expect to implement core logic
- **Controllers are empty**: Business logic needs to be added to `backend/src/controllers/`
- **Frontend is template**: Replace `App.jsx` content with actual messaging UI
- **No Mongoose models**: Create database schemas for users and messages
- **No middleware**: Implement JWT verification and error handling middleware
- **Keep conventions**: Maintain route structure, use controllers for logic, rely on env vars for config

---

*Last updated: December 2025*
