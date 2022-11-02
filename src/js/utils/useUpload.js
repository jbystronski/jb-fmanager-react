import { useState } from "react";

export const useUpload = () => {
  const [queue, setQueue] = useState([]);

  const addToQueue = (e) => {
    setQueue(
      Object.values(e.target.files).reduce(
        (acc, curr) => [...acc, curr],
        queue.slice()
      )
    );
  };

  const removeFromQueue = (e, file) => {
    const q = queue.slice();

    const index = q.indexOf(file);

    if (index !== -1) {
      q.splice(index, 1);
    }
    setQueue(q);
  };

  const emptyQueue = () => setQueue([]);

  const attachFile = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("multiple", "");

    input.addEventListener("change", addToQueue);

    input.click();
  };

  const uploadFiles = async (endpoint, targetPath, maxFileSize) => {
    try {
      if (!queue.length) return;

      const fData = new FormData();

      queue.forEach((file) => fData.append("files", file));

      const response = await fetch(
        `${endpoint}?destination=${targetPath}&max_size=${maxFileSize}`,
        {
          method: "POST",

          body: fData,
        }
      );

      const fromJson = response.json();

      const q = queue.slice();

      q.length = 0;
      setQueue(q);

      return fromJson;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    queue,
    setQueue,
    addToQueue,
    removeFromQueue,
    emptyQueue,
    attachFile,
    uploadFiles,
  };
};
