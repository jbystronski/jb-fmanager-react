import React from "react";
import styled, { useTheme } from "styled-components";
import { TextNode } from "../TextNode";

const Overlay = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: ${({ theme, blockSize }) => theme.base * blockSize - 20 + "px"};
  height: ${({ theme, blockSize }) => theme.base * blockSize - 20 + "px"};
  background: ${({ theme }) => theme.palette.overlay};

  box-sizing: border-box;
  z-index: 10;
`;

const Text = styled(TextNode)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: inherit;
  max-width: 90%;
`;

const Title = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0%;
  left: 0%;
  background: inherit;
  width: 100%;
  height: 17%;
  overflow: hidden;

  flex-direction: column;

  padding: 0px 4px;
  > span {
    font-size: ${(props) => props.$fontSize + "px"};
  }
`;

const W = styled.div`
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.palette.shadow1};
  position: relative;
  width: ${({ theme, blockSize }) => theme.base * blockSize - 20 + "px"};
  height: ${({ theme, blockSize }) => theme.base * blockSize - 20 + "px"};
  border-radius: 8px;

  cursor: pointer;
  overflow: hidden;
`;

export const GraphicsBlock = ({
  active,
  blockSize,
  title,
  styles,

  ...props
}) => {
  const t = useTheme();

  const fontBase = (t.base * blockSize - 20) / 10;

  const fontSize = fontBase >= t.base ? t.base : fontBase;

  return (
    <W {...styles} blockSize={blockSize} {...props}>
      {active && <Overlay blockSize={blockSize} {...styles} />}
      {props.children}
      <Title $fontSize={fontSize} {...styles}>
        <Text variant="span">{title}</Text>
      </Title>
    </W>
  );
};
