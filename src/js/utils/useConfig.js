import { useContext } from "react";
import { ConfigContext } from "@providers";

export const useConfig = () => useContext(ConfigContext);
