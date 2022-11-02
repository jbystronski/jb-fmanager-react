import React from "react";
import styled from "styled-components";

import { mediaWidth } from "@helpers";

const C = styled.div`
  background: ${({ theme }) => theme.palette.surface2};

  overflow: hidden;

  height: ${({ theme }) => theme.display_box.height + "px" || "auto"};
  width: 100%;

  @media ${mediaWidth("min", 999)} {
    border-radius: 8px;
  }
`;

export const Display = ({ children, ...props }) => {
  return <C {...props}>{children}</C>;
};
