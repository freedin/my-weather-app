Create a GitHub Actions workflow file at .github/workflows/deploy.yml that:
- Triggers on push to the main branch
- Uses Node.js 22
- Installs dependencies with npm ci
- Builds the Vite project with npm run build
- Deploys the dist/ folder to GitHub Pages using the official
  actions/deploy-pages action
- Make sure vite.config.ts sets the base path to the repository name so
  assets load correctly on GitHub Pages
- Add the VITE_WEATHER_API_KEY as a repository secret reference in the
  build step using the env: field