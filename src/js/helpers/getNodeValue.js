const parseValue = (str) => str.split("/").reverse()[0];

export function getNodeValue(node) {
  if (!node) return false;

  if (typeof node === "string") return parseValue(node);

  if (typeof node === "object" && node.hasOwnProperty("id"))
    return parseValue(node.id);
}
