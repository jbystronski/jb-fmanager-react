import React from "react";
import { TreeNode, Spinner } from "@ui";
import { resolveFileIcon, isImage, mediaWidth } from "@helpers";
import {
  useApp,
  useFullscreenImage,
  useClickPreventionOnDoubleClick,
} from "@utils";

import { useNavigation, NavigationContext } from "./ctx";

import { useTheme } from "styled-components";
import { File } from "../File";
import { FixedSizeTree as Tree } from "react-vtree";
import styled from "styled-components";

const Root = styled.div`
  position: relative;
  color: ${({ theme }) => theme.palette.font3};
  height: ${(props) => props.elHeight + "px" || "auto"};
  width: ${(props) => props.theme.nav_box.width - 1 + "px"};
  overflow: hidden;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.palette.surface3};

  @media ${mediaWidth("min", 1280)} {
    border-radius: 8px;
  }

  @media ${mediaWidth("min", 999)} {
    padding-top: 12px;
    padding-left: 12px;
  }
`;

const TreeNodeWrapper = styled.div`
  &:focus {
    border: none;
    outline: none;
  }
`;

const Gutter = styled.div`
  height: ${(props) => props.elHeight + "px" || "auto"};
`;

const TreeNodeWithContextMenu = ({
  node,
  hasChildren,
  handlers,
  isDraggedOver,
  toggleHandler,

  isOpen,
  ...props
}) => {
  const {
    handleSetSelected,
    selected,
    navigate,

    INFO,
    LIST,
    getFileUrl,
  } = useApp();

  const { openFullscreen } = useFullscreenImage();
  const { palette } = useTheme();

  const { onClick, ...restHandlers } = handlers;
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onSingleClick,
    onDoubleClick
  );

  const { focused, setFocused } = useNavigation();

  function onSingleClick({ id, event }) {
    if (id === focused || event.ctrlKey) {
      handleSetSelected(node.id, event);
    } else {
      setFocused(id);
    }
    navigate(id, isOpen && node.children?.length ? LIST : INFO);
  }

  function onDoubleClick({ id, event }) {
    if (isImage(id)) {
      openFullscreen(getFileUrl(id));
      return;
    }

    navigate(id, isOpen ? LIST : INFO);
  }

  return (
    <TreeNode
      style={{
        borderRadius: "4px",
        backgroundColor:
          selected.includes(node.id) || isDraggedOver
            ? palette.syntaxFocus
            : "inherit",
        border: `2px solid ${
          node.id === focused ? palette.syntaxFocus : "transparent"
        }`,
      }}
      text={node.id.split("/").pop()}
      id={node.id}
      value={node.id}
      {...restHandlers}
      onClick={(e) => handleClick({ id: node.id, event: e })}
      onDoubleClick={(e) => handleDoubleClick({ id: node.id, event: e })}
      icons={[
        {
          color: selected.includes(node.id)
            ? palette.font1
            : palette.syntaxFocus,
          onClick: (e) => {
            e.stopPropagation();
            typeof toggleHandler === "function" && toggleHandler();
          },
          scale: 1,
          symbol: !node.dir
            ? null
            : !node.children?.length || isOpen
            ? "less"
            : "more",
        },

        {
          onClick: null,
          scale: 1,
          color: selected.includes(node.id)
            ? palette.font1
            : node.dir
            ? palette.syntax2
            : palette.syntax4,
          symbol: resolveFileIcon(
            node.id,
            !!node.children.length,
            isOpen,
            node.dir
          ),
        },
      ]}
    >
      {props.children}
    </TreeNode>
  );
};

const Node = ({ data, isOpen, style, toggle }) => {
  return (
    <TreeNodeWrapper
      style={{
        ...style,
        marginLeft: data.nestingLevel * 12 + "px",
      }}
    >
      <File node={data} contextMenuOptions="*">
        <TreeNodeWithContextMenu
          toggleHandler={!data.isLeaf ? toggle : null}
          node={data}
          isOpen={isOpen}
        />
      </File>
    </TreeNodeWrapper>
  );
};

export const MemoNavigationTree = ({ fileTree, ...props }) => {
  const theme = useTheme();

  function* treeWalker(refresh) {
    const stack = [];

    stack.push({
      nestingLevel: 0,
      node: fileTree.root.children[0],
    });

    while (stack.length !== 0) {
      const {
        node: { children = [], id, original_id, parent_id, dir, tracker, info },
        nestingLevel,
      } = stack.pop();

      const isOpened = yield refresh
        ? {
            isLeaf: children.length === 0,
            isOpenByDefault: false,
            dir,
            tracker,
            original_id,
            id,
            children,
            parent_id,
            info,
            nestingLevel,
          }
        : id;

      if (children.length !== 0 && isOpened) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push({
            nestingLevel: nestingLevel + 1,
            node: children[i],
          });
        }
      }
    }
  }

  return (
    <>
      <Root elHeight={theme.nav_box.height - theme.navGutter.height}>
        {fileTree && Object.keys(fileTree).length ? (
          <NavigationContext>
            <Tree
              id="tree"
              treeWalker={treeWalker}
              itemSize={28}
              height={theme.nav_box.height - theme.navGutter.height - 12}
              width={theme.nav_box.width - 1}
            >
              {Node}
            </Tree>
          </NavigationContext>
        ) : (
          <div
            id="spinner_wrap"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        )}
      </Root>
      <Gutter
        elHeight={theme.navGutter.height}
        elWidth={theme.nav_box.width - 1}
      />
    </>
  );
};

export const NavigationTree = React.memo(MemoNavigationTree);
