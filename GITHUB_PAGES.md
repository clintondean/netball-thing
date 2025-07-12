# GitHub Pages Deployment Guide

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment

The deployment happens automatically when you:
1. Push to the `main` or `master` branch
2. Manually trigger the workflow from the Actions tab

## 📋 Setup Requirements

### 1. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Save the settings

### 2. Repository Structure
The workflow expects your repository to have:
- `main` or `master` as the default branch
- Standard Node.js project structure
- The build script `build:static` in package.json

## 🔧 How It Works

1. **Build Process**: The GitHub Action runs `npm run build:static` which:
   - Generates static HTML files from your EJS templates
   - Copies all static assets (CSS, JS, images)
   - Creates a demo version suitable for GitHub Pages
   - Outputs everything to the `dist/` directory

2. **Deployment**: The built files are deployed to the `gh-pages` branch automatically

## 🌐 Accessing Your Site

After successful deployment, your site will be available at:
```
https://[your-username].github.io/netball-thing/
```

## 📁 Static Build Features

The static build includes:
- ✅ Responsive HTML pages
- ✅ All CSS and JavaScript assets
- ✅ Demo data for showcasing functionality
- ✅ Proper routing for GitHub Pages
- ✅ 404 error handling

## 🔄 Manual Deployment

To deploy manually:
1. Go to the "Actions" tab in your repository
2. Click on "Deploy to GitHub Pages"
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## 🛠 Local Testing

Test the static build locally:
```bash
npm run build:static
cd dist
python -m http.server 8000  # or use any local server
```

Then visit `http://localhost:8000`

## 📝 Notes

- The GitHub Pages version is a **static demo** of your application
- Form submissions show alerts instead of saving data
- For a fully functional version, users should clone and run the full Node.js application
- The workflow requires Node.js 18+ (specified in the action)

## 🔍 Troubleshooting

### Deployment Fails
1. Check the Actions tab for error messages
2. Ensure all dependencies are listed in package.json
3. Verify the build script runs locally without errors

### Pages Not Loading
1. Check that GitHub Pages is enabled in repository settings
2. Verify the base URL is correct for your repository name
3. Ensure the 404.html file exists for proper routing

### Assets Not Loading
1. Check that all file paths are relative
2. Verify the base tag is correctly set in HTML files
3. Ensure static assets are copied to the dist directory
