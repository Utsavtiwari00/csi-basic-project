import React from "react";
import { useNavigate } from "react-router-dom";

const Notes_Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-8 text-base-content">
            Chapter Wise Notes
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {["JEE", "NEET", "NCERT"].map((exam, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/notes/${exam.replace(/\s+/g, "").toLowerCase()}`)}
                className="card bg-base-100 shadow-lg border border-base-300 cursor-pointer hover:bg-base-300 transition-colors duration-200"
              >
                <div className="card-body items-center text-center">
                  <div className="text-2xl font-semibold mb-2">{exam}</div>
                  <p className="text-base-content/70">
                    Access notes for {exam}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notes_Page;
0
