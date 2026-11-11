# ---------------------------------------------------------------
# setup.ps1
# Run this ONCE from the wyxan-project folder in VS Code terminal:
#   cd D:\wyxan-project
#   .\setup.ps1
#
# What it does:
#   1. npm install in both backend and frontend
#   2. seeds the database
#   3. initialises git with incremental commits
#   4. creates a GitHub repo and pushes (needs GitHub CLI - gh)
# ---------------------------------------------------------------

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host ""
Write-Host "=== Small Web - Setup ===" -ForegroundColor Cyan
Write-Host ""

# --- 1. install dependencies ---

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "$root\backend"
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "npm install failed in backend" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "$root\frontend"
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "npm install failed in frontend" -ForegroundColor Red; exit 1 }

Set-Location $root

# --- 2. seed ---

Write-Host ""
Write-Host "Seeding the database..." -ForegroundColor Yellow
Set-Location "$root\backend"
npm run seed
if ($LASTEXITCODE -ne 0) { Write-Host "Seed failed. Is MongoDB running?" -ForegroundColor Red; exit 1 }

Set-Location $root

# --- 3. git ---

Write-Host ""
Write-Host "Setting up git..." -ForegroundColor Yellow

if (Test-Path "$root\.git") {
    Write-Host "Git already initialised, skipping init." -ForegroundColor Gray
} else {
    git init
    git config user.email "munir.purki@gmail.com"
    git config user.name "Muneer Hussain"

    # commit 1 - project config and structure
    git add .gitignore
    git add backend/.gitignore frontend/.gitignore
    git add backend/package.json backend/tsconfig.json backend/nest-cli.json backend/.env.example
    git add frontend/package.json frontend/tsconfig.json frontend/next.config.mjs
    git add .vscode/tasks.json
    git commit -m "set up project structure and config files"

    # commit 2 - backend schemas and modules
    git add backend/src/main.ts
    git add backend/src/app.module.ts
    git add backend/src/sites/site.schema.ts backend/src/sites/sites.module.ts
    git add backend/src/visits/visit.schema.ts backend/src/visits/visits.module.ts
    git add backend/src/people/person.schema.ts backend/src/people/people.module.ts
    git commit -m "add mongoose schemas and feature modules"

    # commit 3 - backend services and controllers
    git add backend/src/sites/sites.service.ts backend/src/sites/sites.controller.ts
    git add backend/src/visits/visits.service.ts backend/src/visits/visits.controller.ts
    git add backend/src/people/people.service.ts backend/src/people/people.controller.ts
    git commit -m "add services and REST controllers for sites, visits, people"

    # commit 4 - seed data
    git add backend/src/seed/seed-data.ts backend/src/seed/seed.ts
    git commit -m "add seed script with 10 sites, 5 people, and browsing history"

    # commit 5 - frontend foundation
    git add frontend/src/app/layout.tsx
    git add frontend/src/app/globals.css
    git add frontend/src/lib/api.ts
    git commit -m "add Next.js app shell and API client"

    # commit 6 - navigation hook and home page
    git add frontend/src/hooks/useNavigation.ts
    git add frontend/src/app/page.tsx
    git commit -m "add navigation hook and person-picker home page"

    # commit 7 - browser components
    git add frontend/src/components/AddressBar.tsx
    git add frontend/src/components/PageView.tsx
    git add frontend/src/components/HistoryPanel.tsx
    git add frontend/src/components/SearchPanel.tsx
    git add frontend/src/components/PublishForm.tsx
    git commit -m "add browser UI components"

    # commit 8 - browser page (main UI)
    git add frontend/src/app/browser/page.tsx
    git commit -m "add browser page wiring all components together"

    # commit 9 - readme
    git add README.md
    git commit -m "add README with setup and design notes"

    # commit 10 - runner scripts
    git add run.ps1 setup.ps1
    git commit -m "add runner scripts"
}

# --- 4. GitHub ---

Write-Host ""
Write-Host "Creating GitHub repository..." -ForegroundColor Yellow

$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghInstalled) {
    Write-Host ""
    Write-Host "GitHub CLI (gh) is not installed." -ForegroundColor Red
    Write-Host "Either install it from https://cli.github.com and re-run this script," -ForegroundColor Yellow
    Write-Host "or manually add your remote and push:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/small-web.git"
    Write-Host "  git branch -M main"
    Write-Host "  git push -u origin main"
    Write-Host ""
    exit 0
}

# check if already logged in
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to GitHub. Running gh auth login..." -ForegroundColor Yellow
    gh auth login
}

# create the repo (public, so the assessment can be reviewed)
gh repo create small-web --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Done! Repository pushed to GitHub." -ForegroundColor Green
    $repoUrl = gh repo view --json url -q ".url"
    Write-Host "URL: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Push failed. The repo might already exist." -ForegroundColor Red
    Write-Host "Try pushing manually: git push -u origin main" -ForegroundColor Yellow
}
