import { useContext } from "react";
import { FileshareContext } from "@providers";

export const useFileshare = () => useContext(FileshareContext);
