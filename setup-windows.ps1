# AI Questionnaire Builder - Windows Setup Script
# This script helps install Node.js and set up the application

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "AI Questionnaire Builder Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "⚠️  This script should be run as Administrator for best results" -ForegroundColor Yellow
    Write-Host ""
}

# Function to check if a command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Check for Node.js
Write-Host "Checking for Node.js installation..." -ForegroundColor Yellow
if (Test-CommandExists node) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://nodejs.org/en/download/" -ForegroundColor Cyan
    Write-Host "2. Choose 'Windows Installer (.msi)' - 64-bit" -ForegroundColor Cyan
    Write-Host "3. Run the installer and follow the setup wizard" -ForegroundColor Cyan
    Write-Host "4. After installation, restart PowerShell and run this script again" -ForegroundColor Cyan
    Write-Host ""
    
    # Offer to open the download page
    $openBrowser = Read-Host "Would you like to open the Node.js download page? (Y/N)"
    if ($openBrowser -eq 'Y' -or $openBrowser -eq 'y') {
        Start-Process "https://nodejs.org/en/download/"
    }
    
    Write-Host ""
    Write-Host "Setup incomplete. Please install Node.js and run this script again." -ForegroundColor Yellow
    exit 1
}

# Check for npm
Write-Host "Checking for npm..." -ForegroundColor Yellow
if (Test-CommandExists npm) {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm is not found (should come with Node.js)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Setting up the Application" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

# Install root dependencies
Write-Host ""
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install backend dependencies
Write-Host ""
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path ".\backend"
npm install
Set-Location -Path ".."

# Install frontend dependencies
Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path ".\frontend"
npm install
Set-Location -Path ".."

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up your OpenAI API key:" -ForegroundColor White
Write-Host "   - Copy backend\.env.example to backend\.env" -ForegroundColor Gray
Write-Host "   - Add your OpenAI API key to the .env file" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the application:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "The application will be available at:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""