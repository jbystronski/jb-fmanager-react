import { useTheme } from "styled-components";

export const usePortal = (anchorTag, stackIndex) => {
  const t = useTheme();

  const invokePortal = () => {
    let portal = document.getElementById(anchorTag);

    if (!portal) {
      portal = document.createElement("div");

      portal.setAttribute("id", anchorTag);
      portal.setAttribute(
        "style",
        `position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: ${
          t !== undefined ? t.stackIndex : stackIndex
        };`
      );
      document.body.appendChild(portal);
    }

    return portal;
  };

  const revokePortal = () => {
    document.querySelectorAll(`#${anchorTag}`).forEach((e) => e.remove());
  };

  return { invokePortal, revokePortal };
};
