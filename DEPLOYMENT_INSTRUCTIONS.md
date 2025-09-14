# 🚀 Deployment Instructions

## Current Issue
Your frontend on Vercel cannot connect to backend on Render because:
1. The frontend doesn't know the backend URL
2. CORS might be blocking requests
3. Environment variables are not set correctly

## ✅ Complete Fix Guide

### Step 1: Update Your Backend on Render

1. **Go to your Render Dashboard**
   - https://dashboard.render.com

2. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `5000` (or leave empty, Render sets it)
   - `OPENAI_API_KEY` = `your-actual-api-key`
   - `FRONTEND_URL` = `https://your-app.vercel.app` (your Vercel URL)
   - `RATE_LIMIT_WINDOW_MS` = `900000`
   - `RATE_LIMIT_MAX_REQUESTS` = `100`

3. **Copy your Render backend URL**
   - It looks like: `https://your-backend-name.onrender.com`

### Step 2: Update Your Frontend on Vercel

1. **Go to your Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Go to Project Settings → Environment Variables**

3. **Add this environment variable:**
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-name.onrender.com/api`
   - Environment: Production, Preview, Development

4. **Redeploy your frontend**
   - Go to Deployments tab
   - Click "..." menu on latest deployment
   - Click "Redeploy"

### Step 3: Update Your Code (If Needed)

#### Frontend (src/services/api.js):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

#### Backend (src/server.js) - CORS:
```javascript
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      process.env.FRONTEND_URL,
      // Your Vercel URL
      'https://your-app.vercel.app',
      // Allow all Vercel deployments
      /https:\/\/.*\.vercel\.app$/,
    ].filter(Boolean);
    
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
```

### Step 4: Test Your Deployment

1. **Check Backend Health:**
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Check Frontend Console:**
   - Open browser console on your Vercel site
   - Look for "API Base URL:" log
   - Should show your Render backend URL

3. **Test Questionnaire Generation:**
   - Try generating a questionnaire
   - Check browser console for errors
   - Check Render logs for backend errors

## 🔍 Debugging Checklist

### Frontend (Vercel):
- [ ] `VITE_API_URL` environment variable is set
- [ ] Points to correct Render backend URL with `/api`
- [ ] Redeployed after setting environment variable
- [ ] No console errors about CORS

### Backend (Render):
- [ ] `OPENAI_API_KEY` is set correctly
- [ ] `FRONTEND_URL` matches your Vercel URL
- [ ] Server is running (check logs)
- [ ] `/api/health` endpoint works

## 🛠️ Common Issues & Solutions

### Issue: "Failed to generate questionnaire"
**Solution:**
1. Check if `OPENAI_API_KEY` is set on Render
2. Check Render logs for specific error
3. Verify API key is valid and has credits

### Issue: "CORS error"
**Solution:**
1. Update `FRONTEND_URL` on Render to match Vercel URL
2. Redeploy backend after updating CORS code
3. Check that backend allows your Vercel domain

### Issue: "Cannot connect to server"
**Solution:**
1. Verify `VITE_API_URL` on Vercel includes `/api`
2. Check if backend is running on Render
3. Test backend directly: `https://your-backend.onrender.com/api/health`

## 📝 Quick Fix Commands

### Test Backend Locally:
```powershell
curl https://your-backend.onrender.com/api/health
```

### Test CORS:
```javascript
// Run in browser console on Vercel site
fetch('https://your-backend.onrender.com/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend connected:', data))
  .catch(err => console.error('Backend error:', err));
```

## 🎯 Final Configuration

### Vercel Environment:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Render Environment:
```
NODE_ENV=production
OPENAI_API_KEY=sk-...your-key...
FRONTEND_URL=https://your-app.vercel.app
```

## ✅ Success Indicators

1. Backend health check returns positive
2. No CORS errors in browser console
3. Questionnaires generate successfully
4. Export functions work

## Need More Help?

1. Check Render logs: Dashboard → Your Service → Logs
2. Check Vercel logs: Dashboard → Your Project → Functions → Logs
3. Browser console: F12 → Console tab

Your app should now work perfectly with Vercel frontend + Render backend!