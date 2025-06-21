import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Profile from "./profile";
import Sidebar from "./Sidebar";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.displayName || currentUser.email.split("@")[0]);
        } else {
          setDisplayName(currentUser.email.split("@")[0]);
        }
      } else {
        setDisplayName("");
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  const toNotes = () => {
    navigate("/notes");
  };

  return (
    <div
      className={`flex min-h-screen ${
        isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        displayName={displayName}
        onShowProfile={() => setShowProfile(true)}
        onLogout={async () => {
          await signOut(auth);
          navigate("/SignIn");
        }}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Exam wise PYQ Bank</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["JEE Main", "JEE Advanced", "NEET"].map((exam, idx) => (
              <div
                onClick={()=>navigate(`/quiz/${exam.replace(/\s+/g, "").toLowerCase()}`)}
                key={idx}
                className={`rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors duration-200 cursor-pointer ${
                  isLightMode
                    ? "bg-gray-100 hover:bg-gray-200 text-black"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                <div className="text-lg font-semibold mb-2">{exam}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Subject wise PYQ Bank</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Physics", "Chemistry", "Mathematics", "Botany", "Zoology"].map(
              (subject, idx) => (
                <div
                onClick={() => navigate(`/quiz/${subject.toLowerCase()}`)}
                  key={idx}
                  className={`rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors duration-200 cursor-pointer ${
                    isLightMode
                      ? "bg-gray-100 hover:bg-gray-200 text-black"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  <div className="text-lg font-semibold mb-2">{subject}</div>
                </div>
              )
            )}
          </div>
        </div>
        {/* Concept-wise Notes Section */}
        <div
          className={`mb-10 p-6 rounded-xl ${
            isLightMode ? "bg-gray-100" : "bg-gray-800"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Concept-wise Notes</h2>
          <input
            type="text"
            placeholder="Get clarity on any topic"
            className={`w-full p-3 rounded-lg border focus:outline-none ${
              isLightMode
                ? "bg-white text-black border-gray-300 placeholder-gray-500"
                : "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
            }`}
          />
        </div>

        {/* Download Notes CTA */}
        <div
          onClick={toNotes}
          className={`p-6 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
            isLightMode
              ? "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400"
              : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
          }`}
        >
          <div>
            <p
              className={`font-bold text-lg ${
                isLightMode ? "text-black" : "text-white"
              }`}
            >
              Download Notes
            </p>
            <p
              className={`text-sm ${
                isLightMode ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Access concept-wise notes instantly 📚
            </p>
          </div>
          <button
            className={`text-sm px-4 py-2 rounded-lg ${
              isLightMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            View
          </button>
        </div>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <Profile
          isVisible={showProfile}
          onClose={() => setShowProfile(false)}
          UserName={displayName || "Guest"}
        />
      )}
    </div>
  );
};

export default HomePage;
