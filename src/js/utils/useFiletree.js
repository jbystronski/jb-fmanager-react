import { useMemo, useEffect, useState } from "react";
import { convertToTree, views, apiCall, normalizePath } from "@helpers";

import { useFileshare } from "./useFileshare";
import { useConfig } from "./useConfig";

export const useFiletree = () => {
  const { LIST, UPLOAD, INFO, SHARED } = views;

  const [root, setRoot] = useState(null);
  const [fileTree, setFileTree] = useState(null);
  const [selected, setSelected] = useState([]);
  const [current, setCurrent] = useState(null);
  const [deleteOrigin, setDeleteOrigin] = useState(false);

  const [currentView, setCurrentView] = useState(LIST);
  const { shared, setShared } = useFileshare();
  const { browserOnly, mount, mountAlias, namespace, host } = useConfig();

  useEffect(() => {
    createTree();
  }, []);

  useEffect(() => {
    if (!!fileTree) {
      syncShared();
    }
  }, [fileTree]);

  const getNode = (node, key) =>
    typeof node === "object" && node !== null
      ? node
      : fileTree?.find(node, key);

  const share = (id) => setShared([...shared, getShareObject(id)]);

  const getShareObject = (id) => {
    const n = getNode(id);

    return {
      url: getFileUrl(n),
      key: n[shareKey],
    };
  };

  const shareKey = browserOnly ? "original_id" : "id";

  const unshare = (id) => setShared(shared.filter((n) => n.key !== id));

  const getShared = (id) => shared.find((n) => n.key === id);

  const isShared = (id) => !!getShared(id);

  const getFileUrl = (id) => {
    const n = getNode(id);

    if (!n) return null;

    return normalizePath(
      host,
      mountAlias,
      n[shareKey].split(root?.id).join("")
    );
  };

  const syncShared = async () => {
    const synced = [];

    for (let entry of shared) {
      const node = getNode(entry.key, shareKey);

      if (!node) continue;

      synced.push(getShareObject(node));
    }

    setShared(synced);
  };

  const createTree = async (focusedNode = null) => {
    try {
      const data = await apiCall({
        endpoint: normalizePath(host, namespace, "map"),
        params: {
          path: mount,
        },
      });

      setupTree(focusedNode, data);
    } catch (error) {
      console.error(error);
    }
  };

  const setupTree = async (
    focusedNode = null,
    data = fileTree?.root?.children
  ) => {
    try {
      const [tree, rootNode] = convertToTree(data);

      if (!root) {
        setRoot(rootNode);
      }

      const newCurrent =
        tree.find(
          typeof focusedNode === "string" ? focusedNode : focusedNode?.id
        ) || rootNode;

      setFileTree(tree);
      setCurrent(newCurrent);
    } catch (err) {
      console.error(err);
    }
  };

  const createFolder = async (node, name) => {
    if (isSibling(node, name)) return false;

    let parent = node;

    if (!node.dir) {
      parent = getNode(node.parent_id);
    }

    insertNode(parent, name);

    setupTree(parent);
    setCurrentView(LIST);
    return parent.id;
  };

  const rename = async (treeNode, newName) => {
    const node = getNode(treeNode.id);
    const parent = getNode(node.parent_id);

    if (!node || node.id === root.id || isSibling(parent, newName)) return;

    const newNode = fileTree.insert({
      parentNodeId: parent.id,
      id: parent.id + "/" + newName,
      originalId: node.original_id,
      dir: node.dir,
      info: JSON.parse(JSON.stringify(node.info)),
    });

    if (node.children.length) {
      move(node.children, newNode, false);
    }

    fileTree.remove(node.id);

    browserOnly && setupTree(currentView === LIST ? getNode(parent) : newNode);

    return [node.id, newNode.id, parent];
  };

  function navigate(id, view = null) {
    const views = [INFO, LIST];

    const n = getNode(id);
    setCurrent(n);

    setCurrentView(
      views.includes(view) ? views[views.indexOf(view)] : !n.dir ? INFO : LIST
    );
  }

  const isRoot = (node) =>
    node === root || node?.id === root?.id || selected.includes(root?.id);

  const refresh = () => createTree();

  const handleSetSelected = (id, event) => {
    const cp = selected.slice();
    const idIndex = cp.indexOf(id);

    if (event && event.ctrlKey) {
      idIndex !== -1 ? cp.splice(idIndex) : cp.push(id);
      setSelected(cp);
      return;
    }

    setSelected(selected.length > 1 ? [id] : idIndex === -1 ? [id] : []);
  };

  const isTargetDescendant = (movedNode, targetNode) => {
    if (!targetNode) return false;

    if (targetNode.id === movedNode.id) return true;

    return isTargetDescendant(movedNode, getNode(targetNode.parent_id));
  };

  const isSibling = (parent, name) =>
    !!parent.children.find((c) => c.id.split("/").pop() === name);

  const removeRedundantSelections = (data) => {
    if (!data.length) return [];
    const cp = data.slice().sort();
    let current;
    const dataWithoutDuplicates = [];

    for (let k of cp) {
      if (!k.startsWith(current)) {
        dataWithoutDuplicates.push(k);
        current = k;
      }
    }

    return dataWithoutDuplicates;
  };

  const remove = async (node = null) => {
    let data = node ? [getNode(node).id] : selected.slice();

    if (!data.length) return;
    if (data.includes(root.id)) return;

    data = removeRedundantSelections(data);

    const prefixes = [
      ...new Set(
        data.reduce(
          (acc, next) => [...acc, next.slice(0, next.lastIndexOf("/"))],
          []
        )
      ),
    ];

    for (let id of data) {
      fileTree.remove(id);
    }

    setupTree(prefixes.length === 1 ? getNode(prefixes[0]) : root);

    setSelected([]);
    setCurrentView(LIST);

    return data;
  };

  const removeFalsyNodes = (data, target) => {
    target = getNode(target);

    return data.filter((node) => {
      const n = getNode(node);

      return (
        target.id !== n.id &&
        n.parent_id !== target.id &&
        !isSibling(target, n.id.split("/").pop()) &&
        !isTargetDescendant(n, target)
      );
    });
  };

  const insertNode = (parent, nodeName, dir = true) => {
    parent = getNode(parent);

    const d = new Date();

    fileTree.insert({
      parentNodeId: parent.id,
      id: parent.id + "/" + nodeName,
      dir,
      info: {
        mb: "0.00",
        bytes: "0.00",
        created: `${d.getDate()}.${
          d.getMonth() + 1
        }.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      },
    });
  };

  const move = async (nodeIds, targetNode, deleteOrigin) => {
    for (const n of nodeIds) {
      const el = getNode(n);

      const newId = [targetNode.id, el.id.split("/").pop()].join("/");

      fileTree.insert({
        parentNodeId: targetNode.id,
        id: newId,
        originalId: el.original_id,
        dir: el.dir,
        info: JSON.parse(JSON.stringify(el.info)),
      });

      if (el.children.length) {
        move(el.children, getNode(newId), deleteOrigin);
      }

      deleteOrigin && fileTree.remove(el.id);
    }
  };

  const dropFiles = (src, target) => {
    if (!selected.includes(src)) {
      handleSetSelected(src);
    }

    pasteFiles(target, true);
  };

  const pasteFiles = async (destinationKey, remove = false) => {
    if (!destinationKey || !selected.length) return false;

    const destNode = getNode(destinationKey);

    if (!destNode.dir) return false;

    let paths = removeRedundantSelections(selected, destNode);

    paths = removeFalsyNodes(paths, destNode);

    move(paths, destNode, remove);

    setupTree(destNode.id);
    setCurrentView(LIST);

    if (deleteOrigin) setDeleteOrigin(false);
    if (selected.length) setSelected([]);

    return paths;
  };

  const memoized = useMemo(
    () => ({
      fileTree,
      refresh,
      uploadToTree,
      INFO,
      LIST,
      UPLOAD,
      SHARED,
    }),
    [fileTree]
  );

  const uploadToTree = () => {
    alert("uploading not available in browser only mode");
  };

  return {
    ...memoized,
    createFolder,
    current,
    currentView,
    dropFiles,
    getNode,
    setupTree,
    deleteOrigin,
    setDeleteOrigin,
    getFileUrl,
    handleSetSelected,
    isRoot,
    navigate,
    pasteFiles,
    remove,
    rename,
    root,
    setCurrentView,
    selected,
    isShared,
    share,
    unshare,
    syncShared,
  };
};
