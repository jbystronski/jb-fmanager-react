import React from "react";
import styled from "styled-components";
import { Tooltip } from "@ui";

import { IconButton } from "@ui";

const Bar = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.bottom_box.width + "px" || "auto"};

  height: ${({ theme }) => theme.bottom_box.height + "px" || "auto"};

  background-color: ${(props) => props.theme.palette.surface1};
`;

export const BottomBar = ({ children, ...props }) => {
  return (
    <Bar>
      {children.map(({ symbol, tooltip_title, events, ...props }) => (
        <Tooltip key={symbol} title={tooltip_title} scale={3.2} direction="top">
          <IconButton
            wrapperScale={3.2}
            events={{
              ...events,
            }}
            symbol={symbol}
            {...props}
          />
        </Tooltip>
      ))}
    </Bar>
  );
};
