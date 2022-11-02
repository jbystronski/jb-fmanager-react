import React, { useState } from "react";
import { useSearch } from "@utils";
import { TextNode, EnhancedInput } from "@ui";

const MemoSearchBar = () => {
  const { handleSearch } = useSearch();

  const [value, setValue] = useState("");

  const onReset = () => {
    setValue("");
    handleSearch("");
  };

  const onSearch = () => handleSearch(value);

  return (
    <EnhancedInput
      inputProps={{
        startIcons: [
          {
            symbol: "search",

            events: {
              onClick: onSearch,
            },
          },
        ],
        endIcons: [
          {
            symbol: "backspace",

            events: {
              onClick: onReset,
            },
          },
        ],
      }}
    >
      <TextNode
        variant="input"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch(value)}
      />
    </EnhancedInput>
  );
};

export const SearchBar = React.memo(MemoSearchBar);
