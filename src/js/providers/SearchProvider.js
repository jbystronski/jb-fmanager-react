import React, { createContext, useState } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState("");

  const handleSearch = (str) => setSearchFilter(str);

  const value = React.useMemo(
    () => ({
      searchFilter,
      handleSearch,
    }),
    [searchFilter]
  );

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};
