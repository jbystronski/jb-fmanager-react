import React from "react";
import { useFiletree, useConfig } from "../utils";
import { AppContext } from "./AppContext";
import { useFilesystem } from "../utils/useFilesystem";

export const AppProvider = (props) => {
  const { browserOnly } = useConfig();

  const operator = browserOnly ? useFiletree() : useFilesystem();

  return (
    <AppContext.Provider value={operator}>{props.children}</AppContext.Provider>
  );
};
