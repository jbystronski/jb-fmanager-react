import React, { useState } from "react";

import { ListView } from "../ListView";
import { GridView } from "../GridView";
import { EmptyDisplay } from "../EmptyDisplay";
import { BottomBar } from "../BottomBar";
import { Display } from "../Display";

import { useContextMenu, useSearch, useApp } from "@utils";
import { getNodeValue, getGridSize } from "@helpers";

export const FilesScreen = (props) => {
  const [gridSize, setGridSize] = useState(getGridSize["m"]);

  const [gridView, setGridView] = useState(true);

  const { searchFilter } = useSearch();

  const {
    current,

    selected,

    pasteFiles,
  } = useApp();
  const { ContextMenu, openMenu } = useContextMenu();

  const btns = [
    {
      symbol: "grid",
      tooltip_title: "Toggle grid view",
      events: {
        onClick: () => setGridView(true),
      },
    },
    {
      symbol: "list",
      tooltip_title: "Toggle list view",
      events: {
        onClick: () => setGridView(false),
      },
    },
    {
      symbol: "zoom",
      tooltip_title: "Zoom in",
      events: {
        onClick: () => {
          setGridView(true);

          Object.values(getGridSize).forEach((v, index, self) => {
            if (
              gridSize["name"] === v["name"] &&
              self[index + 1] !== undefined
            ) {
              setGridSize(self[index + 1]);
            }
          });
        },
      },
    },
    {
      symbol: "zoom_out",
      tooltip_title: "Zoom out",
      events: {
        onClick: () => {
          setGridView(true);

          Object.values(getGridSize).forEach((v, index, self) => {
            if (
              gridSize["name"] === v["name"] &&
              self[index - 1] !== undefined
            ) {
              setGridSize(self[index - 1]);
            }
          });
        },
      },
    },
  ];

  const filterBySearch = (data) =>
    data &&
    data.length &&
    data.filter((node) =>
      getNodeValue(node.id).toLowerCase().includes(searchFilter.toLowerCase())
    );

  return (
    <>
      <Display
        onContextMenu={(e) => {
          openMenu(e);
        }}
      >
        {current && current?.children.length ? (
          gridView ? (
            <GridView
              gridSize={gridSize}
              data={filterBySearch(current.children)}
            />
          ) : (
            <ListView data={filterBySearch(current.children)} />
          )
        ) : (
          <EmptyDisplay message="Folder is empty" icon="empty_folder" />
        )}
      </Display>
      <ContextMenu
        options={[
          {
            name: "copy",
            title: "Copy",
            icon: "paste",
            onClick: () => pasteFiles(current.id, false),
            disabled: !selected.length,
          },
          {
            name: "move",
            title: "Move",
            icon: "paste",
            onClick: () => pasteFiles(current.id, true),
            disabled: !selected.length,
          },
        ]}
      />
      <BottomBar>{btns}</BottomBar>
    </>
  );
};
