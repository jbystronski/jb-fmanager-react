import { isImage } from "./isImage";

export const resolveFileIcon = (string, hasChildren, isOpen, isFolder) => {
  // hardcoded material icons, for now

  if (isFolder) {
    if (!hasChildren) return "folder";

    return isOpen ? "folder_open" : "folder";
  }

  const parts = string.split("/").pop().split(".");

  const ext = parts.reverse()[0];

  if (isImage(ext)) return "image_file";

  const matches = {
    css: "code_file",
    js: "code_file",
    pdf: "pdf_file",
    zip: "zip_file",
    mp4: "video_file",
  };

  return ext in matches ? matches[ext] : "file_default";
};
