import React from "react";
import styled from "styled-components";

import { Row } from "@ui";

const InteractiveRow = styled(Row)`
  background: ${({ isDraggedOver, theme }) =>
    isDraggedOver ? theme.palette.syntaxFocus : theme.palette.surface5};
  color: ${({ isDraggedOver, theme }) =>
    isDraggedOver ? theme.palette.font4 : theme.palette.font1};
`;

export const FileRecord = ({
  node,
  isDraggedOver,
  imgSrc,
  handlers,
  styles,
  children,
  ...props
}) => {
  return (
    <InteractiveRow
      isDraggedOver={isDraggedOver}
      name={node.id.split("/").pop()}
      imgSrc={imgSrc}
      {...handlers}
      {...styles}
      nodeChildren={node.children}
      {...props}
    >
      {children}
    </InteractiveRow>
  );
};
