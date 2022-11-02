import React, { useState, useRef } from "react";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  position: relative;

  width: ${({ theme, size }) => size * theme.base + "px" || "auto"};
  height: ${({ theme, size }) => size * theme.base + "px" || "auto"};
`;

const C = styled.span`
  background-color: ${(props) => props.theme.palette.surface7};
  cursor: pointer;
  padding: 8px;
  color: ${(props) => props.theme.palette.font1};
  box-shadow: ${({ theme }) => theme.palette.shadow3};

  position: absolute;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  border-radius: 8px;

  & > span {
    font-size: ${({ theme }) => theme.base * 0.7 + "px"};
    text-align: center;
  }
`;

const getArrowHorizontalAndVerticalPosition = (direction) => {
  const horizontalProps = { left: "50%", marginLeft: "-5px" };
  const verticalProps = { top: "50%", marginTop: "-5px" };

  if (direction === "top") return { top: "100%", ...horizontalProps };
  if (direction === "bottom") return { bottom: "100%", ...horizontalProps };
  if (direction === "left") return { left: "100%", ...verticalProps };
  if (direction === "right") return { right: "100%", ...verticalProps };
};

const getTooltipPosition = (direction, width, height) => {
  const horizontal = { top: "50%", transform: "translateY(-50%)" };
  const vertical = { left: "50%", transform: "translateX(-50%)" };

  if (direction === "left")
    return {
      ...horizontal,
      left: "0%",

      marginLeft: `-${width + 6}px`,
    };

  if (direction === "right")
    return {
      ...horizontal,
      left: "100%",

      marginLeft: `6px`,
    };

  if (direction === "top")
    return {
      ...vertical,
      left: "50%",

      top: "0%",
      marginTop: `-${height + 6}px`,
    };

  if (direction === "bottom")
    return {
      ...vertical,
      left: "50%",

      top: "100%",
      marginTop: "6px",
    };
};

const getArrowDirection = (direction, color) => {
  const isDirection = (d) => (d === direction ? color : "transparent");

  return ["top", "right", "bottom", "left"].map(isDirection).join(" ");
};

export function Tooltip({
  title,
  timeout = 800,
  scale,
  children,
  direction,
  ...props
}) {
  const [tooltip, setTooltip] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(null);
  const [tooltipHeight, setTooltipHeight] = useState(null);
  const ref = useRef(null);

  const t = useTheme();

  const refWrapper = React.useCallback(
    (el) => {
      ref.current = el;
      if (el) {
        const { width, height } = el.getBoundingClientRect();
        setTooltipHeight(height);
        setTooltipWidth(width);
      }
    },
    [ref.current]
  );

  const handleTooltip = () => {
    setTooltip(true);
    setTimeout(() => setTooltip(false), timeout);
  };

  return (
    <Wrapper
      size={scale}
      onMouseEnter={handleTooltip}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip ? (
        <C
          ref={refWrapper}
          direction={direction}
          pos={scale}
          style={getTooltipPosition(direction, tooltipWidth, tooltipHeight)}
        >
          <span>{title}</span>
          <span
            style={{
              position: "absolute",
              borderWidth: "5px",
              borderColor: getArrowDirection(direction, t.palette.surface7),
              borderStyle: "solid",
              ...getArrowHorizontalAndVerticalPosition(direction),
            }}
          />
        </C>
      ) : null}
      {children}
    </Wrapper>
  );
}
