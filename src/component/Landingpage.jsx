import React from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/SignIn");
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      
      <header className="w-full flex justify-end p-4">
        <button
          onClick={() => navigate("/themes")}
          className="flex items-center gap-2 text-base-content hover:text-primary transition-colors"
        >
          <Lightbulb className="w-5 h-5" /> 
          Toggle Theme
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-base-content">
            Welcome to <span className="text-primary">Examprep</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-base-content/70">
            Your personalized quiz platform to track accuracy, improve performance, and prep like a pro.
          </p>
          <button
            onClick={handleGetStarted}
            className="btn btn-primary text-lg"
          >
            Get Started
          </button>
        </div>
      </main>

    </div>
  );
};

export default LandingPage;
