import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center space-x-2 p-2">
      <span
        className="w-6 h-6 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0s', minWidth: '1rem', minHeight: '1rem' }}
      ></span>
    </div>
  );
};

export default TypingIndicator;

