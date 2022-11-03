import React from "react";
import styled from "styled-components";
import { TextNode } from "../TextNode";
import { ButtonBase } from "../ButtonBase";

const B = styled(ButtonBase)`
  border-radius: 8px;
  color: ${({ theme }) => theme.palette.font4};
  width: ${(props) => props.width || "100px"};

  font-weight: bold;

  transition: all 0.2s ease-out;
  &: hover {
    background: red;
  }
`;

export const Button = ({ color, width, title, children, ...props }) => {
  return (
    <B width={width} {...props}>
      <TextNode color={color} variant="span">
        {title}
      </TextNode>
    </B>
  );
};
