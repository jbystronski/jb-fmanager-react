import React from "react";
import { useModal, useApp, useDarkMode } from "@utils";
import { IconButton, Tooltip } from "@ui";
import { buildFilePath } from "@helpers";

export function ControlBar({ onClose }) {
  const {
    setCurrentView,
    createFolder,
    refresh,
    current,
    UPLOAD,
    SHARED,
    SETTINGS,

    fileTree,
  } = useApp();
  const { Modal, openModal } = useModal("modal");
  const { darkMode, toggleDarkMode } = useDarkMode();

  const controls = [
    ["refresh", "Refresh", refresh],
    ["share", "Share", () => setCurrentView(SHARED)],
    [
      darkMode ? "light_mode" : "dark_mode",
      `Toggle ${darkMode ? "light" : "dark"} theme`,
      toggleDarkMode,
    ],
    ["add_folder", "Create new folder", openModal],
    ["upload_up", "Upload file", () => setCurrentView(UPLOAD)],

    ["exit", "Close manager", onClose],
  ];

  const handleCreateFolder = (value) => {
    createFolder(current, value);
    openModal();
  };

  return (
    <>
      {controls.map((c, i) => {
        const [symbol, tooltip, onClick] = c;

        return (
          <Tooltip key={symbol} title={tooltip} scale={3.2} direction="left">
            <IconButton
              wrapperScale={3.2}
              symbol={symbol}
              events={{
                onClick: onClick,
              }}
            />
          </Tooltip>
        );
      })}

      <Modal
        header="Create folder"
        subheader={
          current &&
          buildFilePath(current, fileTree).map((s, index) =>
            !s.dir ? (
              <React.Fragment key={index}>
                {s.id.split("/").pop() + " / "}
              </React.Fragment>
            ) : null
          )
        }
        inputProps={{ value: "" }}
        onConfirm={handleCreateFolder}
        onCancel={() => openModal()}
      />
    </>
  );
}
