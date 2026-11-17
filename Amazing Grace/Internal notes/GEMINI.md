# Project: The Star Matrix / Amazing Grace

## Overview
This project contains **The Star Matrix** (formerly Story Engine Synthesis), an interactive narrative platform powered by React, Firebase, and Google's Generative AI (Gemini and Imagen).

## Tech Stack
- **Frontend:** React, Framer Motion, Lucide React.
- **Backend:** Firebase (Firestore, Authentication).
- **AI:** Google Generative AI (Gemini 2.5, Imagen 4.0).

## Project Structure
- `StoryEngineSynthesis.jsx`: Main application logic and UI.
- `gemini.ps1`, `npm.ps1`, etc.: Local shims for CLI tools.

## Development Workflow
- Use `gemini` for interactive coding assistance.
- AI features require a valid Google AI API key (currently hardcoded or expected in scope).

## CI/CD Workflow
The project uses GitHub Actions for automated deployment (`.github/workflows/deploy.yml`):
- **Trigger:** Push to `main`.
- **Firebase Injection:** Automatically injects `FIREBASE_CONFIG` into `*.html` files.
- **GitHub Pages:** Deploys the root directory to GitHub Pages.
- **Firestore:** Deploys Firestore rules and indexes.

## Guidelines
- Follow the established mystical and tech-noir aesthetic for UI changes.
- Ensure Firebase security rules align with the anonymous/custom token auth used in `StoryEngineSynthesis.jsx`.
- Use `secrets.FIREBASE_CONFIG` and `secrets.FIREBASE_TOKEN` in GitHub for deployment.
