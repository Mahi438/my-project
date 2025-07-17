// src/components/LoginSignup.jsx
import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
      }
      navigate("/"); // ✅ Redirect to home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>

      <p
        onClick={() => setIsSignup(!isSignup)}
        style={{
          marginTop: "10px",
          cursor: "pointer",
          color: "blue",
          textAlign: "center",
          fontSize:"17px",
        }}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default LoginSignup;
