import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import he from 'he';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'; 
import {useThemeStore} from "../store/useThemeStore"

const QuizPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const {theme} = useThemeStore();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5); 
  const [quizStarted, setQuizStarted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);


  useEffect(() => {
    if (!subject) return;
    fetch(`/data/${subject.toLowerCase()}.json`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to load quiz")
      )
      .then((data) => setAllQuestions(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load quiz for this subject.");
      });
  }, [subject]);

  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, numQuestions));
    setQuizStarted(true);
  };

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      const correct =
        option ===
        questions[currentQuestionIndex].options[
          questions[currentQuestionIndex].answerIndex
        ];
      setSelectedOption(option);
      setIsCorrect(correct);
      setShowFeedback(true);
      if (correct) setScore(score + 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      setShowResult(true);
      updateQuizStats(questions.length, score); 
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const Timer = () => {
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setElapsed((e) => e + 1), 1000);
      return () => clearInterval(id);
    }, []);
    const m = Math.floor(elapsed / 60);
    const s = String(elapsed % 60).padStart(2, "0");
    return (
      <p className="text-base-content">
        ⏱️ {m}:{s}
      </p>
    );
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
            <h1 className="card-title text-2xl mb-4">Select number of questions</h1>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="select select-bordered w-full max-w-xs mb-6"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="flex-1">
          <p className="text-lg font-semibold">Subject: {subject}</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Timer />
          <p className="text-lg text-base-content">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {showResult ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-3xl justify-center mb-4">Quiz Completed!</h2>
              <p className="text-2xl mb-6">
                Your Score: <span className="font-bold text-primary">{score}</span> / {questions.length}
              </p>
              <div className="card-actions justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  Retake Quiz
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
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    disabled={showFeedback}
                    onClick={() => handleOptionSelect(option)}
                    className={`btn btn-outline w-full justify-start text-left p-4 h-auto min-h-[3rem] transition-all
                      ${selectedOption === option
                        ? isCorrect
                          ? "btn-success"
                          : "btn-error"
                        : showFeedback &&
                          option === currentQuestion.options[currentQuestion.answerIndex]
                        ? "btn-success"
                        : "hover:btn-primary"
                      }
                      ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className={`badge badge-lg mr-3 font-semibold
                        ${selectedOption === option
                          ? isCorrect
                            ? "badge-success"
                            : "badge-error"
                          : showFeedback &&
                            option === currentQuestion.options[currentQuestion.answerIndex]
                          ? "badge-success"
                          : "badge-primary"
                        }`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1">{renderContent(option)}</span>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className={`alert ${isCorrect ? "alert-success" : "alert-error"} mt-6`}>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      {isCorrect ? "Correct!" : "Incorrect."}
                    </h3>
                    {!isCorrect && (
                      <p className="mb-2">
                        Correct Answer:{" "}
                        <strong>
                          {renderContent(currentQuestion.options[currentQuestion.answerIndex])}
                        </strong>
                      </p>
                    )}
                    {currentQuestion.explanation && (
                      <div className="mt-3">
                        <h4 className="font-semibold mb-1">Explanation:</h4>
                        <p>{renderContent(currentQuestion.explanation)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="card-actions justify-between mt-8">
                <button
                  onClick={() => navigate("/HomePage")}
                  className="btn btn-error"
                >
                  Exit Quiz
                </button>
                <button
                  onClick={goToNext}
                  disabled={!showFeedback}
                  className={`btn ${!showFeedback ? "btn-disabled" : "btn-primary"}`}
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

export default QuizPage;
