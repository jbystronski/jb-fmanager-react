import React from "react";
import styled from "styled-components";
import { addProps } from "@helpers";

const P = styled("p")`
  margin: 0px;
`;

const Span = styled.span``;

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const H4 = styled.h4`
  margin: 0;
  padding: 0;
`;

const Input = styled.input.attrs(({ value, placeholder = "", ...props }) => ({
  value: value,
  placeholder: placeholder,
  type: "text",
  ...props,
}))`
  border: none;
  background: none;
  box-sizing: border-box;
  podding: 0px;
  padding-top: ${({ theme }) => theme.base * 0.6 + "px"};
  padding-bottom: ${({ theme }) => theme.base * 0.6 + "px"};

  margin: 0;
  color: ${({ theme }) => theme.palette.font1};
  &:focus {
    outline: none;
    border: none;
  }
`;

const Text = (props) => {
  return addProps(
    {
      p: <P />,
      span: <Span />,
      h1: <H1 />,
      h2: <H2 />,
      h3: <H3 />,
      h4: <H4 />,
      input: <Input />,
    }[props.variant],
    { ...props }
  );
};

const Component = styled(Text).attrs((props) => ({
  variant: props.variant || "p",

  ...props,
}))`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme, $scale }) => theme.base * $scale + "px" || "auto"};
  color: ${(props) => props.color || props.theme.palette.font1};
`;

export const TextNode = ({ variant, color, scale = 1, children, ...props }) => {
  return (
    <Component variant={variant} color={color} $scale={scale} {...props}>
      {children}
    </Component>
  );
};
