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
import { useThemeStore } from '../store/useThemeStore';

const Sidebar = ({ displayName, onShowProfile, onLogout }) => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  
  const toSettings = () => {
    navigate('/settings');
  };
  
  const toHome = () => {
    navigate('/home');
  };

  const toTest = ()=>
  {
    navigate('/Test');
  }

  const toggleTheme = () => {
    const currentIndex = ['light', 'dark'].indexOf(theme);
    const nextTheme = currentIndex === 0 ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col justify-between py-6 px-4">
      <div className="space-y-6">
        <div className="font-bold text-2xl mb-6 text-primary">Examprep</div>
        <nav className="space-y-4">
          <button
            onClick={toHome}
            className="flex items-center gap-3 text-base-content hover:text-primary transition-colors"
          >
            <Home className="w-5 h-5" /> Home
          </button>
          <button className="flex items-center gap-3 text-base-content/60 hover:text-primary transition-colors" onClick={toTest}>
            <ClipboardList className="w-5 h-5" /> Tests
          </button>
          <button
            onClick={onShowProfile}
            className="flex items-center gap-3 text-base-content/60 hover:text-primary transition-colors"
          >
            <User className="w-5 h-5" /> Profile
          </button>
          <button
            onClick={toSettings}
            className="flex items-center gap-3 text-base-content/60 hover:text-primary transition-colors"
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button
            onClick={()=>navigate("/themes")}
            className="flex items-center gap-3 text-base-content/60 hover:text-primary transition-colors"
          >
            <Lightbulb className="w-5 h-5" /> Toggle Theme
          </button>
        </nav>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-2 rounded-md  transition-colors">
          <div className="w-8 h-8 bg-primary text-primary-content flex items-center justify-center rounded-full font-bold">
            {displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-base-content">{displayName || 'User'}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 text-error hover:text-error/80 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
