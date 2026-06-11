import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [generatePassword, setGeneratePassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [hideToast, sethideToast] = useState(false);

  const handleGeneratePassword = useCallback(() => {
    const length = Number(password);
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let randomPassword = "";

    if (length <= 0) {
      alert("Please enter positive number");
      setGeneratePassword("");
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPassword += chars[randomIndex];
    }

    setGeneratePassword(randomPassword);
    navigator.clipboard.writeText(randomPassword);

    setShowToast(true);
    sethideToast(false);
  }, [password]);
  
useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => {
      sethideToast(true);

      setTimeout(() => {
        setShowToast(false);
        sethideToast(false);
      }, 300); // same as animation duration
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [showToast]);
  return (
    <main>
      {showToast && (
        <div className={`toast ${hideToast ? "hide" : ""}`}>
          Password copied!
        </div>
      )}

      <section className="password-card">
        <h1>Password Generator</h1>
        <div className="generate-card">
          <input
            type="number"
            placeholder="Enter password length"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleGeneratePassword}>Generate</button>
        </div>

        <input
          type="text"
          placeholder="Your secure password"
          className="generate-password-input"
          readOnly
          value={generatePassword}
        />
      </section>
    </main>
  );
};

export default App;
