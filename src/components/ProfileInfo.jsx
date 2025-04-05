import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";

const ProfileInfo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 text-white p-2 rounded-lg hover:bg-gray-700 transition"
      >
        <FaUserCircle size={24} />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#333] shadow-lg rounded-lg py-2 z-50">
          <button className="flex items-center px-4 py-2 text-white hover:bg-gray-600 w-full">
            <FaCog className="mr-2" /> Settings
          </button>
          <button className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-600 w-full">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
