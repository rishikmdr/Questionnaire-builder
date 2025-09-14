import React from 'react';
import { Edit2, GitBranch, CheckSquare, Circle, Grid3X3, Type, Hash, ChevronDown, List } from 'lucide-react';

const QuestionCard = ({ question, questionNumber, onEdit, isEditable }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'single':
        return <Circle className="h-4 w-4" />;
      case 'multi':
        return <CheckSquare className="h-4 w-4" />;
      case 'grid':
        return <Grid3X3 className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'scale':
        return <Hash className="h-4 w-4" />;
      case 'dropdown':
        return <ChevronDown className="h-4 w-4" />;
      case 'ranking':
        return <List className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      single: 'Single Response',
      multi: 'Multiple Response',
      grid: 'Grid/Matrix',
      text: 'Open Text',
      scale: 'Scale',
      dropdown: 'Dropdown',
      ranking: 'Ranking'
    };
    return labels[type] || type;
  };

  return (
    <div className="question-card group">
      {/* Logic Condition */}
      {question.logic && (
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
          <GitBranch className="h-3 w-3" />
          <span className="italic">{question.logic}</span>
        </div>
      )}

      {/* Question Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700">Q{questionNumber}.</span>
            <p className="text-gray-900 font-medium">{question.text}</p>
            {question.required && (
              <span className="text-red-500 text-sm">*</span>
            )}
          </div>
        </div>

        {isEditable && (
          <button
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
            title="Edit question"
          >
            <Edit2 className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Question Type */}
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        {getTypeIcon(question.type)}
        <span>{getTypeLabel(question.type)}</span>
      </div>

      {/* Options */}
      {question.options && question.options.length > 0 && (
        <div className="ml-4 space-y-2">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
              {question.type === 'single' ? (
                <Circle className="h-3 w-3 text-gray-400" />
              ) : question.type === 'multi' ? (
                <CheckSquare className="h-3 w-3 text-gray-400" />
              ) : (
                <span className="text-gray-400">{String.fromCharCode(65 + index)}.</span>
              )}
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}

      {/* Validation Rules */}
      {question.validation && (
        <div className="mt-3 text-xs text-gray-500">
          {question.validation.min !== undefined && (
            <span>Min: {question.validation.min} </span>
          )}
          {question.validation.max !== undefined && (
            <span>Max: {question.validation.max} </span>
          )}
          {question.validation.pattern && (
            <span>Pattern: {question.validation.pattern}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;