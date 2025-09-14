import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HypothesisStep from './components/steps/HypothesisStep';
import ScopingStep from './components/steps/ScopingStep';
import ChatScopingStep from './components/steps/ChatScopingStep';
import QuestionnaireView from './components/QuestionnaireView';
import { QuestionnaireProvider } from './context/QuestionnaireContext';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hypothesis, setHypothesis] = useState('');
  const [scopingAnswers, setScopingAnswers] = useState({});
  const [questionnaire, setQuestionnaire] = useState(null);
  const [useChatInterface, setUseChatInterface] = useState(false);

  const handleHypothesisSubmit = (data) => {
    setHypothesis(data);
    setCurrentStep(2);
  };

  const handleScopingSubmit = (data) => {
    setScopingAnswers(data);
    setCurrentStep(3);
  };

  const handleQuestionnaireGenerated = (data) => {
    setQuestionnaire(data);
    setCurrentStep(4);
  };

  const resetProcess = () => {
    setCurrentStep(1);
    setHypothesis('');
    setScopingAnswers({});
    setQuestionnaire(null);
  };

  return (
    <QuestionnaireProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onReset={resetProcess} />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="hypothesis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HypothesisStep onSubmit={handleHypothesisSubmit} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="scoping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setUseChatInterface(false)}
                      className={`px-4 py-2 rounded-md transition-all ${
                        !useChatInterface ? 'bg-white shadow-sm font-medium' : 'text-gray-600'
                      }`}
                    >
                      Form Mode
                    </button>
                    <button
                      onClick={() => setUseChatInterface(true)}
                      className={`px-4 py-2 rounded-md transition-all ml-1 ${
                        useChatInterface ? 'bg-white shadow-sm font-medium' : 'text-gray-600'
                      }`}
                    >
                      Chat Mode 💬
                    </button>
                  </div>
                </div>
                
                {useChatInterface ? (
                  <ChatScopingStep
                    hypothesis={hypothesis}
                    onSubmit={handleScopingSubmit}
                    onBack={() => setCurrentStep(1)}
                  />
                ) : (
                  <ScopingStep 
                    hypothesis={hypothesis}
                    onSubmit={handleScopingSubmit}
                    onBack={() => setCurrentStep(1)}
                  />
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionnaireView
                  hypothesis={hypothesis}
                  scopingAnswers={scopingAnswers}
                  onGenerated={handleQuestionnaireGenerated}
                  onBack={() => setCurrentStep(2)}
                  onEdit={() => setCurrentStep(2)}
                />
              </motion.div>
            )}

            {currentStep === 4 && questionnaire && (
              <motion.div
                key="questionnaire"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionnaireView
                  questionnaire={questionnaire}
                  isEditing={true}
                  onReset={resetProcess}
                  onBack={() => {
                    setCurrentStep(2);
                    setQuestionnaire(null);
                  }}
                  onEdit={() => setCurrentStep(2)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-16 rounded-full transition-all ${
                    step <= currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </QuestionnaireProvider>
  );
}

export default App;