const stripEdgeSlashes = (str) => {
  str = str.startsWith("/") ? str.slice(1) : str;
  str = str.endsWith("/") ? str.slice(0, -1) : str;
  return str;
};

export const normalizePath = (host, ...args) => {
  let parts = host.split("//");
  let protocol = "http://";
  let domain;

  if (parts.length > 1) {
    protocol = parts[0] + "//";
    domain = parts[1];
  } else {
    domain = host;
  }

  return (
    protocol +
    stripEdgeSlashes(domain) +
    args
      .filter((a) => !!a)
      .map(stripEdgeSlashes)
      .map((arg) => "/" + arg)
      .join("")
  );
};
