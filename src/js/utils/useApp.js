import { useContext } from "react";
import { AppContext } from "@providers";

export const useApp = () => useContext(AppContext);
