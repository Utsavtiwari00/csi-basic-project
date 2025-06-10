import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false); 
  const [isCorrect, setIsCorrect] = useState(null); 
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Landingpage');
  };

  useEffect(() => {
    fetch('/quizData.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('There was a problem fetching the quiz data:', error);
      });
  }, []);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      setSelectedOption(option);
      const currentQuestion = questions[currentQuestionIndex];
      const correct = option === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true); 
      if (correct) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const goToNext = () => {
    setSelectedOption(null); 
    setShowFeedback(false); 
    setIsCorrect(null); 
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResult(true); 
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  const Timer = () => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSecondsElapsed(prevSeconds => prevSeconds + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0');

    return (
      <div>
        <p>⏱️{minutes}:{seconds}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50"/>
        {/* Quiz Interface*/}
        <section className='mt-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-6'>
            <Timer />
            <p className="text-lg">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>

          {showResult ? (
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-2xl">Your Score: {score} out of {questions.length}</p>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setShowResult(false);
                  setSelectedOption(null);
                  setShowFeedback(false);
                  setIsCorrect(null)
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Retake Quiz
              </button>
              <p>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium transition-colors "
                >
                  Home
                </button>
              </p>              
            </div>
          ) : (
            <div>
              <p className="text-white-700 text-lg mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`flex items-center justify-between w-full p-3 border rounded-md shadow-sm transition-colors
                      ${selectedOption === option
                        ? (isCorrect ? 'bg-green-700 border-green-500 text-white' : 'bg-red-700 border-red-500 text-white') 
                        : (showFeedback && option === currentQuestion.correctAnswer ? 'bg-green-600 border-green-400 text-white' : 'bg-gray-800 border-violet-400 text-gray-300 hover:bg-gray-700') // Show correct answer after selection
                      }
                      ${showFeedback && selectedOption !== null && selectedOption !== option && option !== currentQuestion.correctAnswer ? 'opacity-50' : ''} // Dim other wrong options when feedback is shown
                      ${showFeedback ? 'cursor-not-allowed' : ''} 
                    `}
                    onClick={() => handleOptionSelect(option)}
                    disabled={showFeedback} 
                  >
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-l-md mr-3 font-semibold
                        ${selectedOption === option
                          ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                          : (showFeedback && option === currentQuestion.correctAnswer ? 'bg-green-400 text-white' : 'bg-teal-100 text-teal-700')
                        }`}>
                        {index + 1}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mt-6 p-4 rounded-lg
                  ${isCorrect ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}
                  ">
                  <h3 className="font-bold text-xl mb-2">
                    {isCorrect ? 'Correct!' : 'Incorrect.'}
                  </h3>
                  {!isCorrect && (
                    <p className="mb-2">
                      The correct answer was: <span className="font-bold">{currentQuestion.correctAnswer}</span> -{' '}
                      {currentQuestion.correctAnswer}
                    </p>
                  )}
                  {currentQuestion.explanation && (
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Explanation:</h4>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={goToNext}
                  disabled={!showFeedback} 
                  className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors
                    ${!showFeedback
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'View Result' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default QuizPage;
