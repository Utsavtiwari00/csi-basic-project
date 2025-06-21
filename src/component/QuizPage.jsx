import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import he from 'he';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'; 



const QuizPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [isLightMode, setIsLightMode] = useState(false);
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
    const storedTheme = localStorage.getItem("theme");
    setIsLightMode(storedTheme === "light");
  }, []);

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
      <p>
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
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Select number of questions</h1>
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className={`mb-6 p-2 rounded-md border border-gray-400 ${ isLightMode ? "text-black bg-white" : "text-white bg-gray-900"}`}
        >
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
          <option value={20}>20 Questions</option>
        </select>
        <button
          onClick={startQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }
  


  if (!currentQuestion) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <header className="border-b sticky top-0 p-4 backdrop-blur-sm z-10">
        <p className="text-lg font-semibold">Subject: {subject}</p>
      </header>

      <section className="mt-10 max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Timer />
          <p className="text-lg">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {showResult ? (
          <div
            className={`${
              isLightMode ? "bg-gray-100" : "bg-gray-800"
            } text-center p-8 rounded-lg shadow`}
          >
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-2xl">
              Your Score: {score} / {questions.length}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate("/HomePage")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Home
            </button>
          </div>
        ) : (
          <div>
           <p className="mb-6 text-lg">{renderContent(currentQuestion.question)}</p>


            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  disabled={showFeedback}
                  onClick={() => handleOptionSelect(option)}
                  className={`flex items-center w-full p-3 border rounded-md shadow-sm transition-colors
    ${
      selectedOption === option
        ? isCorrect
          ? "bg-green-700 border-green-500 text-white"
          : "bg-red-700 border-red-500 text-white"
        : showFeedback &&
          option === currentQuestion.options[currentQuestion.answerIndex]
        ? "bg-green-600 border-green-400 text-white"
        : isLightMode
        ? "bg-gray-200 border-violet-400 text-black hover:bg-gray-300"
        : "bg-gray-800 border-violet-400 text-gray-300 hover:bg-gray-700"
    }
    ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-l-md mr-3 font-semibold
    ${
      selectedOption === option
        ? isCorrect
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
        : showFeedback &&
          option === currentQuestion.options[currentQuestion.answerIndex]
        ? "bg-green-400 text-white"
        : "bg-teal-100 text-teal-700"
    }`}
                  >
                    {index + 1}
                  </span>
                 {renderContent(option)}

                </button>
              ))}
            </div>

            {showFeedback && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-800 text-green-100"
                    : "bg-red-800 text-red-100"
                }`}
              >
                <h3 className="font-bold text-xl mb-2">
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
                  <>
                    <h4 className="font-semibold mb-1">Explanation:</h4>
                    <p>{renderContent(currentQuestion.explanation)}</p>
                  </>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => navigate("/HomePage")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >
                Exit Quiz
              </button>
              <button
                onClick={goToNext}
                disabled={!showFeedback}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors
                  ${
                    !showFeedback
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  }`}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "View Result"
                  : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default QuizPage;
