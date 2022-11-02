import React, { useState, createContext, useContext } from "react";

const ctx = createContext(null);

export const NavigationContext = ({ children }) => {
  const [focused, setFocused] = useState(null);

  return (
    <ctx.Provider value={{ focused, setFocused }}>{children}</ctx.Provider>
  );
};

export const useNavigation = () => useContext(ctx);
