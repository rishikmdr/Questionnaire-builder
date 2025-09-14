# 🚀 Deployment Guide - Share Your AI Questionnaire Builder

## Quick Options to Share the Tool

### Option 1: Local Network Sharing (Immediate)
Share with people on your same network (office/home WiFi):

1. **Get your IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Start the app with network access:**
   ```powershell
   # In frontend folder, modify vite.config.js to add:
   server: {
     host: '0.0.0.0',  # Add this line
     port: 5173
   }
   ```

3. **Share this link:**
   ```
   http://YOUR_IP_ADDRESS:5173
   Example: http://192.168.1.100:5173
   ```

### Option 2: Deploy to Free Hosting (Recommended)

#### A. Deploy to Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel (Free):**
1. Create account at https://vercel.com
2. Push code to GitHub
3. Connect GitHub repo to Vercel
4. Deploy with one click

**Backend on Railway (Free tier):**
1. Create account at https://railway.app
2. Deploy backend folder
3. Get public URL
4. Update frontend API URLs

#### B. Deploy Everything to Render.com (Free)

1. **Sign up** at https://render.com
2. **Create Web Service** for backend
3. **Create Static Site** for frontend
4. **Environment variables** in dashboard
5. **Share link:** `https://your-app.onrender.com`

### Option 3: One-Click Deploy Solutions

#### Deploy to Netlify + Heroku

**Step 1: Prepare the code**
```bash
# Create production build
cd frontend
npm run build

# Create backend Procfile
echo "web: node backend/src/server.js" > Procfile
```

**Step 2: Deploy Frontend to Netlify**
1. Go to https://app.netlify.com
2. Drag & drop `frontend/dist` folder
3. Get instant URL: `https://amazing-app-123.netlify.app`

**Step 3: Deploy Backend to Heroku**
```bash
# Install Heroku CLI
# Create new app
heroku create your-app-name

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
```

### Option 4: Quick Cloud Deploy Script

Create this deployment script:

```powershell
# deploy.ps1
Write-Host "Deploying AI Questionnaire Builder..." -ForegroundColor Cyan

# Build frontend
cd frontend
npm run build
cd ..

# Create deployment package
Compress-Archive -Path . -DestinationPath deploy.zip

Write-Host "Ready to deploy! Upload deploy.zip to your cloud provider" -ForegroundColor Green
```

## 🌐 Easiest Solution: Use ngrok (5 minutes)

**Perfect for quick sharing without deployment:**

1. **Download ngrok:**
   ```powershell
   # Download from https://ngrok.com/download
   # Or use chocolatey
   choco install ngrok
   ```

2. **Start your app locally:**
   ```powershell
   npm run dev
   ```

3. **Create public tunnel:**
   ```powershell
   ngrok http 5173
   ```

4. **Share the ngrok URL:**
   ```
   https://abc123.ngrok.io
   ```
   Anyone can access your app through this URL!

## 📦 Docker Deployment (Professional)

Create these files for easy deployment:

**Dockerfile.frontend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
```

**Dockerfile.backend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
  
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "5000:5000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

**Deploy with:**
```bash
docker-compose up -d
```

## 🔐 Environment Variables for Deployment

Create `.env.production`:
```env
# Backend
NODE_ENV=production
PORT=5000
OPENAI_API_KEY=sk-...
FRONTEND_URL=https://your-frontend-url.com

# Frontend
VITE_API_URL=https://your-backend-url.com/api
```

## 🎯 Quickest Solution Right Now

### Using Surge.sh (2 minutes):

1. **Build frontend:**
   ```powershell
   cd frontend
   npm run build
   ```

2. **Install and deploy:**
   ```powershell
   npm install -g surge
   surge ./dist
   ```

3. **Choose URL:**
   ```
   your-app.surge.sh
   ```

4. **Share the link!**

## 📱 Share via QR Code

Generate QR code for easy mobile access:

```powershell
# Install qr code generator
npm install -g qrcode

# Generate QR code
qrcode "http://your-deployment-url.com" -o qr.png
```

## 🚀 Recommended: Full Cloud Setup

### Best Free Option:
1. **Frontend:** Vercel (automatic deploys from GitHub)
2. **Backend:** Railway.app or Render.com
3. **Database:** MongoDB Atlas (if needed)

### Setup Time: 30 minutes
### Cost: $0 (free tiers)

### Steps:
1. Push code to GitHub
2. Connect Vercel to GitHub (frontend)
3. Deploy backend to Railway
4. Update environment variables
5. Share the Vercel URL!

## 📋 Pre-Deployment Checklist

- [ ] Remove sensitive data from code
- [ ] Set production API keys
- [ ] Update CORS settings
- [ ] Test on different devices
- [ ] Add loading states
- [ ] Handle errors gracefully
- [ ] Add analytics (optional)

## 🔗 Final URL Structure

Your deployed app will be accessible at:
- **Option A:** `https://ai-questionnaire.vercel.app`
- **Option B:** `https://ai-questionnaire.netlify.app`
- **Option C:** `https://ai-questionnaire.onrender.com`
- **Option D:** `https://your-custom-domain.com`

## Need Help?

The easiest way to share RIGHT NOW:
1. Use **ngrok** for temporary sharing (5 minutes)
2. Use **Vercel** for permanent free hosting (30 minutes)

Your tool is ready to share with the world! 🎉