import React, { createContext, useState } from "react";

export const FileshareContext = createContext(null);

export const FileshareProvider = (props) => {
  const [shared, setShared] = useState([]);

  return (
    <FileshareContext.Provider
      value={{
        shared,
        urls: shared.map((n) => n.url),
        setShared,
      }}
    >
      {props.children};
    </FileshareContext.Provider>
  );
};
