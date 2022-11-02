import React from "react";
import styled from "styled-components";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import { GraphicsBlock } from "../GraphicsBlock/GraphicsBlock";

const I = ({ className, children, ...props }) => (
  <i className={className} {...props}>
    {children}
  </i>
);

const Icon = styled(SvgIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width + "px" || "16px"};
  height: ${(props) => props.height + "px" || "16px"};

  color: ${(props) => props.color || "inherit"};
`;

export const IconBlock = ({ symbol, size, ...props }) => {
  return (
    <GraphicsBlock {...props}>
      <Icon color={props.color} symbol={symbol} width={size} height={size}>
        {symbol}
      </Icon>
    </GraphicsBlock>
  );
};
