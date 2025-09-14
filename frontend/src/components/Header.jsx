import React from 'react';
import { FileText, RefreshCw } from 'lucide-react';

const Header = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Questionnaire Builder</h1>
              <p className="text-sm text-gray-600">Create professional surveys with AI assistance</p>
            </div>
          </div>
          
          {onReset && (
            <button
              onClick={onReset}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;