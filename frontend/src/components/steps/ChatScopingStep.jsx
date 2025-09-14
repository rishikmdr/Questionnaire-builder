import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft, ChevronRight, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatScopingStep = ({ hypothesis, onSubmit, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [scopingData, setScopingData] = useState({
    surveyLength: null,
    targetRespondents: '',
    industry: '',
    brands: '',
    avoidTopics: '',
    specialInstructions: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = [
    {
      id: 'surveyLength',
      text: "How long would you like your survey to be? Please specify in minutes (e.g., '15 minutes' or just '15').",
      field: 'surveyLength',
      type: 'number',
      followUp: (value) => `Great! A ${value}-minute survey will have approximately ${Math.floor(value * 2)}-${Math.floor(value * 2.5)} questions.`
    },
    {
      id: 'targetRespondents',
      text: "Who are your target respondents? Please describe their demographics, location, and any specific characteristics.",
      field: 'targetRespondents',
      type: 'text',
      followUp: (value) => value && value.trim() ? "Perfect! I'll tailor the questions for this audience." : "No problem, I'll create questions suitable for a general audience."
    },
    {
      id: 'industry',
      text: "What industry or sector is this research for?",
      field: 'industry',
      type: 'text',
      followUp: (value) => value ? `Got it! I'll include industry-specific terminology for ${value}.` : "Understood, I'll keep it industry-agnostic."
    },
    {
      id: 'brands',
      text: "Are there specific brands or competitors you'd like to include in the questionnaire?",
      field: 'brands',
      type: 'text',
      followUp: (value) => value ? "I'll include these brands in relevant comparison questions." : "No specific brands noted."
    },
    {
      id: 'avoidTopics',
      text: "Are there any sensitive topics or areas we should avoid?",
      field: 'avoidTopics',
      type: 'text',
      followUp: (value) => value ? "I'll make sure to avoid these topics." : "No restrictions noted."
    },
    {
      id: 'specialInstructions',
      text: "Any special requirements or additional instructions for your questionnaire?",
      field: 'specialInstructions',
      type: 'text',
      followUp: (value) => value ? "I'll incorporate these requirements." : "No additional requirements."
    }
  ];

  useEffect(() => {
    // Initial bot message
    setTimeout(() => {
      addBotMessage(`Hi! I see you want to research: "${hypothesis}". Let me help you configure the perfect questionnaire. Let's start with a few questions.`);
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
    }, 500);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  const askNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(questions[currentQuestion].text);
      }, 1000);
    } else {
      // All questions answered
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage("Perfect! I have all the information I need. Let me generate your professional questionnaire now.");
        setTimeout(() => {
          onSubmit(scopingData);
        }, 2000);
      }, 1000);
    }
  };

  const handleSend = () => {
    if (!currentInput.trim()) return;

    const userInput = currentInput.trim();
    addUserMessage(userInput);
    setCurrentInput('');

    const currentQ = questions[currentQuestion];
    
    // Process the answer
    let processedValue = userInput;
    if (currentQ.type === 'number') {
      // Extract number from input like "15 minutes" or "15"
      const match = userInput.match(/\d+/);
      processedValue = match ? parseInt(match[0]) : 10;
    }

    // Update scoping data
    setScopingData(prev => ({
      ...prev,
      [currentQ.field]: processedValue
    }));

    // Send follow-up message
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(currentQ.followUp(processedValue));
      
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
      setTimeout(() => {
        askNextQuestion();
      }, 1500);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSkip = () => {
    addUserMessage("Skip this question");
    
    const currentQ = questions[currentQuestion];
    setScopingData(prev => ({
      ...prev,
      [currentQ.field]: currentQ.type === 'number' ? 10 : ''
    }));

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage("No problem, moving on to the next question.");
      setCurrentQuestion(prev => prev + 1);
      setTimeout(() => {
        askNextQuestion();
      }, 1000);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Let's Configure Your Survey
          </h2>
          <p className="text-gray-600">
            I'll ask you a few questions to create the perfect questionnaire for your research.
          </p>
        </div>

        <div className="card">
          {/* Chat Messages Area */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' ? 'bg-primary-100' : 'bg-gray-100'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="h-4 w-4 text-primary-600" /> : 
                        <Bot className="h-4 w-4 text-gray-600" />
                      }
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion < questions.length ? "Type your answer..." : ""}
                className="input flex-1"
                disabled={currentQuestion >= questions.length || isTyping}
              />
              
              {currentQuestion < questions.length && (
                <>
                  <button
                    onClick={handleSkip}
                    className="btn btn-outline btn-md"
                    disabled={isTyping}
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSend}
                    className="btn btn-primary btn-md flex items-center gap-2"
                    disabled={!currentInput.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </>
              )}
            </div>
            
            {currentQuestion < questions.length && (
              <div className="mt-2 text-xs text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="btn btn-outline btn-lg flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatScopingStep;