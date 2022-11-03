import React from "react";

import { render, screen } from "@testing-library/react";
import { ControlBar } from "../ControlBar";

import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";
test("renders control bar", () => {
  render(renderWithProviders(<ControlBar />));

  screen.debug();
});
