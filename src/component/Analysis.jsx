import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import he from 'he';
import { InlineMath } from 'react-katex';

const Analysis = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [subjectStats, setSubjectStats] = useState({});

  useEffect(() => {
    const q = JSON.parse(localStorage.getItem("test-questions")) || [];
    const a = JSON.parse(localStorage.getItem("test-answers")) || {};
    setQuestions(q);
    setAnswers(a);

    let s = 0, att = 0;
    const subjStats = {};

    q.forEach((question, idx) => {
      const userAns = a[idx];
      if (userAns !== undefined) {
        att++;
        if (!subjStats[question.subject]) {
          subjStats[question.subject] = { attempted: 0, correct: 0 };
        }
        subjStats[question.subject].attempted++;
        if (userAns === question.answerIndex) {
          s += 4;
          subjStats[question.subject].correct++;
        } else {
          s -= 1;
        }
      }
    });

    setScore(s);
    setAttempted(att);
    setSubjectStats(subjStats);
  }, []);

  const clearData = () => {
    localStorage.removeItem("test-questions");
    localStorage.removeItem("test-answers");
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

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Analysis</h1>
      <p className="mb-2">Questions Attempted: {attempted} / {questions.length}</p>
      <p className="mb-2">Total Score: {score} / {questions.length*4}</p>
      <p className="mb-4">Overall Accuracy: {attempted > 0 ? ((Object.values(subjectStats).reduce((acc, s) => acc + s.correct, 0) / questions.length) * 100).toFixed(2) : 0}%</p>

      <h2 className="text-xl font-semibold mb-2">Subject-wise Accuracy</h2>
      <ul className="mb-4">
        {Object.entries(subjectStats).map(([subj, stat]) => (
          <li key={subj}>
            {subj}: {stat.correct}/{stat.attempted} correct ({stat.attempted > 0 ? ((stat.correct / stat.attempted) * 100).toFixed(2) : 0}%)
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="border p-2">
            <p className="font-medium">{renderContent(q.question)}</p>
            <ul>
              {q.options.map((opt, oIdx) => (
                <li key={oIdx} className={`
                  ${oIdx === q.answerIndex ? "text-green-600 font-bold" : ""}
                  ${answers[idx] === oIdx && oIdx !== q.answerIndex ? "text-red-600 line-through" : ""}
                `}>
                  {renderContent(opt)}
                  {answers[idx] === oIdx ? " (Your answer)" : ""}
                  {oIdx === q.answerIndex ? " (Correct)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            clearData();
            navigate("/test");
          }}
        >
          Retake Quiz
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            clearData();
            navigate("/home");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Analysis;
