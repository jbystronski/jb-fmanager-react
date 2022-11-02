import React from "react";
import styled from "styled-components";

import { SvgIcon } from "../SvgIcon/SvgIcon";

const Wrapper = styled.span`
  padding-left: 4px;
  padding-right: 4px;
  cursor: pointer;
  background: ${({ theme }) => theme.palette.input.background};
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;

  border: 2px solid ${({ theme }) => theme.palette.input.border};
  box-sizing: border-box;

  > span > input {
    display: block;
  }

  &:focus-within {
    > svg {
      color: ${({ theme }) => theme.palette.primary};
    }
    > span > svg {
      color: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const Start = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.base * 0.8 + "px"};
  color: ${({ theme }) => theme.palette.font1};
  padding-bottom: 6px;
  display: inline-block;
`;

const displayIcons = (inputProps, positionedIcons) => {
  const icons = inputProps ? inputProps[positionedIcons] : null;

  return (
    <>
      {icons &&
        Array.isArray(icons) &&
        icons.map((icon) => (
          <SvgIcon
            scale={1.25}
            style={{ marginLeft: "4px", marginRight: "4px" }}
            key={icon.symbol}
            {...icon}
          />
        ))}
    </>
  );
};

export const EnhancedInput = ({
  children,
  inputProps,
  label,
  moreStyling,
  ...props
}) => {
  if (inputProps) {
    return (
      <>
        {label && <Label>{label}</Label>}
        <Wrapper {...moreStyling}>
          <Start>
            {displayIcons(inputProps, "startIcons")}
            {children}
          </Start>
          {displayIcons(inputProps, "endIcons")}
        </Wrapper>
      </>
    );
  }

  return (
    <>
      {label && <Label>{label}</Label>}
      <Wrapper
        style={{ paddingLeft: "4px", paddingRight: "4px", ...moreStyling }}
      >
        {children}
      </Wrapper>
    </>
  );
};
