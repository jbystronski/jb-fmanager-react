import React from "react";

import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";

test("renders modal", () => {
  render(
    renderWithProviders(
      <Modal header="Modal's test header" subheader="Modal's test subheader" />
    )
  );

  screen.debug();
});
