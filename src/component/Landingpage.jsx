import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/SignIn"); // Or use "/signup" if separate
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Welcome to <span className="text-blue-500">Examprep</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Your personalized quiz platform to track accuracy, improve performance, and prep like a pro.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
