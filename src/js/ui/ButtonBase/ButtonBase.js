import styled from "styled-components";
import React from "react";

const Component = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background-repeat: no-repeat;
  background: none;
`;

export const ButtonBase = ({ disabled, ...props }) => {
  return <Component {...props}>{props.children}</Component>;
};
