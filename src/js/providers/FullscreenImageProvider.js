import React, { createContext, useState } from "react";
import { FullscreenImage } from "../components";

export const FullscreenImageContext = createContext(null);

export const FullscreenImageProvider = (props) => {
  const [src, setSrc] = useState(null);

  const openFullscreen = (img) => {
    setSrc(img);
  };

  const closeFullscreen = () => setSrc(null);

  return (
    <FullscreenImageContext.Provider
      value={{ openFullscreen, closeFullscreen }}
    >
      {props.children}
      {src && <FullscreenImage src={src} />}
    </FullscreenImageContext.Provider>
  );
};
