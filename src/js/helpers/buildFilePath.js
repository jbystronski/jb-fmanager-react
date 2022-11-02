export const buildFilePath = (node, tree, container = []) => {
  if (!node) return;

  container.push({
    id: node.id,
    dir: node.dir,
    value: node.id.split("/").pop(),
  });
  if (node.parent_id) {
    return buildFilePath(tree.find(node.parent_id), tree, container);
  }

  return container.reverse();
};
