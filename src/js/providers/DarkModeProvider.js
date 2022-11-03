import React, { createContext, useState, useEffect, useMemo } from "react";

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ parentDarkMode, ...props }) => {
  const [darkMode, setDarkMode] = useState(parentDarkMode || false);

  const modeKey = "rfm_dmode";

  const isDark = () => window.localStorage.getItem(modeKey);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    isDark()
      ? window.localStorage.removeItem(modeKey)
      : window.localStorage.setItem(modeKey, true);
  };

  useEffect(() => {
    if (isDark()) {
      setDarkMode(true);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
