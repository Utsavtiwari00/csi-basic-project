import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import he from 'he';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { useThemeStore } from "../store/useThemeStore";

const Test = () => {
  const { stream } = useParams();
  const navigate = useNavigate();

  const { theme } = useThemeStore();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  const getPerQuestionTimeLimit = useCallback(() => {
    const normalizedStream = stream.toLowerCase();

    // Updated to match the unhyphenated names from TestPage.jsx
    if (normalizedStream === "jeemain") {
      return 3 * 60; 
    } else if (normalizedStream === "jeeadvanced") {
      return 6 * 60; 
    } else if (normalizedStream === "neet") {
      return 2 * 60; 
    }
    return 60; 
  }, [stream]);

  const handleQuestionTimeEnd = useCallback(() => {
    if (quizStarted && !showResult) {
      alert(`Time's up for Question ${currentQuestionIndex + 1}! Moving to the next question.`);
      goToNext();
    }
  }, [quizStarted, showResult, currentQuestionIndex]);

  useEffect(() => {
    if (!stream) return;
    fetch(`/data/${stream.toLowerCase()}.json`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to load quiz")
      )
      .then((data) => {
        setAllQuestions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to load quiz for ${stream}. Please ensure the JSON file is correctly formatted as an array of questions.`);
        setAllQuestions([]);
      });
  }, [stream]);

  const startQuiz = () => {
    let requiredNumQuestions = 0;
    const normalizedStream = stream.toLowerCase();

    // Updated to match the unhyphenated names from TestPage.jsx
    if (normalizedStream === "jeemain") {
      requiredNumQuestions = 75;
    } else if (normalizedStream === "jeeadvanced") {
      requiredNumQuestions = 60;
    } else if (normalizedStream === "neet") {
      requiredNumQuestions = 60;
    } else {
      requiredNumQuestions = 50;
    }

    setNumQuestions(requiredNumQuestions);
    setSecondsLeft(getPerQuestionTimeLimit());

    const questionsToUse = allQuestions;

    if (questionsToUse.length < requiredNumQuestions) {
        alert(`Less questions in JSON!`);
        return;
    }

    const shuffled = [...questionsToUse].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, requiredNumQuestions));
    setQuizStarted(true);
    document.documentElement.requestFullscreen();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalRef.current);
          handleQuestionTimeEnd();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const goToNext = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
      setShowResult(true);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    const streamScores = JSON.parse(localStorage.getItem('streamScores') || '{}');
    let currentStreamCorrect = 0;
    let currentStreamAttempted = 0;
    const subjectBreakdown = {};

    questions.forEach((q, index) => {
      currentStreamAttempted++;
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { attempted: 0, correct: 0 };
      }
      subjectBreakdown[q.subject].attempted++;

      if (selectedOptions[index] === q.answerIndex) {
        correctCount++;
        currentStreamCorrect++;
        subjectBreakdown[q.subject].correct++;
      }
    });
    setScore(correctCount);
    updateQuizStats(questions.length, correctCount);

    if (!streamScores[stream]) {
      streamScores[stream] = { attempted: 0, correct: 0, subjects: {} };
    }
    streamScores[stream].attempted += currentStreamAttempted;
    streamScores[stream].correct += currentStreamCorrect;

    for (const sub in subjectBreakdown) {
      if (!streamScores[stream].subjects[sub]) {
        streamScores[stream].subjects[sub] = { attempted: 0, correct: 0 };
      }
      streamScores[stream].subjects[sub].attempted += subjectBreakdown[sub].attempted;
      streamScores[stream].subjects[sub].correct += subjectBreakdown[sub].correct;
    }

    localStorage.setItem('streamScores', JSON.stringify(streamScores));
  };

  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h > 0 ? `${h}:` : ''}${String(m).padStart(2, "0")}:${s}`;
  };

  const updateQuizStats = async (attempted, correct) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const updatedAttempted = (data.totalAttempted || 0) + attempted;
      const updatedCorrect = (data.totalCorrect || 0) + correct;

      await setDoc(userRef, {
        ...data,
        totalAttempted: updatedAttempted,
        totalCorrect: updatedCorrect,
      });
    } else {
      await setDoc(userRef, {
        totalAttempted: attempted,
        totalCorrect: correct,
      });
    }
  };

  const renderContent = (text) => {
    if (!text) return null;

    let decoded = he.decode(text);
    decoded = decoded.replace(/\n/g, '<br/>');
    decoded = decoded.replace(/\<sup\>\$\$(.*?)\$\$\<\/sup\>/g, (_, match) => {
      return `<sup>${match}</sup>`;
    });

    const latexRegex = /\$\$([^$]+)\$\$/g;
    const parts = decoded.split(latexRegex);

    return parts.map((part, i) =>
      i % 2 === 0
        ? <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
        : <InlineMath key={i} math={part.trim()} />
    );
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl mb-4">Start {stream} Test</h1>
            <button
              onClick={startQuiz}
              className="btn btn-primary"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion && !showResult) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const streamScores = JSON.parse(localStorage.getItem('streamScores') || '{}');

  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="flex-1">
          <p className="text-lg font-semibold">Stream: {stream}</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-base-content">
            ⏱️ {formatTime(secondsLeft)} (per question)
          </p>
          <p className="text-lg text-base-content">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {showResult ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-3xl justify-center mb-4">Test Completed!</h2>
              <p className="text-2xl mb-6">
                Your Score: <span className="font-bold text-primary">{score}</span> / {questions.length}
              </p>

              <h3 className="text-xl font-bold mb-4">Stream-wise Scores:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Stream</th>
                      <th>Attempted</th>
                      <th>Correct</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(streamScores).map(([subj, data]) => (
                      <tr key={subj}>
                        <td>{subj}</td>
                        <td>{data.attempted}</td>
                        <td>{data.correct}</td>
                        <td>{data.attempted > 0 ? ((data.correct / data.attempted) * 100).toFixed(2) : 0}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {streamScores[stream] && streamScores[stream].subjects && (
                <>
                  <h3 className="text-xl font-bold mb-4">Subject Breakdown for {stream}:</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Attempted</th>
                          <th>Correct</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(streamScores[stream].subjects).map(([sub, data]) => (
                          <tr key={sub}>
                            <td>{sub}</td>
                            <td>{data.attempted}</td>
                            <td>{data.correct}</td>
                            <td>{data.attempted > 0 ? ((data.correct / data.attempted) * 100).toFixed(2) : 0}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <h3 className="text-xl font-bold mb-4">Detailed Results:</h3>
              <div className="space-y-6 text-left">
                {questions.map((q, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-semibold text-lg mb-2">Question {index + 1}: {renderContent(q.question)}</h4>
                    <ul className="list-disc ml-5 space-y-1">
                      {q.options.map((option, optIndex) => (
                        <li key={optIndex} className={`${
                          optIndex === q.answerIndex ? 'text-success font-bold' : ''
                        } ${
                          selectedOptions[index] === optIndex && optIndex !== q.answerIndex ? 'text-error line-through' : ''
                        }`}>
                          {renderContent(option)}
                          {selectedOptions[index] === optIndex && ` (Your Answer)`}
                          {optIndex === q.answerIndex && ` (Correct Answer)`}
                        </li>
                      ))}
                    </ul>
                    {q.explanation && (
                      <div className="mt-3 text-sm">
                        <h5 className="font-semibold">Explanation:</h5>
                        <p>{renderContent(q.explanation)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="card-actions justify-center gap-4 mt-8">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  Retake Test
                </button>
                <button
                  onClick={() => navigate("/HomePage")}
                  className="btn btn-secondary"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">{renderContent(currentQuestion.question)}</h2>
                <p className="text-sm text-base-content/70">Subject: {currentQuestion.subject}</p>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`btn btn-outline w-full justify-start text-left p-4 h-auto min-h-[3rem] transition-all
                      ${selectedOptions[currentQuestionIndex] === index
                        ? "btn-active btn-primary"
                        : "hover:btn-primary"
                      }`}
                  >
                    <span
                      className={`badge badge-lg mr-3 font-semibold
                        ${selectedOptions[currentQuestionIndex] === index
                          ? "badge-primary"
                          : "badge-ghost"
                        }`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1">{renderContent(option)}</span>
                  </button>
                ))}
              </div>

              <div className="card-actions justify-between mt-8">
                <button
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    }
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                    }
                    navigate("/HomePage");
                  }}
                  className="btn btn-error"
                >
                  Exit Quiz
                </button>
                <button
                  onClick={goToNext}
                  disabled={selectedOptions[currentQuestionIndex] === undefined}
                  className={`btn ${selectedOptions[currentQuestionIndex] === undefined ? "btn-disabled" : "btn-primary"}`}
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "View Result"
                    : "Next Question"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Test;