import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/HomePage");
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white px-4">
      <div className="w-full max-w-md bg-[#111827] p-8 rounded-2xl shadow-xl border border-[#1f2937]">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegistering ? "Create Account" : "Sign In"} to{" "}
          <span className="text-purple-500">Examprep</span>
        </h2>

        <form className="space-y-6" onSubmit={handleAuth}>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1F2937] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1F2937] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-400">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-purple-500 hover:underline font-semibold"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
          <br></br>
          <button
            onClick={() => navigate("/")} // takes you back to previous page
            className="mt-4 text-sm text-gray-400 hover:text-white transition duration-150"
          >
            ← Back
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
