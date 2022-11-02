import React from "react";
import { useTheme } from "styled-components";

import { SvgIcon, TextNode } from "@ui";
import { Display } from "../Display";
import styled from "styled-components";

const C = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

export const EmptyDisplay = ({ icon, message, ...props }) => {
  const { palette } = useTheme();

  return (
    <Display {...props}>
      <C>
        <SvgIcon symbol={icon} scale={6} color={palette.font2} />

        <TextNode
          variant="h4"
          scale={2}
          style={{
            textAlign: "center",
            marginTop: "16px",
            display: "block",
            color: palette.font2,

            fontWeight: "bold",
          }}
        >
          {message}
        </TextNode>
      </C>
    </Display>
  );
};
