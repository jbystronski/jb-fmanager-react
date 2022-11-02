import React from "react";
import styled from "styled-components";
import { IconBlock, ImageBlock } from "@ui";
import { useTheme } from "styled-components";
import { isImage, resolveFileIcon } from "@helpers";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  transition: all 0.7s;
  width: ${(props) => props.width + "px" || "auto"};
  height: ${(props) => props.height + "px" || "auto"};
  > div {
    color: ${({ isDraggedOver, theme }) =>
      isDraggedOver ? theme.palette.font4 : theme.palette.font1};
    background: ${({ isDraggedOver, theme }) =>
      isDraggedOver ? theme.palette.syntaxFocus : theme.palette.surface4};
  }
`;

export const GridTile = ({
  node,
  active,
  getFileUrl,
  tile = 12,
  isDraggedOver,
  handlers,
  ...props
}) => {
  const { id, children, dir } = node;
  const theme = useTheme();

  const GAP = 20;

  const base = theme["base"];

  return (
    <Wrapper
      width={tile * base}
      height={tile * base}
      isDraggedOver={isDraggedOver}
    >
      {isImage(id) ? (
        <ImageBlock
          blockSize={tile}
          src={getFileUrl(id)}
          nativeHeight={tile * base * 1.5 - GAP}
          nativeWidth={tile * base * 1.5 - GAP}
          active={active}
          title={id.split("/").pop()}
          {...handlers}
        />
      ) : (
        <IconBlock
          blockSize={tile}
          size={(tile * base - GAP) * 0.5}
          symbol={resolveFileIcon(id, !!children.length, null, dir)}
          active={active}
          color={dir ? theme.palette.syntax1 : theme.palette.syntax3}
          title={id.split("/").pop()}
          {...handlers}
        />
      )}
    </Wrapper>
  );
};
