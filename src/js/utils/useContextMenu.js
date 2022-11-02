import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ClickAwayListener from "react-click-away-listener";
import { Menu } from "../ui";

import { usePortal } from "./usePortal";
import { useWindowSize } from "./useWindowSize";

export const useContextMenu = () => {
  const { invokePortal, revokePortal } = usePortal("context-menu");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const s = useWindowSize();

  const ref = useRef(null);
  const refWrapper = React.useCallback(
    (node) => {
      ref.current = node;
      if (node) {
        const pos = node.getBoundingClientRect();

        if (pos.x + pos.width > s.width) {
          setX(s.width - pos.width);
        }
        if (pos.y + pos.height > s.height) {
          setY(s.height - pos.height);
        }
      }
    },
    [s.width, s.height, ref.current]
  );

  const handleClickAway = () => {
    setX(0);
    setY(0);
    revokePortal();
  };

  const openMenu = (e) => {
    if (e?.type === "contextmenu") {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
    }
  };

  const ContextMenu = ({ options }) => {
    return (
      <>
        {x && y
          ? createPortal(
              <>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div
                    ref={refWrapper}
                    style={{
                      padding: "8px",
                      position: "fixed",
                      top: y + "px",
                      left: x + "px",
                    }}
                  >
                    <Menu
                      items={options}
                      scale={0.8}
                      handleClose={handleClickAway}
                    />
                  </div>
                </ClickAwayListener>
              </>,

              invokePortal()
            )
          : null}
      </>
    );
  };

  return { ContextMenu, openMenu };
};
