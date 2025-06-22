import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Notes_Page = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return (
    <>
      <div className={`min-h-screen ${isLightMode ? "bg-gray-100" : "bg-gray-900"}`}>
        <div className="container mx-auto px-4 py-8"> {/* Added container for better layout */}
          <div className="mb-10 text-center"> {/* Centered the heading */}
            <h1 className={`text-4xl font-bold mb-8 ${isLightMode ? "text-gray-800" : "text-white"}`}>Chapter Wise Notes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"> {/* Adjusted grid for better spacing */}
              {["JEE", "NEET", "NCERT"].map((exam, idx) => (
                <div
                  
                  onClick={() => navigate(`/notes/${exam.replace(/\s+/g, "").toLowerCase()}`)}
                  key={idx}
                  className={`rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-200 cursor-pointer shadow-lg
                    ${isLightMode
                      ? "bg-white hover:bg-gray-200 text-black border border-gray-300"
                      : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                    }`}
                >
                  <div className="text-2xl font-semibold mb-2">{exam}</div>
                  <p className={`${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                    Access notes for {exam}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes_Page;