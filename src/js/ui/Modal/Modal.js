import React, { useState, useEffect } from "react";
import styled, { keyframes, useTheme } from "styled-components";

import { EnhancedInput } from "../EnhancedInput/EnhancedInput";
import { TextNode } from "../TextNode/TextNode";
import { InteractiveIcon } from "../InteractiveIcon/InteractiveIcon";
import { Button } from "../Button/Button";

const fadeIn = keyframes`
0% {
  opacity:0;
}

100% {
  opacity:1;
}


`;

const Layer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const C = styled.div`
  width: ${({ theme }) => theme.display_box.width * 0.5 + "px" || "auto"};
  background: ${({ theme }) => theme.palette.surface1};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  left: 50%;
  top: 50%;
  padding: ${({ theme }) => theme.base * 1.4 + "px"};
  border-radius: 16px;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.palette.shadow3};
  animation: ${fadeIn} ease 0.2s;
  color: ${({ theme }) => theme.palette.font1};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > button {
    font-weight: normal;
    width: ${({ width }) => width + "px" || "auto"};
    padding: ${({ theme }) => theme.base / 2 + "px"} 0px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Modal = ({
  onClose,
  onConfirm,
  header,
  subheader,
  inputProps,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(
    inputProps?.value ? inputProps.value : ""
  );

  const t = useTheme();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Escape") handleClose();

      if (e.code === "Enter") handleConfirm();
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [inputValue]);

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Layer>
      <C>
        <Top>
          <InteractiveIcon
            tooltip_title="close"
            symbol="close"
            events={{
              onClick: handleClose,
            }}
          />
        </Top>
        {header && <TextNode variant="h4">{header}</TextNode>}
        {subheader && <TextNode variant="p">{subheader}</TextNode>}
        {inputProps && (
          <div
            style={{
              marginTop: t.base + "px",
              marginBottom: t.base + "px",
            }}
          >
            <EnhancedInput style={{ width: "100%" }}>
              <TextNode
                variant="input"
                value={inputValue}
                style={{
                  width: "100%",
                }}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </EnhancedInput>
          </div>
        )}

        <Controls>
          <Button
            color={t.palette.font4}
            onClick={handleClose}
            title="Cancel"
            style={{
              background: t.palette.secondary,
            }}
          />

          <Button
            color={t.palette.font4}
            onClick={handleConfirm}
            title="Confirm"
            style={{
              background: t.palette.primary,
            }}
          />
        </Controls>
      </C>
    </Layer>
  );
};
