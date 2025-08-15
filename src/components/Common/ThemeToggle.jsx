import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${theme}`}
      aria-label="Toggle Theme"
    >
      <span className="icon sun">☀️</span>
      <span className="icon moon">🌙</span>
    </button>
  );
}

export default ThemeToggle;
