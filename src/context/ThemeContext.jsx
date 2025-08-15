import React from "react";
import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    // Lưu theme vào localStorage và áp dụng cho body
    localStorage.setItem("app-theme", theme);
    // Cập nhật className của body để áp dụng theme
    document.body.className = theme;
  }, [theme]);

  // Hàm chuyển đổi giữa các theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
