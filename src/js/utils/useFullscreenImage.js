import { useContext } from "react";
import { FullscreenImageContext } from "@providers";

export const useFullscreenImage = () => useContext(FullscreenImageContext);
