import React from "react";

import { render, screen } from "@testing-library/react";
import GridTile from ".";
import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";

test("renders grid tile", () => {
  render(
    renderWithProviders(
      <GridTile
        tile="12"
        node={{
          id: "test_file.txt",
          children: [],
          dir: false,
        }}
        getFileUrl={(id) => id}
        active={true}
      />
    )
  );

  screen.debug();
});
