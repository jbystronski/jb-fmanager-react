import React from "react";

import {
  FullscreenImageProvider,
  ThemeProvider,
  ConfigProvider,
  DarkModeProvider,
  AppProvider,
} from "@providers";
import { usePortal } from "@utils";
import { createPortal } from "react-dom";
import { Manager } from "../Manager";

export const App = ({
  stackIndex = 5000,
  id = "jb_fmanager",
  isOpen = false,
  data,
  onClose,
  browserOnly = false,
  host,
  mountAlias = "",
  maxUploadSize,
  namespace = "api/fm",
  lightTheme = {},
  darkTheme = {},
  parentDarkMode = false,
}) => {
  const { invokePortal, revokePortal } = usePortal(id, stackIndex);

  return (
    <DarkModeProvider parentDarkMode={parentDarkMode}>
      <ThemeProvider
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        stackIndex={stackIndex}
      >
        <ConfigProvider
          browserOnly={browserOnly}
          host={host || window.location.origin}
          namespace={namespace}
          maxUploadSize={maxUploadSize}
          mountAlias={mountAlias}
          data={data}
        >
          <AppProvider>
            <FullscreenImageProvider>
              {isOpen &&
                createPortal(
                  <Manager revokePortal={revokePortal} onClose={onClose} />,

                  invokePortal()
                )}
            </FullscreenImageProvider>
          </AppProvider>
        </ConfigProvider>
      </ThemeProvider>
    </DarkModeProvider>
  );
};
