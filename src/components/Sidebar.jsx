import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  conversations,
  deleteConversation,
  renameConversation,
  loadConversation,
}) => {
  const [isRenaming, setIsRenaming] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (index) => {
    if (newTitle.trim()) {
      renameConversation(index, newTitle);
      setIsRenaming(null);
      setNewTitle('');
    }
  };

  return (
    <div className="flex flex-col p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">Saved Conversations</h2>
      {conversations.length === 0 ? (
        <p>No saved conversations.</p>
      ) : (
        <ul>
          {conversations.map((conversation, index) => (
            <li key={conversation.id} className="flex items-center justify-between mb-2">
              {isRenaming === index ? (
                <div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="p-1 text-black"
                    placeholder="Enter new title"
                  />
                  <button onClick={() => handleRename(index)} className="ml-2 text-green-500">Save</button>
                </div>
              ) : (
                <div>
                  <span onClick={() => loadConversation(index)} className="cursor-pointer">
                    {conversation.title}
                  </span>
                  <div>
                    <button
                      onClick={() => setIsRenaming(index)}
                      className="ml-2 text-yellow-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteConversation(index)}
                      className="ml-2 text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
