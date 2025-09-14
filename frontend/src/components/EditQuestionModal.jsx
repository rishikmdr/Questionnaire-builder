import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { editQuestion } from '../services/api';
import toast from 'react-hot-toast';

const EditQuestionModal = ({ question, questionnaireId, onSave, onClose }) => {
  const [editInstruction, setEditInstruction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editInstruction.trim()) {
      toast.error('Please provide an edit instruction');
      return;
    }

    setLoading(true);
    try {
      const updatedQuestion = await editQuestion(question, editInstruction, questionnaireId);
      onSave(updatedQuestion);
      toast.success('Question updated successfully!');
    } catch (error) {
      toast.error('Failed to update question. Please try again.');
      console.error('Edit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Make it about pain points instead of features",
    "Add a 0-10 scale instead of agree/disagree",
    "Remove Option C",
    "Make the question more specific",
    "Add 'Not Applicable' option",
    "Change to multiple choice format"
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black bg-opacity-50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Question
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {/* Current Question */}
            <div className="mb-6">
              <label className="label block mb-2">Current Question</label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{question.text}</p>
                <div className="text-sm text-gray-600">
                  <span>Type: {question.type}</span>
                  {question.logic && (
                    <span className="ml-4">Logic: {question.logic}</span>
                  )}
                </div>
                {question.options && question.options.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {question.options.map((option, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Edit Instruction */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="instruction" className="label block mb-2">
                  What would you like to change?
                </label>
                <textarea
                  id="instruction"
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                  className="textarea min-h-[100px]"
                  placeholder="Describe how you want to modify this question..."
                  maxLength={500}
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {editInstruction.length}/500 characters
                  </span>
                </div>
              </div>

              {/* Example Instructions */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  💡 Example instructions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setEditInstruction(example)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      disabled={loading}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline btn-md flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-md flex-1 flex items-center justify-center gap-2"
                  disabled={loading || !editInstruction.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditQuestionModal;