import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const ThemeContext = createContext();

// Custom Hook to Use ThemeContext
export const useThemeContext = () => useContext(ThemeContext);

// Theme Provider Component
 const ThemeContextProvider = ({ children }) => {
  // Load theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to update theme in localStorage & apply to <html> tag
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider
