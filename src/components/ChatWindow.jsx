import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, sidebarOpen, isTyping }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={chatRef}
      className={`chat-window space-y-5 overflow-y-auto max-h-[63vh] bg-[#181b1b] rounded-lg pr-4 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}
      style={{
        direction: 'ltr',
        textAlign: 'left',
        transition: 'margin-left 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
        >
          <MessageBubble 
            text={message.text} 
            isUserMessage={message.isUserMessage} 
            timestamp={message.timestamp} 
          />
        </div>
      ))}

      {/* Typing indicator for AI responses */}
      {isTyping && (
        <div className="flex justify-start">
          <MessageBubble text="Typing..." isUserMessage={false} isTyping />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
