import React from "react";
import { useDragAndDrop, useApp } from "@utils";

export const DragBoard = (props) => {
  const [{ onDragEnd, onDragOver }, dropEvent] = useDragAndDrop();
  const { current, dropFiles } = useApp();

  return (
    <div
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      draggable="true"
      onDrop={(e) =>
        dropEvent(e, (src) => {
          dropFiles(src, current.id);
        })
      }
    >
      {props.children}
    </div>
  );
};
