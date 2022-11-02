import React from "react";
import { FixedSizeGrid } from "react-window";

import { File } from "../File";
import { GridTile } from "../GridTile";
import styled from "styled-components";
import { getGridConfiguration } from "@helpers";
import { useTheme } from "styled-components";
import { useApp } from "@utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const Cell = ({ columnIndex, rowIndex, style, data, ...props }) => {
  const { selected, getFileUrl } = useApp();
  const node =
    rowIndex === 0
      ? data[columnIndex]
      : data[rowIndex * data.colCount + columnIndex];

  return (
    <>
      {node && (
        <div
          style={{
            ...style,
          }}
        >
          <Wrapper>
            <File node={node} contextMenuOptions="*">
              <GridTile
                tile={data.tile}
                active={selected.includes(node.id)}
                getFileUrl={getFileUrl}
              />
            </File>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export const GridView = ({ gridSize, data }) => {
  const { display_box, base } = useTheme();

  const [columns, rows, tileSize] = getGridConfiguration(
    display_box.width,
    gridSize["tile"] * base,
    data.length
  );

  return (
    <FixedSizeGrid
      columnCount={columns}
      columnWidth={tileSize}
      height={display_box.height}
      rowCount={rows}
      rowHeight={tileSize}
      width={display_box.width}
      itemData={{ ...data, colCount: columns, tile: gridSize["tile"] }}
    >
      {Cell}
    </FixedSizeGrid>
  );
};
