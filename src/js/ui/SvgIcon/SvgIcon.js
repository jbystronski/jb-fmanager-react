import React from "react";
import styled from "styled-components";
import { icons } from "@helpers";

const I = ({ className, children, ...props }) => (
  <svg className={className} {...props}>
    {children}
  </svg>
);

const setSize = (b, s) => {
  return b * s + "px" || "16px";
};

const Component = styled(I)`
  color: ${({ color, theme }) => color || theme.palette.secondary};
  width: ${({ theme, $scale }) => setSize(theme.base, $scale)};
  height: ${({ theme, $scale }) => setSize(theme.base, $scale)};
`;

export function SvgIcon({
  symbol,
  scale = 1,

  color,
  hover_color,

  events,
  ...props
}) {
  const i = icons[symbol] || icons["close"];

  return (
    <Component
      focusable="false"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      $scale={scale}
      viewBox={"0 0 24 24"}
      fill="currentColor"
      {...i.rules}
      {...events}
      {...props}
    >
      {i["paths"].map((path, index) => (
        <path {...i.pathRules} key={index + path.slice(0, 7)} d={path} />
      ))}
    </Component>
  );
}
