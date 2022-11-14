const extensions = [
  "webp",
  "avif",
  "jpg",
  "png",
  "jpeg",
  "tif",
  "gif",
  "tiff",
  "bmp",
  "svg",
];

export const isImage = (path) => {
  return extensions.includes(path.split(".").reverse()[0].toLowerCase());
};
