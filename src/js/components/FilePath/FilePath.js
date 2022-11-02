import React from "react";
import { useApp } from "@utils";
import styled from "styled-components";
import { buildFilePath } from "@helpers";
import { useTheme } from "styled-components";
import { TextNode, InteractiveIcon } from "@ui";

const InteractiveText = styled(TextNode)`
  cursor: pointer;
  &: hover {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export const FilePath = () => {
  const { current, navigate, fileTree } = useApp();
  const theme = useTheme();

  return (
    <>
      {current &&
        buildFilePath(current, fileTree)
          .slice(1)
          .map((segment, index) => {
            return index === 0 ? (
              <InteractiveIcon
                symbol="home"
                events={{
                  onClick: (e) => navigate(segment.id),
                }}
                key={segment.id}
              />
            ) : (
              <React.Fragment key={segment.id}>
                <TextNode
                  variant="span"
                  scale={0.9}
                  style={{
                    fontWeight: "bold",

                    marginLeft: theme.base / 2 + "px",
                    marginRight: theme.base / 2 + "px",
                  }}
                >
                  \
                </TextNode>

                <InteractiveText
                  variant="span"
                  scale={0.9}
                  onClick={(e) => navigate(segment.id)}
                >
                  {segment.id.split("/").pop()}
                </InteractiveText>
              </React.Fragment>
            );
          })}
    </>
  );
};
