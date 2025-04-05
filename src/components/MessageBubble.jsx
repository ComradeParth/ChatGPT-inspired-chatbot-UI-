import React from 'react';
import TypingIndicator from './TypingIndicator';

const MessageBubble = ({ text, isUserMessage, timestamp, isTyping }) => {
  return (
    <div
      className={`p-4 rounded-lg max-w-xs break-words overflow-hidden 
      ${
        isUserMessage
          ? 'bg-[#303636] text-white self-end'
          : 'bg-[#252828] text-white self-start'
      }`}
    >
      {/* Show Typing Indicator if AI is typing */}
      {isTyping ? <TypingIndicator /> : <p className="break-words">{text}</p>}

      {/* Show timestamp only if it's not typing */}
      {!isTyping && (
        <div
          className={`text-xs text-gray-400 mt-1 ${
            isUserMessage ? 'text-right' : 'text-left'
          }`}
        >
          {timestamp}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
