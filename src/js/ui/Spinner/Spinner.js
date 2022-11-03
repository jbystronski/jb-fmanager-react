import React from "react";
import { SvgIcon } from "../SvgIcon";

import styled, { keyframes } from "styled-components";

const spin = keyframes`

  0% {
    transform: rotate(0deg); 
    color: ${(props) => props.theme.palette.primary};
  }

  50% {
    color:  ${(props) => props.theme.palette.primary};
  }

  100% {
    transform: rotate(360deg);
    color:  ${(props) => props.theme.palette.primary};
    
  }

`;

const Animate = styled(SvgIcon)`
  animation: ${spin} 0.6s linear infinite;
`;

export const Spinner = () => (
  <Animate symbol="spinner" scale={4} color="inherit" />
);
