# AI Questionnaire Builder 🧠📝

An intelligent web application that helps create professional market research questionnaires using AI assistance. Generate unbiased, logic-ready surveys in minutes with smart question generation, editing capabilities, and export features.

## ✨ Features

- **AI-Powered Generation**: Create comprehensive questionnaires based on your research hypothesis
- **Smart Scoping**: Tailor surveys based on target audience, industry, and specific requirements
- **Interactive Editing**: Edit individual questions with AI assistance
- **Logic & Skip Patterns**: Automatic inclusion of conditional logic and skip patterns
- **Validation**: Built-in bias detection and questionnaire validation
- **Export Options**: Download questionnaires as Word documents or JSON
- **Professional Templates**: Industry-standard question types and formats

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-questionnaire-builder.git
cd ai-questionnaire-builder
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:

**⚠️ Important: Never commit API keys to version control!**

#### Option A: Using Environment Variables (Recommended)

**Windows PowerShell:**
```powershell
# Run the provided script to set environment variables
.\set-env.ps1
# Or set manually:
$env:OPENAI_API_KEY = "your-api-key-here"
```

**Mac/Linux:**
```bash
export OPENAI_API_KEY="your-api-key-here"
```

#### Option B: Using .env file (Local Development Only)

1. Copy the example file:
```bash
cp backend/.env.example backend/.env
```

2. Edit `backend/.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_api_key_here
```

**Note:** The `.env` file is gitignored and will not be committed.

4. Start the development servers:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
ai-questionnaire-builder/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic & AI integration
│   │   ├── middleware/     # Express middleware
│   │   ├── validators/     # Input validation schemas
│   │   └── prompts/        # AI system prompts
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI questionnaire generation
- **Joi** - Input validation
- **docx** - Word document generation

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📋 How It Works

1. **Hypothesis Input**: Start by entering your research goal or problem statement
2. **Survey Scoping**: Provide details about survey length, target audience, and preferences
3. **AI Generation**: The system generates a complete questionnaire with appropriate question types
4. **Review & Edit**: Review the generated questionnaire and edit individual questions as needed
5. **Validation**: Run validation to check for biases and logical issues
6. **Export**: Download the final questionnaire as a Word document

## 🔧 API Endpoints

### Questionnaire Management
- `POST /api/questionnaire/generate` - Generate new questionnaire
- `PUT /api/questionnaire/question/:id` - Edit specific question
- `POST /api/questionnaire/validate` - Validate questionnaire
- `GET /api/questionnaire/:id` - Get questionnaire by ID

### Export
- `POST /api/export/word/:id` - Export as Word document
- `GET /api/export/json/:id` - Export as JSON

### Health
- `GET /api/health` - Health check endpoint

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `OPENAI_MODEL` | OpenAI model to use | gpt-4-turbo-preview |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 🚀 Deployment

### Deploying to Production

When deploying to production, **never hardcode API keys in your code or commit them to GitHub**.

#### Backend (Render/Heroku/Railway)

1. Set environment variables in your hosting platform's dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your frontend URL (e.g., https://your-app.vercel.app)

2. Deploy your backend code (API keys will be read from environment variables)

#### Frontend (Vercel/Netlify)

1. Set environment variables:
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-api.onrender.com)

2. Deploy your frontend code

### Security Best Practices

1. **Never commit `.env` files** with real API keys
2. **Use environment variables** in production
3. **Rotate API keys regularly**
4. **Use different API keys** for development and production
5. **Monitor API usage** to detect any unauthorized access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- The React and Node.js communities for excellent tools and libraries

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ for market researchers and survey professionals