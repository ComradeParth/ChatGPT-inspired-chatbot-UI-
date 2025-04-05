import React from 'react';
import {
  FaMicrophone,
  FaPlus,
  FaSearch,
  FaBrain,
  FaPaperPlane,
  FaSave,
} from 'react-icons/fa';

function InputBox({
  userInput,
  setUserInput,
  handleSendMessage,
  handleFileChange,
  handleVoiceInput,
  messages,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        handleSendMessage(userInput);
        setUserInput('');
      }
    }
  };

  const handleSearch = () => {
    const query = userInput.trim() || 'AI Chatbot';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleReasoning = () => {
    handleSendMessage('Think deeply before answering.');
  };

  const handleSaveChat = () => {
    const content = messages
      .map(
        (msg) =>
          `${msg.isUserMessage ? 'User' : 'AI'} [${msg.timestamp}]: ${msg.text}`
      )
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_history.txt';
    link.click();
  };

  return (
    <div className="fixed bottom-9 left-1/2 transform -translate-x-1/2 flex flex-col bg-[#2a2a2a] pt-2 p-4 rounded-3xl shadow-none w-[90%] max-w-2xl">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full text-white bg-[#2a2a2a] rounded-xl focus:outline-none resize-none pt-2 pb-0 max-h-24 overflow-y-auto"
        placeholder="Ask anything... (Shift + Enter to send) and (Enter for new line)"
        rows="2"
      />

      <div className="flex items-center mt-3 w-full pt-0">
        <div className="flex space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            <FaPlus className="text-gray-400" size={18} />
          </label>

          <button
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-700 transition"
            onClick={handleSearch}
          >
            <FaSearch className="text-gray-400" size={18} />
            <span className="text-white text-sm">Search</span>
          </button>

          <button
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-700 transition"
            onClick={handleReasoning}
          >
            <FaBrain className="text-gray-400" size={18} />
            <span className="text-white text-sm">Reason</span>
          </button>

          {/* Save Chat Button */}
          <button
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-700 transition"
            onClick={handleSaveChat}
          >
            <FaSave className="text-gray-400" size={18} />
            <span className="text-white text-sm">Save Chat Externally</span>
          </button>

          <button
            onClick={handleVoiceInput}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <FaMicrophone className="text-white" size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            if (userInput.trim()) {
              handleSendMessage(userInput);
              setUserInput('');
            }
          }}
          className="p-2 ml-auto rounded-full hover:bg-blue-600 bg-blue-500 transition"
        >
          <FaPaperPlane className="text-white" size={18} />
        </button>
      </div>
    </div>
  );
}

export default InputBox;
