import React, { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  defaultLightTheme,
  defaultDarkTheme,
  calculateDisplay,
} from "@helpers";

import { useWindowSize, useDarkMode } from "../utils";

export const ThemeProvider = ({
  children,
  lightTheme = {},
  darkTheme = {},
  stackIndex,
  ...props
}) => {
  const w = useWindowSize();

  const { darkMode } = useDarkMode();

  const sizes = calculateDisplay(w);

  const customTheme = darkMode ? darkTheme : lightTheme;
  const theme = darkMode ? defaultDarkTheme : defaultLightTheme;
  theme["palette"] = { ...theme["palette"], ...customTheme };

  return (
    <StyledThemeProvider theme={{ ...theme, ...sizes, stackIndex }}>
      {children}
    </StyledThemeProvider>
  );
};
