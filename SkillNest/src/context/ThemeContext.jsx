import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
     // 1. Initialize from localStorage (fallback to true)
     const [darkMode, setDarkMode] = useState(
         () => localStorage.getItem("darkMode") === "true" || true
     );

     // 2. Whenever darkMode changes, update <html> class and persist
     useEffect(() => {
          document.documentElement.classList.toggle("dark", darkMode);
          localStorage.setItem("darkMode", darkMode);
     }, [darkMode]);

     const toggleTheme = () => setDarkMode((prev) => !prev);

     return (
         <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
              {children}
         </ThemeContext.Provider>
     );
};

export const useTheme = () => {
     const ctx = useContext(ThemeContext);
     if (!ctx) {
          throw new Error("useTheme must be used within a ThemeProvider");
     }
     return ctx;
};
