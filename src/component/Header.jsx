import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";

const Header = ({ onShowProfile }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="text-white font-bold text-xl">Examprep</div>

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              {/* This button now calls the onShowProfile prop */}
              <button
                onClick={onShowProfile} // Call the function passed from Landingpage
                className="bg-transparent text-white border border-transparent hover:border-white py-2 px-4 rounded transition-colors duration-200"
              >
                <span className="text-gray-300">Hi, {user.email.split("@")[0]}</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/SignIn")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 p-5 rounded-lg text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;