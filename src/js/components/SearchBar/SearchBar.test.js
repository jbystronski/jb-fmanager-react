import React from "react";

import { render, screen } from "@testing-library/react";
import SearchBar from ".";
import { SearchProvider } from "@providers";

import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";

test("renders search bar", () => {
  render(
    renderWithProviders(
      <SearchProvider value={{ handleSearch: () => {} }}>
        <SearchBar />
      </SearchProvider>
    )
  );

  const input = screen.getByPlaceholderText(/search.../i);
  expect(input).toBeInTheDocument();
  screen.debug();
});
