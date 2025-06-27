import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Profile from "./profile";
import Sidebar from "./Sidebar";
import { useThemeStore } from '../store/useThemeStore';

const HomePage = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [showProfile, setShowProfile] = useState(false);

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

  const toNotes = () => {
    navigate("/notes");
  };

  return (
    <div className="flex min-h-screen bg-base-100 text-base-content" data-theme={theme}>
      <Sidebar
        displayName={displayName}
        onShowProfile={() => setShowProfile(true)}
        onLogout={async () => {
          await signOut(auth);
          navigate("/SignIn");
        }}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Exam wise PYQ Bank Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Exam wise PYQ Bank</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["JEE Main", "JEE Advanced", "NEET"].map((exam, idx) => (
              <div
                onClick={() => navigate(`/quiz/${exam.replace(/\s+/g, "").toLowerCase()}`)}
                key={idx}
                className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors duration-200"
              >
                <div className="card-body items-center text-center p-4">
                  <div className="text-lg font-semibold">{exam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject wise PYQ Bank Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Subject wise PYQ Bank</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Physics", "Chemistry", "Mathematics", "Botany", "Zoology"].map(
              (subject, idx) => (
                <div
                  onClick={() => navigate(`/quiz/${subject.toLowerCase()}`)}
                  key={idx}
                  className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors duration-200"
                >
                  <div className="card-body items-center text-center p-4">
                    <div className="text-lg font-semibold">{subject}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Concept-wise Notes Section */}
        <div className="card bg-base-200 mb-10">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Concept-wise Notes</h2>
            <input
              type="text"
              placeholder="Get clarity on any topic"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Download Notes Section */}
        <div
          onClick={toNotes}
          className="card bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 cursor-pointer transition-all"
        >
          <div className="card-body flex-row items-center justify-between">
            <div>
              <p className="font-bold text-lg">Download Notes</p>
              <p className="text-sm opacity-70">Access concept-wise notes instantly 📚</p>
            </div>
            <button className="btn btn-primary">View</button>
          </div>
        </div>
      </main>

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
