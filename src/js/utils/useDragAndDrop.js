import { useState } from "react";

export const useDragAndDrop = (anchorTag) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [dragKey, setDragKey] = useState(null);

  const dragEvents = {
    draggable: true,

    onDragStart: (e) => {
      e.dataTransfer.setData("id", dragKey.split("/").slice(0, -1).join("/"));
    },

    onDrag: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },

    onDragEnter: (e) => {},
    onDragLeave: (e) => {
      setIsDraggedOver(false);
    },
    onDragEnd: (e) => {
      setIsDraggedOver(false);
    },
    onDragOver: (e) => {
      if (!isDraggedOver) {
        setIsDraggedOver(true);
      }

      e.preventDefault();
    },
  };

  const onDrop = (e, onDropCallback) => {
    e.preventDefault();

    setIsDraggedOver(false);

    const origin = e.dataTransfer.getData("id");

    if (origin === dragKey) return false;

    onDropCallback(origin, dragKey, e);
  };

  return [dragEvents, onDrop, isDraggedOver, setDragKey];
};
