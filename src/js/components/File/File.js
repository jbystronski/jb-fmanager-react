import React, { useState, useEffect } from "react";

import {
  useFullscreenImage,
  useApp,
  useClickPreventionOnDoubleClick,
  useDragAndDrop,
  useModal,
  useContextMenu,
} from "@utils";
import { isImage, addProps, downloadFile } from "@helpers";

export const File = ({ node, contextMenuOptions, ...props }) => {
  const { ContextMenu, openMenu } = useContextMenu();

  const { Modal, openModal } = useModal("modal");
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onSingleClick,
    onDoubleClick
  );
  const {
    navigate,

    remove,
    isRoot,

    handleSetSelected,
    selected,
    deleteOrigin,
    setDeleteOrigin,
    rename,
    getFileUrl,

    isShared,
    share,
    unshare,

    dropFiles,
    pasteFiles,
  } = useApp();

  const [dragEvents, dropEvent, isDraggedOver, setDragKey] = useDragAndDrop(
    "fm-draggable-element"
  );
  const { openFullscreen } = useFullscreenImage();
  const [fileRenameModal, setFileRenameModal] = useState(false);

  useEffect(() => {
    if (node.id) {
      setDragKey(node.id);
    }
  }, [node.id]);

  const handleKeyDown = (e) => {
    if (e.code === "Delete") remove();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const handleRename = (value) => {
    setFileRenameModal(false);
    rename(node, value);
  };

  function onSingleClick({ id, event }) {
    handleSetSelected(id, event);
  }

  function onDoubleClick({ id, event }) {
    if (isImage(id)) {
      openFullscreen(getFileUrl(id));
    }

    navigate(id);
  }

  const handlers = {
    ...dragEvents,
    onDrop: (e) =>
      dropEvent(e, (src, target, e) => {
        dropFiles(src, target);
      }),
    onClick: (e) => handleClick({ id: node.id, event: e }),
    onDoubleClick: (e) => handleDoubleClick({ id: node.id, event: e }),
    // onClick: (e) => passClickEvent(node.id, node.children, e),
    onContextMenu: (e) => {
      e.stopPropagation();

      openMenu(e);
    },
  };

  const availableCtxMenuOptions = [
    {
      name: "paste",
      title: "Paste",
      icon: "paste",
      onClick: () => pasteFiles(node.id, deleteOrigin),

      disabled: !selected.length,
    },
    {
      name: "copy",
      title: "Copy",
      icon: "copy",
      onClick: () => setDeleteOrigin(false),
      disabled: !selected.length || isRoot(node),
    },
    {
      name: "cut",
      title: "Cut",
      icon: "cut",
      onClick: () => setDeleteOrigin(true),
      disabled: !selected.length || isRoot(node),
    },
    {
      name: "share_file",
      title: isShared(node.id) ? "Unshare" : "Share",
      icon: "share",
      onClick: () => (isShared(node.id) ? unshare(node.id) : share(node.id)),
      disabled: node.dir,
    },
    {
      name: "delete_file",
      title: "Delete",
      icon: "delete",
      onClick: () => remove(),
      disabled: isRoot(node) || !selected.length || !selected.includes(node.id),
    },
    {
      name: "download_file",
      title: "Download file",
      icon: "download",
      onClick: () => !node.dir && downloadFile(getFileUrl(node.id)),
      disabled: node.dir,
    },
    {
      name: "rename_file",
      title: "Rename...",
      icon: "edit",
      onClick: () => {
        setFileRenameModal(true);
        openModal();
      },
      disabled: isRoot(node),
    },
  ];

  if (!props.children) return null;

  return (
    <>
      {addProps(props.children, {
        handlers: handlers,
        node: node,
        isDraggedOver,
      })}
      <ContextMenu
        options={
          contextMenuOptions === "*"
            ? availableCtxMenuOptions
            : availableCtxMenuOptions.filter((ob) =>
                contextMenuOptions.includes(ob["name"])
              )
        }
      />

      {fileRenameModal && (
        <Modal
          header={`Rename ${node.dir ? "folder" : "file"}`}
          inputProps={{ value: node.id.split("/").pop() }}
          onCancel={() => openModal()}
          onConfirm={handleRename}
        />
      )}
    </>
  );
};
