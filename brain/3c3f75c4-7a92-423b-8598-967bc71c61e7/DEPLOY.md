# Deploying to Vercel

## Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   Run this command in the `dynamic-landing` folder:
   ```bash
   vercel
   ```
   - Follow the prompts (Keep defaults usually works fine).
   - Set the build command to `npm run build`.
   - Set the output directory to `dist`.

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

## Option 2: Git Integration

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Vercel will automatically detect `Vite`.
5. Click **Deploy**.

## Build Settings Ref

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Option 3: GitHub Actions (CI/CD)

I have generated a standard [GitHub Action](file:///c:/Users/Janus/DYNAMIC/dynamic-landing/.github/workflows/deploy.yml) for automated deployments.

1. Get your Vercel Project ID and Org ID:
   - Run `vercel link` locally to generate a `.vercel` folder.
   - Look in `.vercel/project.json` for `orgId` and `projectId`.

2. Add Secrets to your GitHub Repository:
   Go to **Settings > Secrets and variables > Actions** and add:
   - `VERCEL_TOKEN`: Your Vercel account token (create in Vercel Settings > Tokens).
   - `VERCEL_ORG_ID`: From step 1.
   - `VERCEL_PROJECT_ID`: From step 1.

The site will now auto-deploy whenever you push to `main`.
