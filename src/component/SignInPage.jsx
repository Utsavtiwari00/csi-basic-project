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
      navigate("/home");
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegistering ? "Create Account" : "Sign In"} to{" "}
          <span className="text-primary">Examprep</span>
        </h2>

        <form className="space-y-6" onSubmit={handleAuth}>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-primary hover:underline font-semibold"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-base-content/60 hover:text-primary transition duration-150"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
