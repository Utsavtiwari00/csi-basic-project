import React from 'react';
import { X, User, Zap, Hash, LogOut, Settings } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const Profile = ({ isVisible, onClose, accuracy, UserName, quesNo }) => {
  const navigate = useNavigate();

  if (!isVisible) {
    return null; 
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose(); 
      navigate("/SignIn"); 
    } catch (error) {
      console.error("Error logging out:", error);
     
    }
  };

    const toSettings = () => {
    navigate('/settings');
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose} 
    >
  
      <div
        className="relative bg-gray-800 rounded-xl p-8 shadow-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the card from closing the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close profile"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-5xl font-bold mb-4 border-4 border-blue-400">
            {UserName ? UserName[0].toUpperCase() : 'G'}
          </div>
          <h2 className="text-2xl font-bold text-white">{UserName}</h2>
          <p className="text-gray-400 text-sm">{auth.currentUser ? auth.currentUser.email : 'guest@example.com'}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-400 w-5 h-5" />
              <span className="text-gray-300">Accuracy</span>
            </div>
            <span className="font-semibold text-white">{accuracy}%</span>
          </div>

          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <Hash className="text-purple-400 w-5 h-5" />
              <span className="text-gray-300">Questions Attempted</span>
            </div>
            <span className="font-semibold text-white">{quesNo}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button onClick={toSettings} className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-400 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;