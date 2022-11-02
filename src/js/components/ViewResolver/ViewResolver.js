import { useApp } from "@utils";
import React from "react";

import { SharedFiles } from "../SharedFiles";
import { FilesScreen } from "../FilesScreen";
import { FileInfo } from "../FileInfo";
import { UploadList } from "../UploadList";

export const ViewResolver = () => {
  const { currentView, INFO, SHARED, UPLOAD, LIST, SETTINGS } = useApp();

  const is = (view) => currentView === view;

  switch (true) {
    case is(UPLOAD):
      return <UploadList />;
    case is(INFO):
      return <FileInfo />;
    case is(LIST):
      return <FilesScreen />;
    case is(SHARED):
      return <SharedFiles />;
  }
};
