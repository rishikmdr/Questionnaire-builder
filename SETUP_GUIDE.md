# 🚀 Setup Guide for AI Questionnaire Builder

## Prerequisites

Since Node.js is not installed on your system, you'll need to install it first. Node.js is required to run both the backend server and frontend application.

## Step 1: Install Node.js

### Option A: Download from Official Website (Recommended)

1. **Download Node.js:**
   - Visit: https://nodejs.org/en/download/
   - Click on **"Windows Installer (.msi)"** - Choose 64-bit
   - Download the LTS version (recommended for most users)

2. **Install Node.js:**
   - Run the downloaded `.msi` file
   - Follow the installation wizard:
     - Accept the license agreement
     - Keep default installation path
     - ✅ Make sure "Add to PATH" is checked
     - Click "Next" through all screens
     - Click "Install"
     - Click "Finish" when complete

3. **Verify Installation:**
   - Close and reopen PowerShell
   - Run these commands:
   ```powershell
   node --version
   npm --version
   ```
   - You should see version numbers for both

### Option B: Install using Chocolatey (if you have it)

```powershell
choco install nodejs
```

### Option C: Install using Winget

```powershell
winget install OpenJS.NodeJS
```

## Step 2: Set Up the Application

After installing Node.js, follow these steps:

### 1. Run the Setup Script

I've created a PowerShell script to automate the setup:

```powershell
# Navigate to the project directory
cd "C:\Users\kamda\projects\AI QB"

# Run the setup script
.\setup-windows.ps1
```

If you get an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Manual Setup (if the script doesn't work)

```powershell
# Navigate to project directory
cd "C:\Users\kamda\projects\AI QB"

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 3: Configure OpenAI API Key

1. **Get an OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (you won't be able to see it again!)

2. **Set up the environment file:**
   ```powershell
   # Copy the example environment file
   cd backend
   Copy-Item .env.example .env
   
   # Open the .env file in notepad
   notepad .env
   ```

3. **Add your API key:**
   - Replace `your_openai_api_key_here` with your actual API key
   - Save and close the file

## Step 4: Start the Application

```powershell
# From the root directory (C:\Users\kamda\projects\AI QB)
npm run dev
```

This will start both servers:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Step 5: Use the Application

1. Open your browser and go to http://localhost:5173
2. Follow the step-by-step process:
   - Enter your research hypothesis
   - Fill in survey details
   - Review the AI-generated questionnaire
   - Edit questions as needed
   - Export to Word document

## Troubleshooting

### Issue: "npm is not recognized"
- **Solution**: Node.js is not installed or not in PATH. Reinstall Node.js and make sure "Add to PATH" is checked.

### Issue: "Cannot find module" errors
- **Solution**: Dependencies not installed properly. Run:
  ```powershell
  npm run install:all
  ```

### Issue: "EADDRINUSE" error
- **Solution**: Ports 5000 or 5173 are already in use. Either:
  - Stop other applications using these ports
  - Or modify the ports in:
    - `backend/src/server.js` (change PORT)
    - `frontend/vite.config.js` (change port)

### Issue: "OpenAI API error"
- **Solution**: Check your API key in `backend/.env`:
  - Make sure it's valid
  - Ensure you have credits in your OpenAI account
  - Check the API key doesn't have extra spaces

### Issue: PowerShell execution policy
- **Solution**: Run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
  ```

## Quick Commands Reference

```powershell
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Build for production
npm run build
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Run setup script
3. ✅ Add OpenAI API key
4. ✅ Start the application
5. 🎉 Create your first questionnaire!

## Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Make sure all prerequisites are installed
3. Ensure your OpenAI API key is valid and has credits
4. Check the console for error messages

---

Happy questionnaire building! 🚀