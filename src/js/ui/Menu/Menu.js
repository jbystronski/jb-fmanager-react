import React from "react";
import styled, { useTheme } from "styled-components";

import { TextNode } from "../TextNode";
import { SvgIcon } from "../SvgIcon";

const List = styled.ul`
  list-style-type: none;

  margin: 0;

  // width: ${(props) => props.width || "150px"};
  background-color: ${({ theme }) => theme.palette.surface6};
  color: ${({ theme }) => theme.palette.font1};
  border-radius: 8px;
  padding: 0;
  padding-top: ${({ theme }) => theme.base + "px"};
  padding-bottom: ${({ theme }) => theme.base + "px"};

  box-shadow: ${({ theme }) => theme.palette.shadow3};
`;

const Item = styled.li`
  width: 100%;

  > button > svg {
    color: ${(props) =>
      props.disabled ? "darkgrey" : props.theme.palette.font1};
  }

  > button > span {
    color: ${(props) =>
      props.disabled ? "darkgrey" : props.theme.palette.font1};
  }
  cursor: pointer;
  color: ${({ theme, disabled }) =>
    disabled ? "darkgrey" : theme.palette.font1};
  &:hover {
    background-color: ${({ theme, disabled }) =>
      !disabled ? theme.palette.highlight : "inherit"};
    color: ${(props) =>
      props.disabled ? "darkgrey" : props.theme.palette.font1};
  }
`;

const Text = styled(TextNode)`
  display: flex;
  // padding: 2px;
  // margin-left: 8px;
  padding-right: ${({ theme }) => theme.base + "px" || "0px"};
`;

const I = ({ className, children, ...props }) => (
  <i className={className} {...props}>
    {children}
  </i>
);

const Content = styled.button`
  padding-bottom: ${({ theme }) => theme.base * 0.4 + "px"};

  padding-top: ${({ theme }) => theme.base * 0.4 + "px"};
  outline: none;
  cursor: pointer;
  border: none;
  background-repeat: no-repeat;
  background: none;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Icon = styled(SvgIcon)`
  margin: 0;
  margin-left: ${({ theme }) => theme.base / 2 + "px"};
  margin-right: ${({ theme }) => theme.base / 2 + "px"};
`;

export const Menu = ({
  items,
  handleClose,
  size,
  scale = 1,
  styles,
  ...props
}) => {
  const handleClick = (cb) => {
    handleClose();

    cb();
  };

  const t = useTheme();

  return (
    <List padding={size}>
      {items.map(({ title, icon, onClick, disabled, ...props }, index) => (
        <Item
          disabled={disabled}
          key={index}
          onClick={() => {
            if (disabled) return false;

            handleClick(onClick);
          }}
          {...props}
        >
          <Content>
            {icon && <Icon symbol={icon} />}
            <Text scale={scale} variant="span">
              {title}
            </Text>
          </Content>
        </Item>
      ))}
    </List>
  );
};
