import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal as UiModal } from "../ui";

import { usePortal } from "../utils";

export const useModal = (anchorTag) => {
  const [open, setOpen] = useState(false);

  const { invokePortal, revokePortal } = usePortal(anchorTag);

  const openModal = (e) => {
    if (open) {
      revokePortal();
    }
    setOpen(!open);
  };

  const handleClose = (e) => {
    setOpen(false);
    revokePortal();
  };

  const Modal = (props) => {
    const handleConfirm = (value) => {
      props.onConfirm(value);
      revokePortal();
    };

    return (
      <>
        {open
          ? createPortal(
              <UiModal
                onClose={handleClose}
                onConfirm={handleConfirm}
                header={props.header}
                subheader={props.subheader}
                inputProps={props.inputProps}
              />,
              invokePortal()
            )
          : null}
      </>
    );
  };

  return { Modal, openModal };
};
