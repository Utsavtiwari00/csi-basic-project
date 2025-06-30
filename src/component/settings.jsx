import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Settings = () => {
 
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLimit, setTimeLimit] = useState('none')
  const [displayName, setDisplayName] = useState('');
  const [stream, setStream] = useState('none');
  const [message, setMessage] = useState("");

  const availableStreams = [
    { value: 'none', label: 'Select Stream' },
    { value: 'jee', label: 'JEE' },
    { value: 'neet', label: 'NEET' },
    { value: 'boards', label: 'Boards' },
    { value: 'olympiad', label: 'Olympiad' },
  ];

  useEffect(() => {
    const savedNumQuestions = localStorage.getItem('numQuestions');
    const savedDifficulty = localStorage.getItem('difficulty');
    const savedTimeLimit = localStorage.getItem('timeLimit');
    const savedDisplayName = localStorage.getItem('displayName');
    const savedStream = localStorage.getItem('stream');

    if (savedNumQuestions) setNumQuestions(parseInt(savedNumQuestions, 10));
    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedTimeLimit) setTimeLimit(savedTimeLimit);
    if (savedDisplayName) setDisplayName(savedDisplayName);
    if (savedStream) setStream(savedStream);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDisplayNameChange = async (e) => {
    const newName = e.target.value;
    setDisplayName(newName);

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), { displayName: newName }, { merge: true });
        setMessage("Display name updated ✅");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Failed to update name ❌");
      }
    }
  };

  const handleUpdateSettings = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("User not logged in.");
      return;
    }

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        displayName,
        stream,
        quizPreferences: {
          numQuestions,
          difficulty,
          timeLimit,
        },
      }, { merge: true });

      localStorage.setItem("numQuestions", numQuestions);
      localStorage.setItem("difficulty", difficulty);
      localStorage.setItem("timeLimit", timeLimit);
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("stream", stream);

      setDisplayName("");
      setStream("none");
      setNumQuestions(10);
      setDifficulty("medium");
      setTimeLimit("none");

      setMessage("Settings updated successfully ✅");

      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 1000);
    } catch (error) {
      alert("Failed to update settings. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>

        {/* User Profile Section */}
        <section className="bg-base-200 shadow-lg rounded-lg p-6 mb-8">
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
              className="input input-bordered w-full"
            />
            {message && <p className="mt-2 text-sm text-success">{message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="stream" className="block text-lg font-medium mb-2">
              Academic Stream:
            </label>
            <select
              id="stream"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="select select-bordered w-full"
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
        <section className="bg-base-200 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quiz Preferences</h2>

          <div className="mb-6">
            <label htmlFor="numQuestions" className="block text-lg font-medium mb-2">
              Number of Questions:
            </label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="select select-bordered w-full"
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
              onChange={(e) => setDifficulty(e.target.value)}
              className="select select-bordered w-full"
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
              onChange={(e) => setTimeLimit(e.target.value)}
              className="select select-bordered w-full"
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
            className="btn btn-primary"
          >
            Save & Go Back
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-neutral"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
