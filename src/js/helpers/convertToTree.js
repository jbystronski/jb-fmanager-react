import { Tree } from "./tree";
import { Node } from "./tree";

export function convertToTree(arr, focus = null) {
  function convertToNodes(data, parent, container = []) {
    data &&
      data.forEach((el) => {
        const n = new Node({
          id: el.id,
          tracker: Symbol(),
          original_id: el.original_id,
          parent_id: parent.id,
          dir: el.dir,
          info: el.info,
        });

        n.children =
          el.hasOwnProperty("children") && el.children
            ? convertToNodes(el.children, n)
            : [];

        container.push(n);
      });

    return container;
  }

  const tree = new Tree("root");
  const root = tree.find("root");
  root.children = convertToNodes(arr, root);

  return [tree, root.children[0]];
}

export default convertToTree;
