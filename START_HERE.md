# 🚀 AI Questionnaire Builder - Quick Start Guide

## ✅ Installation Complete!

Your application is set up and ready to run. Follow these steps:

## 📝 Step 1: Configure OpenAI API Key (IMPORTANT!)

Before you can generate questionnaires, you need to add your OpenAI API key:

### Option A: Edit with Notepad
```powershell
notepad backend\.env
```

### Option B: Edit with any text editor
Open the file `backend\.env` and change this line:
```
OPENAI_API_KEY=your_openai_api_key_here
```
to:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```
(Replace with your actual OpenAI API key)

### 🔑 Don't have an OpenAI API key?
1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key immediately (you won't see it again!)
5. Add it to the `.env` file

## 🎯 Step 2: Start the Application

Open a NEW PowerShell window and run:

```powershell
cd "C:\Users\kamda\projects\AI QB"
npm run dev
```

You should see:
- Backend server starting on port 5000
- Frontend server starting on port 5173

## 🌐 Step 3: Open the Application

Once both servers are running, open your browser and go to:

### http://localhost:5173

## 🎨 How to Use the Application

1. **Enter Your Research Goal**
   - Type your hypothesis or research question
   - Example: "We want to understand customer satisfaction with our mobile app"

2. **Configure Survey Details**
   - Choose survey length (short/medium/long)
   - Specify target audience
   - Add any specific requirements

3. **Generate Questionnaire**
   - Click "Generate Questionnaire"
   - Wait for AI to create your survey

4. **Edit Questions** (if needed)
   - Click the edit icon on any question
   - Describe what you want to change
   - AI will update the question for you

5. **Export Your Survey**
   - Click "Export to Word" to download
   - Or copy the JSON format for other platforms

## ⚠️ Troubleshooting

### "OpenAI API key not configured" Error
- Make sure you've added your API key to `backend\.env`
- Restart the servers after adding the key
- Check that the key starts with `sk-`

### Port Already in Use
Stop all Node processes and try again:
```powershell
Get-Process node | Stop-Process -Force
npm run dev
```

### Cannot Connect to Server
Make sure both servers are running. You should see:
- `[0]` messages for backend
- `[1]` messages for frontend with "VITE v5.x.x ready"

## 📊 Testing the Application

### Without API Key (Limited Functionality)
The application will still run, but you won't be able to:
- Generate questionnaires
- Edit questions with AI
- Validate questionnaires

You CAN still:
- Navigate through the UI
- See the interface design
- Understand the workflow

### With API Key (Full Functionality)
All features will work including:
- AI-powered questionnaire generation
- Smart question editing
- Bias detection and validation
- Word document export

## 💡 Tips

1. **Keep the terminal open** - Closing it will stop the servers
2. **Use Ctrl+C** to stop the servers when done
3. **Check the console** for any error messages
4. **API costs** - Each questionnaire generation uses OpenAI API credits

## 🎉 You're All Set!

Your AI Questionnaire Builder is ready to use. Just:
1. Add your OpenAI API key
2. Run `npm run dev`
3. Open http://localhost:5173

Happy questionnaire building! 🚀

---

Need help? Check the main README.md for detailed documentation.