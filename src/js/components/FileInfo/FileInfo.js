import React, { useEffect, useState } from "react";
import { BottomBar } from "../BottomBar";
import { Display } from "../Display";
import { GridTile } from "../GridTile";

import { useModal, useApp, useFullscreenImage, useFileshare } from "@utils";
import { downloadFile, isImage } from "@helpers";
import { TextNode } from "@ui";
import styled from "styled-components";

const H = styled(TextNode).attrs((props) => ({
  variant: "h4",
}))`
  text-align: left;
  margin: 0px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.font1};
`;

const Info = styled(TextNode).attrs((props) => ({
  variant: "p",
}))`
  text-align: left;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${({ theme }) => theme.display_box.width * 0.7 + "px"};

  color: ${({ theme }) => theme.palette.font1};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.palette.surface1};
  padding: 16px;
  margin-left: 16px;
  margin-top: 20px;
  border-radius: 16px;
  min-width: 240px;
  box-shadow: ${({ theme }) => theme.palette.shadow1};
`;

export const FileInfo = () => {
  const {
    current,

    rename,
    getFileUrl,
    share,
    unshare,
    isShared,

    remove,
    isRoot,
  } = useApp();

  const { Modal, openModal } = useModal("modal");

  const { openFullscreen } = useFullscreenImage();

  const handleRename = (value) => {
    rename(current, value);
    openModal();
  };

  return (
    <>
      {current && current.info && (
        <>
          <Display>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",

                width: "100%",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Container>
                <GridTile node={current} getFileUrl={getFileUrl} />
                {[
                  {
                    h: "Name",
                    i: current.id.split("/").pop(),
                  },
                  {
                    h: "Location",
                    i: getFileUrl(current.id),
                  },
                  {
                    h: "Type",
                    i: current.dir
                      ? "directory"
                      : current.id.split("/").pop().split(".").reverse()[0],
                  },
                  {
                    h: !current.dir ? "Size MiB" : "Files",
                    i: !current.dir
                      ? current.info.mb + " " + "(" + current.info.bytes + ")"
                      : current.children.length,
                  },
                  {
                    h: "Created",
                    i: current.info.created,
                  },
                ].map(({ h, i }) => (
                  <React.Fragment key={h}>
                    <H>{h}</H>
                    <Info>{i}</Info>
                  </React.Fragment>
                ))}
              </Container>
            </div>
          </Display>
          <BottomBar>
            {[
              {
                symbol: "download",
                tooltip_title: "Download file",

                events: {
                  onClick: () =>
                    !current.dir && downloadFile(getFileUrl(current.id)),
                },
                disabled: current.dir,
              },
              {
                symbol: "fullscreen",
                tooltip_title: "See image fullscreen",

                events: {
                  onClick: () => {
                    if (current) {
                      isImage(current.id.split("/").pop()) &&
                        openFullscreen(getFileUrl(current.id));
                    }
                  },
                },
                disabled: !isImage(current.id.split("/").pop()),
              },
              {
                symbol: "share",
                tooltip_title: "Share file",

                events: {
                  onClick: () =>
                    !isRoot(current) && isShared(current.id)
                      ? unshare(current.id)
                      : share(current.id),
                },
                disabled: current.dir,
              },
              {
                symbol: "edit",
                tooltip_title: "Rename file or directory",
                events: {
                  onClick: () => !isRoot(current) && openModal(),
                },
                disabled: isRoot(current),
              },
              {
                symbol: "delete",
                events: {
                  onClick: () => !isRoot(current) && remove(current),
                },
                tooltip_title: "Delete file or directory",
                disabled: isRoot(current),
              },
            ]}
          </BottomBar>
          <Modal
            header={`Rename ${current.dir ? "file" : "folder"}`}
            inputProps={{ value: current.id.split("/").pop() }}
            onCancel={() => openModal()}
            onConfirm={handleRename}
          />
        </>
      )}
    </>
  );
};
