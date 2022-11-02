import { useContext } from "react";
import { DarkModeContext } from "@providers";

export const useDarkMode = () => useContext(DarkModeContext);
