# PowerShell script to set environment variables for local development
# DO NOT commit this file with actual API keys!

Write-Host "Setting up environment variables for AI Questionnaire Builder..." -ForegroundColor Green

# Prompt for API key if not already set
if (-not $env:OPENAI_API_KEY) {
    $apiKey = Read-Host -Prompt "Enter your OpenAI API key" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiKey)
    $PlainTextKey = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
    $env:OPENAI_API_KEY = $PlainTextKey
    Write-Host "✓ OpenAI API key set for this session" -ForegroundColor Green
} else {
    Write-Host "✓ OpenAI API key already set" -ForegroundColor Yellow
}

# Set other environment variables
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:OPENAI_MODEL = "gpt-4-turbo-preview"
$env:FRONTEND_URL = "http://localhost:5173"
$env:RATE_LIMIT_WINDOW_MS = "900000"
$env:RATE_LIMIT_MAX_REQUESTS = "100"

Write-Host "✓ All environment variables set" -ForegroundColor Green
Write-Host ""
Write-Host "You can now start the backend server with: npm run dev" -ForegroundColor Cyan"
