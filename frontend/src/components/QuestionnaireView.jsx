import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Edit2, Loader2, FileDown, ChevronLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import QuestionCard from './QuestionCard';
import EditQuestionModal from './EditQuestionModal';
import LoadingSpinner from './LoadingSpinner';
import { generateQuestionnaire, validateQuestionnaire, exportToWord } from '../services/api';

const QuestionnaireView = ({ 
  hypothesis, 
  scopingAnswers, 
  questionnaire: initialQuestionnaire,
  onGenerated,
  onBack,
  onReset,
  isEditing = false 
}) => {
  const [questionnaire, setQuestionnaire] = useState(initialQuestionnaire);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!questionnaire && hypothesis && scopingAnswers) {
      generateInitialQuestionnaire();
    }
  }, []);

  const generateInitialQuestionnaire = async () => {
    setLoading(true);
    try {
      const result = await generateQuestionnaire(hypothesis, scopingAnswers);
      setQuestionnaire(result);
      if (onGenerated) {
        onGenerated(result);
      }
      toast.success('Questionnaire generated successfully!');
    } catch (error) {
      toast.error('Failed to generate questionnaire. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const result = await validateQuestionnaire(questionnaire);
      setValidation(result);
      
      if (result.isValid) {
        toast.success('Questionnaire validation passed!');
      } else {
        toast.warning(`Found ${result.issues.length} issues to review`);
      }
    } catch (error) {
      toast.error('Failed to validate questionnaire');
      console.error(error);
    } finally {
      setValidating(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // First, make sure the questionnaire is saved in the backend
      if (!questionnaire.id) {
        toast.error('Questionnaire ID not found. Please regenerate.');
        return;
      }
      
      const response = await fetch(`/api/export/word/${questionnaire.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `questionnaire_${questionnaire.id}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Questionnaire exported successfully!');
    } catch (error) {
      toast.error('Failed to export questionnaire. Please try again.');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const handleQuestionEdit = (question, sectionId) => {
    setEditingQuestion({ question, sectionId });
  };

  const handleQuestionUpdate = (updatedQuestion) => {
    setQuestionnaire(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === editingQuestion.sectionId
          ? {
              ...section,
              questions: section.questions.map(q =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              )
            }
          : section
      )
    }));
    setEditingQuestion(null);
    toast.success('Question updated successfully!');
  };

  if (loading) {
    return <LoadingSpinner message="Generating your questionnaire..." />;
  }

  if (!questionnaire) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="btn btn-outline btn-sm flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Details
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Your Questionnaire' : 'Generating Questionnaire'}
            </h2>
          </div>
          
          <div className="flex gap-3">
            {isEditing && (
              <>
                <button
                  onClick={handleValidate}
                  disabled={validating}
                  className="btn btn-outline btn-sm flex items-center gap-2"
                >
                  {validating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  Validate
                </button>
                
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="btn btn-primary btn-sm flex items-center gap-2"
                >
                  {exporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4" />
                  )}
                  Export to Word
                </button>
              </>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex gap-4 text-sm text-gray-600">
          <span>📊 {questionnaire.metadata.totalQuestions} questions</span>
          <span>⏱️ {questionnaire.metadata.estimatedTime}</span>
          <span>📝 {questionnaire.sections.length} sections</span>
        </div>
      </div>

      {/* Validation Results */}
      {validation && !validation.isValid && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900 mb-2">
                Validation Issues Found
              </p>
              <ul className="space-y-1 text-sm text-yellow-800">
                {validation.issues.map((issue, index) => (
                  <li key={index}>
                    • {issue.issue} - {issue.suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Questionnaire Sections */}
      <div className="space-y-8">
        <AnimatePresence>
          {questionnaire.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="card"
            >
              <div className="card-header">
                <h3 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-gray-600 mt-1">{section.description}</p>
                )}
              </div>

              <div className="card-content space-y-4">
                {section.questions.map((question, questionIndex) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionNumber={
                      questionnaire.sections
                        .slice(0, sectionIndex)
                        .reduce((acc, s) => acc + s.questions.length, 0) +
                      questionIndex +
                      1
                    }
                    onEdit={() => handleQuestionEdit(question, section.id)}
                    isEditable={isEditing}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion.question}
          questionnaireId={questionnaire.id}
          onSave={handleQuestionUpdate}
          onClose={() => setEditingQuestion(null)}
        />
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={onReset}
            className="btn btn-outline btn-lg"
          >
            Create New Questionnaire
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireView;