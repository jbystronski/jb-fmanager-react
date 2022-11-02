import React from "react";
import styled from "styled-components";
import { SvgIcon } from "../SvgIcon/SvgIcon";

const Wrapper = styled.span`
  width: ${({ theme, scale }) => theme.base * scale + "px" || "0px"};
  height: ${({ theme, scale }) => theme.base * scale + "px" || "50px"};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.1s ease-out;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.highlight};
    > svg {
      color: ${(props) => props.theme.palette.font4 || "inherit"};
    }
  }
`;

export const IconButton = ({
  iconScale = 1.5,
  wrapperScale = 3.2,
  events,
  ...props
}) => {
  return (
    <Wrapper scale={wrapperScale} {...events}>
      <SvgIcon scale={iconScale} {...props} />
    </Wrapper>
  );
};
