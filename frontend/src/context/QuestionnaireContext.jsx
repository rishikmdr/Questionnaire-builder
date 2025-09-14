import React, { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext();

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

export const QuestionnaireProvider = ({ children }) => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(null);

  const addQuestionnaire = (questionnaire) => {
    setQuestionnaires(prev => [...prev, questionnaire]);
    setActiveQuestionnaire(questionnaire);
  };

  const updateQuestionnaire = (id, updates) => {
    setQuestionnaires(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updates } : q))
    );
    if (activeQuestionnaire?.id === id) {
      setActiveQuestionnaire(prev => ({ ...prev, ...updates }));
    }
  };

  const deleteQuestionnaire = (id) => {
    setQuestionnaires(prev => prev.filter(q => q.id !== id));
    if (activeQuestionnaire?.id === id) {
      setActiveQuestionnaire(null);
    }
  };

  const value = {
    questionnaires,
    activeQuestionnaire,
    setActiveQuestionnaire,
    addQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};