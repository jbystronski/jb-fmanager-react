import React from "react";
import styled from "styled-components";

import { TextNode } from "../TextNode";
import { SvgIcon } from "../SvgIcon";

const TreeLeafComponent = styled.span`
  padding: 0px;
  margin: 0px;
  display: flex;

  align-items: flex-start;

  box-sizing: border-box;

  color: inherit;
`;

const LeafBase = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background-repeat: no-repeat;
  background: none;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 3px;
  padding-right: 6px;
  border-radius: 2px;

  color: inherit;

  &:focus {
    background-color: ${({ theme }) => theme.palette.primary};
  }
`;

const LeafText = styled(TextNode).attrs((props) => ({
  variant: "span",
}))`
  margin-left: 12px;
  color: inherit;
`;

const IconBase = styled.span`
  display: flex;
  align-items: center;
`;

const Symbol = styled(SvgIcon)`
  display: block;

  color: inherit;
  margin-right: 5px;
  color: ${(props) => props.color};
`;

export const TreeNode = ({
  symbol,
  icons,
  color,
  text,
  value,

  ...props
}) => {
  return (
    <TreeLeafComponent>
      <LeafBase {...props}>
        <IconBase>
          {icons.map(
            (i) =>
              i.symbol && (
                <Symbol
                  key={i.symbol}
                  onClick={i.onClick}
                  scale={i.scale}
                  symbol={i.symbol}
                  color={i.color}
                />
              )
          )}
        </IconBase>

        <LeafText scale={0.9}>{text}</LeafText>
      </LeafBase>
    </TreeLeafComponent>
  );
};
