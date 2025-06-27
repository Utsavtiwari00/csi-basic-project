import React, { useEffect, useState } from 'react';
import { X, Zap, Hash, LogOut, Settings } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useThemeStore } from '../store/useThemeStore';

const Profile = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [userName, setUserName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.displayName || user.email.split("@")[0]);

          const attempted = userData.totalAttempted || 0;
          const correct = userData.totalCorrect || 0;

          setQuestionCount(attempted);
          const calculatedAccuracy = attempted ? ((correct / attempted) * 100).toFixed(1) : 0;
          setAccuracy(calculatedAccuracy);
        } else {
          setUserName(user.email.split("@")[0]);
          setQuestionCount(0);
          setAccuracy(0);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!isVisible) return null;

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
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative card bg-base-100 text-base-content shadow-2xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-ghost"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-5xl font-bold text-primary-content border-4 border-primary-focus mb-4">
            {userName ? userName[0].toUpperCase() : 'G'}
          </div>
          <h2 className="text-2xl font-bold">{userName}</h2>
          <p className="text-sm text-base-content/70">
            {auth.currentUser ? auth.currentUser.email : 'guest@example.com'}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="text-warning w-5 h-5" />
              <span>Accuracy</span>
            </div>
            <span className="font-semibold">{accuracy}%</span>
          </div>

          <div className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Hash className="text-secondary w-5 h-5" />
              <span>Questions Attempted</span>
            </div>
            <span className="font-semibold">{questionCount}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={toSettings}
            className="btn btn-neutral w-full flex items-center space-x-2"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-error w-full flex items-center space-x-2"
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
