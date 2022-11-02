import React from "react";
import { defaultDarkTheme } from "@helpers";

import {
  FullscreenImageProvider,
  FileshareProvider,
  ConfigProvider,
  DarkModeProvider,
  ThemeProvider,
} from "@providers";

export const renderWithProviders = (ui) => {
  return (
    <FileshareProvider value={{ shared: [] }}>
      <DarkModeProvider value={{ darkMode: true, toggleDarkMode: () => {} }}>
        <ThemeProvider theme={defaultDarkTheme}>
          <ConfigProvider browserOnly={false} namespace="api/fm">
            <FullscreenImageProvider value={{ openFullscreen: () => {} }}>
              {ui}
            </FullscreenImageProvider>
          </ConfigProvider>
        </ThemeProvider>
      </DarkModeProvider>
    </FileshareProvider>
  );
};
