import React, { useState } from 'react';
import { FaPlus, FaShareAlt, FaAddressBook, FaBars, FaPencilAlt } from 'react-icons/fa';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import Sidebar from './components/Sidebar';
import ProfileInfo from './components/ProfileInfo';
import './index.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      isUserMessage: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: message }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);

      if (data.choices && data.choices.length > 0) {
        const aiResponse = {
          text: data.choices[0].message.content,
          isUserMessage: false,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error('Invalid response structure from API');
      }
    } catch (error) {
      setIsTyping(false);
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${error.message}`, isUserMessage: false },
      ]);
    }
  };

  // Save current conversation to the list of saved conversations
  const handleSaveConversation = () => {
    const timestamp = new Date().toLocaleString();
    const title = `Conversation - ${timestamp}`;
    setConversations((prev) => [
      ...prev,
      { title, messages, id: Date.now() },
    ]);
  };

  // Delete conversation by index
  const handleDeleteConversation = (index) => {
    const updated = conversations.filter((_, i) => i !== index);
    setConversations(updated);
  };

  // Rename conversation
  const handleRenameConversation = (index, newTitle) => {
    const updated = [...conversations];
    updated[index].title = newTitle;
    setConversations(updated);
  };

  // Load a saved conversation by index
  const handleLoadConversation = (index) => {
    setMessages(conversations[index].messages);
    setSidebarOpen(false); // Close sidebar when loading a conversation
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-[#181b1b] text-white">
      {/* Navbar */}
      <div className="flex items-center justify-between w-full p-4 bg-[#181b1b] shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-lg"
          >
            <FaBars />
          </button>
          <button
            onClick={() => setMessages([])}
            className="text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FaPlus />
          </button>
          <button
            onClick={handleSaveConversation}
            className="text-white text-xl rounded-lg hover:bg-gray-700 transition"
          >
            <FaAddressBook />
          </button>
          <h1 className="text-xl font-semibold">ChatGPT Clone</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white text-lg">
            <FaPencilAlt />
          </button>
          <button className="text-white text-lg">
            <FaShareAlt />
          </button>
          <ProfileInfo />
        </div>
      </div>

      <div className="relative flex w-full h-full overflow-hidden">
        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}
        >
          {sidebarOpen && (
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              conversations={conversations}
              deleteConversation={handleDeleteConversation}
              renameConversation={handleRenameConversation}
              loadConversation={handleLoadConversation}
            />
          )}
        </div>

        {/* Chat Window */}
        <div className="flex flex-col flex-1 overflow-hidden p-4 ml-auto mr-auto w-[90%] max-w-3xl">
          <ChatWindow messages={messages} isTyping={isTyping} />
        </div>
      </div>

      {/* Input Box */}
      <InputBox
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleFileChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            console.log('File uploaded:', file.name);
          }
        }}
        handleVoiceInput={() => {
          console.log('Voice input triggered');
        }}
        messages={messages}
      />
    </div>
  );
};

export default App;
