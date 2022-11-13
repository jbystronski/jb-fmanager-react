import { useFiletree } from "./useFiletree";
import { useConfig } from "./useConfig";
import { apiCall, views, normalizePath } from "@helpers";

export const useFilesystem = () => {
  const { LIST } = views;
  const tree = useFiletree();
  const { namespace, host } = useConfig();

  const createFolder = async (node, name) => {
    try {
      const path = await tree.createFolder(node, name);

      if (!path) return;

      await apiCall({
        endpoint: normalizePath(host, namespace, "create_folder"),
        params: {
          path,
          name,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (node = null) => {
    try {
      const body = await tree.remove(node);

      if (!body || !body.length) return;

      await apiCall({
        endpoint: normalizePath(host, namespace, "remove"),
        method: "post",
        body,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rename = async (node, name) => {
    const values = await tree.rename(node, name);

    if (values && Array.isArray(values)) {
      const [oldPath, newPath, parent] = values;
      if (!oldPath || !newPath) return;

      try {
        await apiCall({
          endpoint: normalizePath(host, namespace, "rename"),
          params: { oldPath, newPath },
        });

        tree.setupTree(
          tree.getNode(tree.currentView === LIST ? parent : newPath)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const pasteFiles = async (target, deleteOrigin = false) => {
    try {
      const body = await tree.pasteFiles(target, deleteOrigin);

      if (!body || !body.length) return;

      await apiCall({
        endpoint: normalizePath(
          host,
          namespace,
          deleteOrigin ? "move" : "copy"
        ),

        params: {
          target,
        },
        method: "post",
        body,
      });

      tree.setupTree(tree.getNode(target));
    } catch (error) {
      console.error(error);
    }
  };

  const dropFiles = (src, target) => {
    if (!tree.selected.includes(src)) {
      tree.handleSetSelected(src);
    }

    pasteFiles(target, true);
  };

  const uploadToTree = (e) => {
    tree.refresh();
  };

  const fs = {
    createFolder,
    remove,
    rename,
    pasteFiles,

    uploadToTree,
    dropFiles,
  };

  return {
    ...tree,
    ...fs,
  };
};
