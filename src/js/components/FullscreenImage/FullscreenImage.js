import React, { useEffect } from "react";
import styled from "styled-components";

import { createPortal } from "react-dom";

import { usePortal, useFullscreenImage } from "@utils";

const Layer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${(props) => props.theme.palette.surface1};
`;

const Image = styled.img`
    position: absolute;
    left 0%;
    top: 0%
    transform: translate(-50%,-50%)

`;

export const FullscreenImage = ({ src }) => {
  const { invokePortal, revokePortal } = usePortal();
  const { closeFullscreen } = useFullscreenImage();

  const closeOneEscapePressed = (e) => {
    if (e.code === "Escape") handleClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOneEscapePressed);

    return () => document.removeEventListener("keydown", closeOneEscapePressed);
  }, []);

  const handleClose = () => {
    closeFullscreen();
    revokePortal();
  };

  return (
    <>
      {src &&
        createPortal(
          <Layer>
            <img src={src} />
          </Layer>,
          invokePortal()
        )}
    </>
  );
};
