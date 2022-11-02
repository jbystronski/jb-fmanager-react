import React from "react";

import { render, screen } from "@testing-library/react";
import NavigationTree from ".";
import { renderWithProviders } from "../../utils/test_utils/renderWithProviders";

import AppProvider from "@provider/AppProvider";

const mockFileTree = {
  root: {
    id: "root",
    original_id: "root",
    parent_id: null,
    dir: false,
    children: [
      {
        id: "/var/nodejs/tfm/server/public",
        original_id: "/var/nodejs/tfm/server/public",
        parent_id: "root",
        dir: true,
        children: [
          {
            id: "/var/nodejs/tfm/server/public/ffd",
            original_id: "/var/nodejs/tfm/server/public/ffd",
            parent_id: "/var/nodejs/tfm/server/public",
            dir: true,
            children: [
              {
                id: "/var/nodejs/tfm/server/public/ffd/notebooks1.jpg",
                original_id: "/var/nodejs/tfm/server/public/ffd/notebooks1.jpg",
                parent_id: "/var/nodejs/tfm/server/public/ffd",
                dir: false,
                children: [],
              },
            ],
          },
          {
            id: "/var/nodejs/tfm/server/public/vf",
            original_id: "/var/nodejs/tfm/server/public/vf",
            parent_id: "/var/nodejs/tfm/server/public",
            dir: true,
            children: [
              {
                id: "/var/nodejs/tfm/server/public/vf/ccc",
                original_id: "/var/nodejs/tfm/server/public/vf/ccc",
                parent_id: "/var/nodejs/tfm/server/public/vf",
                dir: true,
                children: [
                  {
                    id: "/var/nodejs/tfm/server/public/vf/ccc/fodler",
                    original_id: "/var/nodejs/tfm/server/public/vf/ccc/fodler",
                    parent_id: "/var/nodejs/tfm/server/public/vf/ccc",
                    dir: true,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

test("renders navigation tree spinner, no data available", () => {
  render(renderWithProviders(<NavigationTree />));

  screen.debug();
});

test("renders navigation tree", () => {
  render(
    renderWithProviders(
      <AppProvider>
        <NavigationTree fileTree={mockFileTree} />
      </AppProvider>
    )
  );

  screen.debug();
});
