import React, { useState } from 'react';
import { ChevronRight, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const HypothesisStep = ({ onSubmit }) => {
  const [hypothesis, setHypothesis] = useState('');
  const [error, setError] = useState('');

  const examples = [
    {
      icon: <Target className="h-5 w-5" />,
      text: "We want to understand how users perceive our new mobile app interface."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "I want to test pricing sensitivity for a new shampoo brand."
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      text: "We need to measure brand awareness across India."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hypothesis.length < 10) {
      setError('Please provide at least 10 characters to describe your research goal.');
      return;
    }
    if (hypothesis.length > 1000) {
      setError('Please keep your hypothesis under 1000 characters.');
      return;
    }
    onSubmit(hypothesis);
  };

  const useExample = (text) => {
    setHypothesis(text);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Hi 👋 Let's create your questionnaire
          </h2>
          <p className="text-lg text-gray-600">
            I'll help you create a smart, professional-quality survey in just a few steps.
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-xl font-semibold">What's your research goal?</h3>
            <p className="text-gray-600 mt-1">
              Start with your main hypothesis or problem statement. Just a sentence or two is perfect.
            </p>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hypothesis" className="label block mb-2">
                  Research Hypothesis / Problem Statement
                </label>
                <textarea
                  id="hypothesis"
                  value={hypothesis}
                  onChange={(e) => {
                    setHypothesis(e.target.value);
                    setError('');
                  }}
                  className="textarea min-h-[120px]"
                  placeholder="Describe what you're trying to learn or understand..."
                  maxLength={1000}
                />
                
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {hypothesis.length}/1000 characters
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">📝 Examples (click to use):</p>
                {examples.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => useExample(example.text)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-0.5">{example.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {example.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!hypothesis || hypothesis.length < 10}
                  className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
                >
                  Continue to Survey Details
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HypothesisStep;