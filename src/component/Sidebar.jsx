import React from "react";
import {
  Home,
  BookOpen,
  User,
  ClipboardList,
  LogOut,
  Lightbulb,
  Bell,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ displayName, onShowProfile, onLogout, isLightMode, setIsLightMode }) => {
    const navigate = useNavigate();
  const toSettings = () => {
    navigate('/settings');
  };
  const toHome=()=>{
    navigate('/HomePage');
  };
  return (
    <aside className={`w-64 ${isLightMode ? 'bg-gray-100 text-black' : 'bg-gray-950 text-white'} border-r border-gray-800 flex flex-col justify-between py-6 px-4`}>
      <div className="space-y-6">
        <div className="font-bold text-2xl mb-6">Examprep</div>
        <nav className="space-y-4">
          <button 
          onClick={toHome}
          className="flex items-center gap-3 hover:text-blue-500">
            <Home className="w-5 h-5" /> Home
          </button>
          <button className="flex items-center gap-3 text-gray-500 hover:text-blue-500">
            <ClipboardList className="w-5 h-5" /> Tests
          </button>
          <button 
          onClick={onShowProfile}
          className="flex items-center gap-3 text-gray-500 hover:text-blue-500">
            <User className="w-5 h-5" /> Profile
          </button>
          <button
          onClick={toSettings}
          className="flex items-center gap-3 text-gray-500 hover:text-blue-500">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="flex items-center gap-3 text-gray-500 hover:text-blue-500"
          >
            <Lightbulb className="w-5 h-5" /> {isLightMode ? "Dark Mode" : "Light Mode"}
          </button>
        </nav>
      </div>

      {/* Profile avatar & logout */}
      <div className="space-y-4">
        <div
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-colors ${
  isLightMode ? "hover:bg-gray-200 text-black" : "hover:bg-gray-800 text-white"
}`}
        >
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
            {displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <span>{displayName || 'User'}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-500"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
