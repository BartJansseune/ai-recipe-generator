# AI Recipe Generator - Project Context

## Project Overview
An AI-powered recipe generator web application built with React, TypeScript, and AWS Amplify. This application generates personalized recipes using AI capabilities, with user authentication and data management powered by AWS backend services.

## Tech Stack

### Frontend
- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7** - Fast build tool and dev server
- **CSS** - Component styling

### Backend & Infrastructure
- **AWS Amplify Gen 2** - Backend framework with authentication and data management
- **AWS CDK 2** - Infrastructure as Code
- **Node.js** - Runtime environment

### Development Tools
- **ESLint** - Code linting with TypeScript and React plugins
- **tsx** - TypeScript execution for build scripts

## Project Structure

```
ai-recipe-generator/
├── amplify/              # AWS Amplify backend configuration
│   ├── auth/            # Authentication resource definitions
│   ├── data/            # Data/API resource definitions
│   ├── backend.ts       # Main backend definition
│   ├── package.json     # Backend dependencies
│   └── tsconfig.json    # Backend TypeScript config
├── src/                 # Frontend source code
│   ├── assets/         # Static assets (images, etc.)
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   ├── App.css         # Application styles
│   └── index.css       # Global styles
├── public/             # Public static assets
├── package.json        # Project dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript base config
├── tsconfig.app.json   # App TypeScript config
├── tsconfig.node.json  # Node/build TypeScript config
├── eslint.config.js    # ESLint configuration
└── index.html          # HTML entry point
```

## Key Files

### Frontend
- [src/App.tsx](src/App.tsx) - Main React component, currently showing default Vite template
- [src/main.tsx](src/main.tsx) - React app initialization and root rendering
- [vite.config.ts](vite.config.ts) - Vite build configuration

### Backend
- [amplify/backend.ts](amplify/backend.ts) - AWS Amplify backend configuration combining auth and data resources
- [amplify/auth/resource.ts](amplify/auth/resource.ts) - User authentication configuration
- [amplify/data/resource.ts](amplify/data/resource.ts) - Data models and API definitions

### Configuration
- [package.json](package.json) - Dependencies: aws-amplify, react, react-dom
- [tsconfig.json](tsconfig.json) - TypeScript configuration with strict mode
- [eslint.config.js](eslint.config.js) - Linting rules for TypeScript and React

## Development Workflow

### Available Scripts
```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Build for production (TypeScript check + Vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

### Development Server
- Runs on Vite's default port (typically http://localhost:5173)
- Hot Module Replacement (HMR) enabled for fast development
- TypeScript compilation happens in real-time

### Building
- TypeScript compilation with `tsc -b` flag (build mode)
- Vite bundles the application for production
- Output directory: `dist/`

## AWS Amplify Backend

### Authentication
- Configured in [amplify/auth/resource.ts](amplify/auth/resource.ts)
- Handles user sign-up, sign-in, and session management

### Data/API
- Configured in [amplify/data/resource.ts](amplify/data/resource.ts)
- Defines data models and GraphQL API schema
- Provides real-time data synchronization capabilities

### Backend Initialization
The [amplify/backend.ts](amplify/backend.ts) file combines all backend resources using `defineBackend()`. To add new resources like storage or functions, define them in the amplify directory and add to the backend definition.

## Current State

The application currently contains:
- Default Vite + React template UI (counter example)
- AWS Amplify backend infrastructure configured but not yet integrated into the frontend
- Basic project structure ready for AI recipe generation features

## Next Development Steps

Based on the project setup, likely next steps include:
1. Integrate AWS Amplify into the frontend (configure and initialize Amplify client)
2. Implement authentication UI (sign-up, sign-in components)
3. Design and implement recipe data models in amplify/data
4. Create AI recipe generation logic (likely using AWS services like Bedrock or Lambda)
5. Build recipe display and management UI components
6. Add recipe search, filtering, and favorites functionality

## Important Notes

### TypeScript
- Strict mode enabled for type safety
- Separate configs for app code ([tsconfig.app.json](tsconfig.app.json)) and build tools ([tsconfig.node.json](tsconfig.node.json))

### AWS Amplify Gen 2
- Uses the new Gen 2 architecture with TypeScript-first configuration
- Backend resources are defined in code, not JSON configuration
- Documentation: https://docs.amplify.aws/react/build-a-backend/

### Git
- Main branch: `main`
- Recent changes: Added AWS Amplify dependencies and configuration
- Untracked: `amplify/` directory (needs to be committed)

## Dependencies to Know

### Core Dependencies
- `aws-amplify` (^6.16.2) - AWS Amplify client library
- `react` (^19.2.0) - Latest React with new features
- `react-dom` (^19.2.0) - React DOM rendering

### Development Dependencies
- `@aws-amplify/backend` (^1.21.0) - Backend resource definitions
- `@aws-amplify/backend-cli` (^1.8.2) - Amplify CLI for deployment
- `vite` (^7.3.1) - Build tool
- `typescript` (^5.9.3) - TypeScript compiler
- `aws-cdk-lib` (^2.234.1) - AWS CDK for infrastructure

## Common Tasks

### Adding a New Component
1. Create file in `src/components/` (create directory if needed)
2. Export component as default or named export
3. Import in [src/App.tsx](src/App.tsx) or relevant parent component

### Adding Backend Resources
1. Create resource file in `amplify/` (e.g., `amplify/storage/resource.ts`)
2. Import and add to `defineBackend()` in [amplify/backend.ts](amplify/backend.ts)
3. Deploy using Amplify CLI: `npx ampx sandbox` (dev) or `npx ampx deploy` (prod)

### Styling
- Component-specific styles in `.css` files alongside components
- Global styles in [src/index.css](src/index.css)
- Consider adding a CSS-in-JS library or Tailwind CSS if more complex styling is needed

### Environment Variables
- Vite uses `VITE_` prefix for environment variables
- Create `.env` file for local development (not committed)
- Access via `import.meta.env.VITE_VARIABLE_NAME`
