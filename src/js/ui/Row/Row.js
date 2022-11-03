import React from "react";
import styled, { useTheme } from "styled-components";

import { isImage, resolveFileIcon } from "@helpers";

import { SvgIcon } from "../SvgIcon";
import { TextNode } from "../TextNode";

const C = styled.div`
  width: ${(props) => props.width || "98%"};
  box-shadow: ${({ theme }) => theme.palette.shadow4};
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  min-height: 50px;
  height: 50px;
  position: relative;

  margin-top: 8px;
  overflow: hidden;
  // color: ${({ theme }) => theme.palette.font1};
  > span > span {
    color: inherit;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.palette.overlay};
  display: ${(props) => (props.isSelected ? "block" : "none")};
`;

const isFile = (str) => str.split("/").reverse()[0].split(".").length >= 2;

export const Row = ({ width, name, nodeChildren, imgSrc, ...props }) => {
  const theme = useTheme();

  return (
    <C width={width} {...props}>
      <Overlay isSelected={props.isSelected} />
      <span style={{ display: "flex", alignItems: "center" }}>
        <span>
          {isImage(name) ? (
            <img src={imgSrc} width="24" height="24" />
          ) : (
            <SvgIcon
              symbol={resolveFileIcon(
                name,
                !!nodeChildren.length,
                null,
                !isFile(name)
              )}
              color={isFile(name) ? "darkgrey" : theme.palette.syntax1}
              size="24"
            />
          )}
        </span>

        <TextNode
          variant="span"
          scale={0.8}
          style={{ marginLeft: theme.base * 0.75 + "px" }}
        >
          {name}
        </TextNode>
      </span>

      {props.children}
    </C>
  );
};
