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

Create a `.env` file in the `backend` folder:
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
FRONTEND_URL=http://localhost:5173
```

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