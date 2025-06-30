import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import he from 'he';

const Test = () => {
  const { stream } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const storedQ = JSON.parse(localStorage.getItem("test-questions"));
    const storedA = JSON.parse(localStorage.getItem("test-answers"));
    if (storedQ) {
      setQuestions(storedQ);
      setQuizStarted(true);
      setSecondsLeft(JSON.parse(localStorage.getItem("test-timer")) || 3 * 60 * 60);
      startTimer();
    }
    if (storedA) {
      setSelectedOptions(storedA);
    }
  }, []);

  const startQuiz = async () => {
    try {
      const res = await fetch(`/data/${stream.toLowerCase()}.json`);
      const data = await res.json();
      const required = stream.toLowerCase() === "jeemain" ? 75 : 60;
      if (data.length < required) {
        alert("Not enough questions!");
        return;
      }
      const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, required);
      setQuestions(shuffled);
      localStorage.setItem("test-questions", JSON.stringify(shuffled));
      localStorage.setItem("test-answers", JSON.stringify({}));
      setSecondsLeft(3 * 60 * 60);
      localStorage.setItem("test-timer", JSON.stringify(3 * 60 * 60));
      setQuizStarted(true);
      document.documentElement.requestFullscreen();
      startTimer();
    } catch (e) {
      console.error(e);
      alert("Failed to load questions");
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          exitQuiz();
          return 0;
        }
        localStorage.setItem("test-timer", JSON.stringify(prev - 1));
        return prev - 1;
      });
    }, 1000);
  };

  const handleOptionSelect = (optIdx) => {
    const updated = { ...selectedOptions, [currentQuestionIndex]: optIdx };
    setSelectedOptions(updated);
    localStorage.setItem("test-answers", JSON.stringify(updated));
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const exitQuiz = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    if (intervalRef.current) clearInterval(intervalRef.current);
    navigate("/analysis");
  };

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${String(m).padStart(2, "0")}:${s}`;
  };

  const renderContent = (text) => {
    const decoded = he.decode(text);
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
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <button onClick={startQuiz} className="btn btn-primary">Start Quiz</button>
      </div>
    );
  }

  const q = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-base-200 p-4 flex flex-col">
      <div className="flex justify-between text-sm mb-2 sticky top-0 bg-base-200 z-10 py-2">
        <span>⏱️ {formatTime(secondsLeft)}</span>
        <span>Q {currentQuestionIndex + 1} / {questions.length}</span>
      </div>

      <div className="flex-1 bg-base-100 p-6 rounded shadow overflow-auto flex flex-col justify-center">
        <h2 className="mb-6 text-lg font-semibold">{renderContent(q.question)}</h2>
        <p className="mb-6">
          <span className="text-green-600 font-medium">+4 marks</span> &nbsp;
          <span className="text-red-600 font-medium">-1 mark</span>
        </p>

        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className={`btn block mb-4 w-full text-left ${
              selectedOptions[currentQuestionIndex] === idx ? "btn-primary" : "btn-outline"
            }`}
          >
            {renderContent(opt)}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-between flex-wrap gap-2">
        <button onClick={goToPrev} disabled={currentQuestionIndex === 0} className="btn btn-secondary flex-1">
          Previous
        </button>
        <button onClick={goToNext} disabled={currentQuestionIndex === questions.length - 1} className="btn btn-success flex-1">
          Next
        </button>
        <button onClick={exitQuiz} className="btn btn-error flex-1">
          Exit Test
        </button>
      </div>
    </div>
  );
};

export default Test;
