import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const AddQuestionButton = ({ onAdd, position }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-8 flex items-center justify-center my-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0.3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-px bg-gray-300" />
      
      <button
        onClick={() => onAdd(position)}
        className="relative z-10 bg-white border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 rounded-full p-2 transition-all duration-200 shadow-sm hover:shadow-md"
        title="Add question here"
      >
        <Plus className="h-4 w-4 text-gray-600 hover:text-primary-600" />
      </button>
      
      {isHovered && (
        <span className="absolute left-14 text-sm text-gray-600 whitespace-nowrap">
          Add question here
        </span>
      )}
    </motion.div>
  );
};

export default AddQuestionButton;