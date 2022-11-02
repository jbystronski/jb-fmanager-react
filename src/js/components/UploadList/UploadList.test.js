import React from "react";

import { render, screen } from "@testing-library/react";
import UploadList from ".";

import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";

const mockQueue = [new File(["test"], "test.txt", { type: "text/plain" })];

jest.mock("../src/js/utils/useUpload", () => {
  return jest.fn(() => ({
    queue: mockQueue,
  }));
});

test("renders upload list", () => {
  render(renderWithProviders(<UploadList />));

  screen.debug();
});
