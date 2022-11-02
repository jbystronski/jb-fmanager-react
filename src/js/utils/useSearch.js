import { useContext } from "react";
import { SearchContext } from "@providers";

export const useSearch = () => useContext(SearchContext);
