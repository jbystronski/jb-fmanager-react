import React from "react";

import { BottomBar } from "../BottomBar";
import { Display } from "../Display";
import { EmptyDisplay } from "../EmptyDisplay";
import styled from "styled-components";
import { isImage, mediaWidth, normalizePath } from "@helpers";

import {
  useUpload,
  useWindowSize,
  useFullscreenImage,
  useApp,
  useConfig,
} from "@utils";

import { Row, InteractiveIcon, Tooltip } from "@ui";

import { useTheme } from "styled-components";

const UploadContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  > div {
    background: ${({ theme }) => theme.palette.surface5};
    color: ${({ theme }) => theme.palette.font1};
  }

  @media ${mediaWidth("max", 999)} {
    width: 100%;
    height: ${(props) => props.windowHeight * 0.72 + "px" || "auto"};
  }
`;

export const UploadList = () => {
  const { openFullscreen } = useFullscreenImage();
  const {
    queue,
    setQueue,
    attachFile,
    uploadFiles,
    emptyQueue,
    removeFromQueue,
  } = useUpload();

  const { uploadToTree, current } = useApp();
  const { browserOnly, namespace, host, maxUploadSize } = useConfig();

  const { palette } = useTheme();

  const windowSize = useWindowSize();

  const btns = [
    {
      symbol: "attach",
      tooltip_title: "Attach file",
      events: { onClick: () => attachFile() },
    },
    {
      symbol: "upload_up",
      tooltip_title: "Upload all",
      events: {
        onClick: (e) => {
          if (browserOnly) return uploadToTree(e);

          if (!current.parent_id) return;

          const destination =
            current.parent_id === "root" || current.dir
              ? current.id // top folder or child folders
              : current.parent_id; // parent folder

          uploadFiles(
            normalizePath(host, namespace, "upload"),
            destination,
            maxUploadSize
          )
            .then((res) => res?.uploaded.length && uploadToTree())
            .catch(console.error);
        },
      },
    },
    {
      symbol: "delete",
      tooltip_title: "Empty queue",
      events: {
        onClick: () => emptyQueue(),
      },
    },
  ];

  const dropHandler = (e) => {
    e.preventDefault();

    const filesArr = [];

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          filesArr.push(file);
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        filesArr.push(file);
      });
    }

    if (filesArr.length) {
      setQueue([...queue, ...filesArr]);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Display
        draggable="true"
        windowHeight={windowSize.height}
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
      >
        <UploadContainer>
          {!queue.length ? (
            <EmptyDisplay icon="upload_up" message="Upload queue is empty" />
          ) : (
            queue.map((file, index) => {
              return (
                <Row
                  name={file.name}
                  key={file.name + index}
                  nodeChildren={[]}
                  imgSrc={isImage(file.name) ? URL.createObjectURL(file) : null}
                >
                  <span>
                    {isImage(file.name) && (
                      <InteractiveIcon
                        symbol="fullscreen"
                        tooltip_title="view fullscreen"
                        color={palette.secondary}
                        events={{
                          onClick: () => {
                            const img = URL.createObjectURL(file);
                            openFullscreen(img);
                          },
                        }}
                      />
                    )}

                    <span style={{ marginLeft: "6px" }}>
                      <InteractiveIcon
                        color={palette.secondary}
                        symbol="close"
                        tooltip_title="remove from queue"
                        events={{
                          onClick: (e) => removeFromQueue(e, file),
                        }}
                      />
                    </span>
                  </span>
                </Row>
              );
            })
          )}
        </UploadContainer>
        <Tooltip />
      </Display>
      <BottomBar>{btns}</BottomBar>
    </>
  );
};
