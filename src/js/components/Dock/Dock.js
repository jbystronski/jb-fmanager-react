import React, { useEffect, useState } from "react";

import ClickAwayListener from "react-click-away-listener";

import styled from "styled-components";
import { mediaWidth } from "@helpers";

const C = styled.div`
align-items: center;
justify-content: center;
display: flex;
border-left: 1px solid ${({ theme }) => theme.palette.divider};

 
box-sizing: border-box;

flex-direction: column;
background-color: ${({ theme }) => theme.palette.surface1};
> div > div > svg {
 width: 20px;
 height: 20px;
 
}
width: ${({ theme }) => theme.controls_box.width + "px" || "auto"};
height: ${({ theme }) => theme.controls_box.height + "px" || "auto"};

@media ${mediaWidth("max", 998)} {
 


 width: 75px;
 position: fixed;
 z-index: 1;
 top: 0%;
 right: ${(props) => (props.isVisible ? "0px" : "-75px")};

 transition: ease-in 0.2s ;
 border: none;
  box-shadow:${({ theme }) => theme.palette.shadow2};

 > div > div > svg {
   width: 20px;
   height: 20px;
   
 }
`;

export const Dock = ({ isOpen, onClose, x, y, ...props }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleClickAway = (e) => {
    e.stopPropagation();
    if (visible) {
      onClose();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <C isVisible={visible} {...props}>
        {props.children}
      </C>
    </ClickAwayListener>
  );
};
