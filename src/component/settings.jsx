import React, { useState, useEffect } from 'react';

const Settings = () => {
  // State for quiz preferences
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLimit, setTimeLimit] = useState('none'); // e.g., 'none', '30s', '60s'

  // States for user profile settings
  const [displayName, setDisplayName] = useState('');
  const [stream, setStream] = useState('none'); // Default to 'none' or a relevant default stream

  // Available streams
  const availableStreams = [
    { value: 'none', label: 'Select Stream' },
    { value: 'jee', label: 'JEE' },
    { value: 'neet', label: 'NEET' },
    { value: 'boards', label: 'Boards' },
    { value: 'olympiad', label: 'Olympiad' },
    // Add more streams as needed
  ];

  // Load saved settings from local storage on component mount
  useEffect(() => {
    const savedNumQuestions = localStorage.getItem('numQuestions');
    const savedDifficulty = localStorage.getItem('difficulty');
    const savedTimeLimit = localStorage.getItem('timeLimit');
    const savedDisplayName = localStorage.getItem('displayName');
    const savedStream = localStorage.getItem('stream');

    if (savedNumQuestions) {
      setNumQuestions(parseInt(savedNumQuestions, 10));
    }
    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }
    if (savedTimeLimit) {
      setTimeLimit(savedTimeLimit);
    }
    if (savedDisplayName) {
      setDisplayName(savedDisplayName);
    }
    if (savedStream) {
      setStream(savedStream);
    }
  }, []);

  // Handlers for state changes
  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleTimeLimitChange = (e) => {
    setTimeLimit(e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleStreamChange = (e) => {
    setStream(e.target.value);
  };

  // Function to save all settings to localStorage
  const handleUpdateSettings = () => {
    localStorage.setItem('numQuestions', numQuestions);
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('timeLimit', timeLimit);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('stream', stream);
    alert('Settings updated successfully!'); // Provide feedback to the user
    // In a real application, you might navigate back or refresh some data
  };

  // Function to navigate back (placeholder for actual navigation)
  const handleGoBack = () => {
    // This is a placeholder. In a real React application,
    // you would typically use React Router's `useNavigate` hook:
    // const navigate = useNavigate();
    // navigate(-1); // Go back one step in history
    alert('Going back!'); // For demonstration
    console.log('Navigating back...');
  };

  // Helper function for consistent input/select styling
  const getInputClassNames = () =>
    `w-full p-3 border rounded-md focus:outline-none focus:ring-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>

        {/* User Profile Section */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

          <div className="mb-6">
            <label htmlFor="displayName" className="block text-lg font-medium mb-2">
              Display Name:
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={handleDisplayNameChange}
              placeholder="Enter your display name"
              className={getInputClassNames()}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="stream" className="block text-lg font-medium mb-2">
              Academic Stream:
            </label>
            <select
              id="stream"
              value={stream}
              onChange={handleStreamChange}
              className={getInputClassNames()}
            >
              {availableStreams.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Quiz Preferences Section */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quiz Preferences</h2>

          <div className="mb-6">
            <label htmlFor="numQuestions" className="block text-lg font-medium mb-2">
              Number of Questions:
            </label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className={getInputClassNames()}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-lg font-medium mb-2">
              Difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className={getInputClassNames()}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="timeLimit" className="block text-lg font-medium mb-2">
              Time Limit per Question:
            </label>
            <select
              id="timeLimit"
              value={timeLimit}
              onChange={handleTimeLimitChange}
              className={getInputClassNames()}
            >
              <option value="none">None</option>
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
            </select>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleUpdateSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Update Settings
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;