import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Building, Tag, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ScopingStep = ({ hypothesis, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    surveyLength: 10, // Default 10 minutes
    targetRespondents: '',
    industry: '',
    brands: '',
    avoidTopics: '',
    specialInstructions: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
            Survey Details
          </h2>
          <p className="text-gray-600">
            Let me gather a few details to shape your questionnaire better.
          </p>
        </div>

        {/* Show hypothesis summary */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-primary-900 mb-1">Your Research Goal:</p>
          <p className="text-sm text-primary-800">{hypothesis}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Survey Length */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="surveyLength" className="label flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-500" />
                Survey Length: <span className="font-bold text-primary-600">{formData.surveyLength} minutes</span>
              </label>
              
              <div className="space-y-3">
                <input
                  id="surveyLength"
                  type="range"
                  min="3"
                  max="30"
                  value={formData.surveyLength}
                  onChange={(e) => handleChange('surveyLength', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3 min</span>
                  <span>15 min</span>
                  <span>30 min</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Estimated questions: </span>
                    {formData.surveyLength <= 5 ? '10-15' : 
                     formData.surveyLength <= 10 ? '20-30' : 
                     formData.surveyLength <= 15 ? '30-45' : 
                     formData.surveyLength <= 20 ? '45-60' : '60+'} questions
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.surveyLength <= 7 ? 'Quick pulse check survey' :
                     formData.surveyLength <= 12 ? 'Standard market research survey' :
                     formData.surveyLength <= 20 ? 'Comprehensive study' :
                     'Deep-dive research study'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Target Respondents */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="target" className="label flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-gray-500" />
                Target Respondents
              </label>
              <input
                id="target"
                type="text"
                value={formData.targetRespondents}
                onChange={(e) => handleChange('targetRespondents', e.target.value)}
                className="input"
                placeholder="e.g., 25-45 years old, working professionals, Indian metros"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe your ideal survey participants (optional)
              </p>
            </div>
          </div>

          {/* Industry */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="industry" className="label flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-gray-500" />
                Industry
              </label>
              <input
                id="industry"
                type="text"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="input"
                placeholder="e.g., Technology, Healthcare, FMCG, Finance"
                maxLength={100}
              />
            </div>
          </div>

          {/* Brands/Competitors */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="brands" className="label flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-gray-500" />
                Specific Brands or Competitors to Mention
              </label>
              <input
                id="brands"
                type="text"
                value={formData.brands}
                onChange={(e) => handleChange('brands', e.target.value)}
                className="input"
                placeholder="e.g., Dove, PayTM, Zomato"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple brands with commas (optional)
              </p>
            </div>
          </div>

          {/* Topics to Avoid */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="avoid" className="label flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                Sensitive Topics or Biases to Avoid
              </label>
              <textarea
                id="avoid"
                value={formData.avoidTopics}
                onChange={(e) => handleChange('avoidTopics', e.target.value)}
                className="textarea"
                placeholder="Any topics that should be handled carefully or avoided..."
                maxLength={500}
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div className="card">
            <div className="card-content pt-6">
              <label htmlFor="instructions" className="label mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                id="instructions"
                value={formData.specialInstructions}
                onChange={(e) => handleChange('specialInstructions', e.target.value)}
                className="textarea"
                placeholder="Any specific requirements or preferences for your questionnaire..."
                maxLength={1000}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-outline btn-lg flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg flex-1 flex items-center justify-center gap-2"
            >
              Generate Questionnaire
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ScopingStep;