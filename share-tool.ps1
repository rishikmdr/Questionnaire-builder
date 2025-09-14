# AI Questionnaire Builder - Quick Sharing Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Questionnaire Builder - Share Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if servers are running
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if (-not $nodeProcesses) {
    Write-Host "Starting the application..." -ForegroundColor Yellow
    Start-Job -ScriptBlock { 
        cd "C:\Users\kamda\projects\AI QB"
        npm run dev 
    } -Name "AIQuestionnaire"
    Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

Write-Host "✅ Application is running locally" -ForegroundColor Green
Write-Host ""

# Refresh environment variables for ngrok
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Start ngrok tunnel
Write-Host "Creating public tunnel with ngrok..." -ForegroundColor Yellow
Write-Host ""

# Create ngrok configuration
$ngrokConfig = @"
Your app is being shared! Look for the URL below:
========================================

The public URL will appear in the ngrok window.
Look for: Forwarding https://xxxxx.ngrok.io -> http://localhost:5173

Share that URL with anyone to access your tool!

Press Ctrl+C in the ngrok window to stop sharing.
"@

Write-Host $ngrokConfig -ForegroundColor Green
Write-Host ""

# Start ngrok (this will open in the same window)
Write-Host "Starting ngrok tunnel..." -ForegroundColor Cyan
ngrok http 5173

Write-Host ""
Write-Host "Tunnel closed. The application is still running locally." -ForegroundColor Yellow