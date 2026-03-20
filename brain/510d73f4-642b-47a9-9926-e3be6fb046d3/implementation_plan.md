# Netlify Deployment Plan

This plan outlines the steps to prepare and deploy the project to Netlify.

## Proposed Changes

### Configuration

#### [MODIFY] [netlify.toml](file:///c:/Users/Janus/extro/janus-systems/netlify.toml)
Update the configuration to include build settings.
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Verification Plan

### Automated Tests
1.  Run `npm run build` locally to ensure the project builds correctly without errors.
    ```bash
    cd janus-systems
    npm run build
    ```

### Manual Verification
1.  Check the `dist` folder for build artifacts (`index.html`, `assets/`).
2.  Deploy to Netlify. Since the CLI is not installed, I will provide the user with the following options:
    - **Option A (Manual Upload):** Drag and drop the `dist` folder to the Netlify web UI.
    - **Option B (CLI):** Install Netlify CLI (`npm install -g netlify-cli`) and run `netlify deploy`.
    - **Option C (GitHub/GitLab):** Connect the repository to Netlify for automatic deployments.
