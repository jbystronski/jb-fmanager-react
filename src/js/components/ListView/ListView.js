import React from "react";
import { FixedSizeList } from "react-window";
import styled, { useTheme } from "styled-components";

import { FileRecord } from "../FileRecord";
import { File } from "../File";
import { useApp } from "@utils";

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const Row = ({ index, style, data }) => {
  const { getFileUrl, selected } = useApp();
  const node = data[index];

  return (
    <div
      style={{
        ...style,
      }}
    >
      <RowWrapper>
        <File node={node} contextMenuOptions="*">
          <FileRecord
            isSelected={selected.includes(node.id)}
            imgSrc={getFileUrl(node.id)}
          />
        </File>
      </RowWrapper>
    </div>
  );
};

export const ListView = ({ data }) => {
  const { display_box } = useTheme();

  return (
    <FixedSizeList
      height={display_box.height}
      itemCount={data.length}
      itemSize={60}
      itemData={data}
      width={display_box.width}
    >
      {Row}
    </FixedSizeList>
  );
};
