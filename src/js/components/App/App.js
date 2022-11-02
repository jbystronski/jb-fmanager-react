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
  id: containerId,
  isOpen,
  onClose,
  browserOnly,
  host,
  mount,
  mountAlias,
  maxUploadSize,
  namespace,
  lightTheme = {},
  darkTheme = {},
  parentDarkMode,
}) => {
  const { invokePortal, revokePortal } = usePortal(containerId, stackIndex);

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
          mount={mount}
          mountAlias={mountAlias}
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
