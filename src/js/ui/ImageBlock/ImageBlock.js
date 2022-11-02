import React from "react";
import styled from "styled-components";
import { GraphicsBlock } from "../GraphicsBlock/GraphicsBlock";
import { IconBlock } from "../IconBlock/IconBlock";

const Image = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
`;

export const ImageBlock = ({
  src,

  nativeWidth,
  nativeHeight,

  ...props
}) => {
  return (
    <GraphicsBlock {...props}>
      {src ? (
        <Image
          loading="lazy"
          decoding="async"
          src={src}
          width={nativeWidth}
          height={nativeHeight}
        />
      ) : (
        <IconBlock symbol="image_file" />
      )}
    </GraphicsBlock>
  );
};
