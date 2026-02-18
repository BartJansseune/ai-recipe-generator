# AI Recipe Generator

An AI-powered recipe generator that creates personalized recipes from ingredients you provide. Built with React, TypeScript, Vite, and AWS Amplify with Claude AI (via AWS Bedrock).

## Features

- **AI-Powered Recipe Generation** - Uses Claude 3 Sonnet via AWS Bedrock to generate creative recipes
- **User Authentication** - Secure sign-up and sign-in with AWS Cognito
- **Real-time UI Updates** - Loading states and placeholder animations during recipe generation
- **Responsive Design** - Clean, modern interface that works across devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Backend**: AWS Amplify Gen 2 (Authentication, GraphQL API)
- **AI**: AWS Bedrock with Claude 3 Sonnet
- **Infrastructure**: AWS CDK 2

## Prerequisites

- Node.js 18+ and npm
- AWS Account with access to:
  - AWS Amplify
  - Amazon Cognito
  - AWS Bedrock (Claude 3 Sonnet model enabled in eu-west-1)
- AWS CLI configured with appropriate credentials

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start AWS Amplify Sandbox

In one terminal, start the Amplify sandbox environment:

```bash
npx ampx sandbox
```

This will:
- Deploy your authentication and API resources to AWS
- Generate `amplify_outputs.json` configuration file
- Watch for changes to backend resources
- Keep running until you stop it (Ctrl+C)

**Note**: The first deployment may take a few minutes. Wait for the "Deployed" message before proceeding.

### 3. Start Development Server

In another terminal, start the Vite development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

### 4. Create an Account

1. Visit http://localhost:5173
2. Click "Create Account" on the authentication form
3. Enter your email and create a password
4. Verify your email with the code sent to your inbox
5. Sign in and start generating recipes!

## Usage

1. Sign in to your account
2. Enter ingredients in the input field (e.g., "chicken, tomatoes, basil")
3. Click "Generate"
4. Wait for Claude AI to create a custom recipe for you
5. View your generated recipe on the page

## Project Structure

```
ai-recipe-generator/
├── amplify/                    # AWS Amplify backend configuration
│   ├── auth/                  # Authentication resources
│   ├── data/                  # GraphQL API and data resources
│   │   ├── resource.ts       # API schema definition
│   │   └── bedrock.js        # Bedrock AI integration handler
│   └── backend.ts            # Backend resource definitions
├── src/                       # Frontend source code
│   ├── App.tsx               # Main recipe generator UI
│   ├── main.tsx              # App entry with Authenticator
│   ├── App.css               # Component styles
│   └── index.css             # Global styles
├── amplify_outputs.json       # Generated Amplify configuration (git-ignored)
└── package.json              # Dependencies and scripts
```

## Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## AWS Bedrock Configuration

This project uses AWS Bedrock with Claude 3 Sonnet in the `eu-west-1` region. To use a different region or model:

1. Update [amplify/backend.ts](amplify/backend.ts):
   - Change the Bedrock endpoint URL (line 13)
   - Update the signing region (line 16)
   - Modify the model ARN (line 25)

2. Update [amplify/data/bedrock.js](amplify/data/bedrock.js):
   - Change the model path in the `resourcePath` (line 9)

## Deployment

### Deploy to AWS

To deploy to a production environment:

```bash
npx ampx deploy
```

This creates a permanent deployment separate from your sandbox environment.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service (AWS Amplify Hosting, S3, Netlify, Vercel, etc.).

## Troubleshooting

### App doesn't load in browser
- Check browser console (F12) for errors
- Ensure `npx ampx sandbox` has fully deployed (look for "Deployed" message)
- Verify `amplify_outputs.json` was generated in the project root

### Authentication errors
- Check that the Amplify sandbox is running
- Clear browser cache and try again
- Verify AWS credentials have permission to access Cognito

### Recipe generation fails
- Ensure AWS Bedrock access is enabled in your AWS account
- Verify Claude 3 Sonnet model is enabled in the eu-west-1 region
- Check CloudWatch logs for detailed error messages

### Type errors
- Run `npm run build` to check for TypeScript errors
- Ensure all imports use `import type` for TypeScript types from backend files

## Development Notes

### TypeScript Types
- Backend types (from `amplify/data/resource.ts`) must be imported with `import type`
- Frontend uses strict TypeScript mode for type safety
- Separate tsconfig files for app code and build tools

### ESLint Configuration

The project uses ESLint with TypeScript and React plugins. To enable stricter type-aware rules, update [eslint.config.js](eslint.config.js) with type-checked configurations. See the original Vite template documentation for examples.

## Learn More

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/react/)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)

## License

MIT
