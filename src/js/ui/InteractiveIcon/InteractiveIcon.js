import React from "react";
import styled from "styled-components";
import { SvgIcon } from "../SvgIcon/SvgIcon";

const C = styled(SvgIcon)`
  cursor: pointer;
  color: ${({ color, theme }) => color || theme.palette.font1};

  &: hover {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export const InteractiveIcon = (props) => {
  return <C color={props.color} {...props} />;
};
