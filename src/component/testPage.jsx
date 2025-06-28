// TestPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TestPage =()=>
{
    const navigate = useNavigate();
    return(
        <>
        <div>
            <h1 className="text-4xl font-bold mb-8 text-base-content text-center">Choose your Stream</h1>
            
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {["JEEMain", "JEEAdvanced", "NEET"].map((exam, idx) => (
              <div
                key={idx}

                onClick={() => navigate(`/testlink/${exam.replace(/\s+/g, "").toLowerCase()}`)}
                className="card bg-base-100 shadow-lg border border-base-300 cursor-pointer hover:bg-base-300 transition-colors duration-200"
              >
                <div className="card-body items-center text-center">
                  <div className="text-2xl font-semibold mb-2">{exam}</div>
                  <p className="text-base-content/70">
                    Generate mock test for {exam}
                  </p>
                </div>
              </div>
            ))}
          </div>
            
            
        </div>
        </>
    );
}

export default TestPage;