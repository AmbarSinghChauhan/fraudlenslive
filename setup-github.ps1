# PowerShell script to push FraudLens Live to your GitHub repository
Param(
  [string]$RepoUrl
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  FraudLens Live - GitHub Repository Connector" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $RepoUrl) {
  $RepoUrl = Read-Host "Enter your GitHub repository URL (e.g. https://github.com/your-username/fraudlens-live.git)"
}

if (-not $RepoUrl) {
  Write-Host "Error: Repository URL is required." -ForegroundColor Red
  Exit 1
}

Write-Host "`n[1/4] Checking Git installation..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git command not found in PATH. Please install Git for Windows (https://gitforwindows.org/) and retry." -ForegroundColor Red
  Exit 1
}

Write-Host "[2/4] Initializing local git repository..." -ForegroundColor Yellow
git init -b main
git add .

Write-Host "[3/4] Creating initial release commit..." -ForegroundColor Yellow
git commit -m "feat: FraudLens Live - Digital Risk Intelligence & Social Impersonation Defense"

Write-Host "[4/4] Linking remote and pushing to main branch..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $RepoUrl
git push -u origin main

Write-Host "`nSuccessfully pushed FraudLens Live to $RepoUrl!" -ForegroundColor Green
Write-Host "Your hackathon submission repository is live and ready." -ForegroundColor Green
