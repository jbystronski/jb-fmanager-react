const getBody = (data) => (data ? { body: JSON.stringify(data) } : null);

const getHeaders = (data) => (data ? { headers: data } : null);

const getParams = (data) => {
  const paramsArray = [];

  if (data) {
    for (const [k, v] of Object.entries(data)) {
      paramsArray.push(`${k}=${v}`);
    }
  }

  return !paramsArray.length ? "" : "?" + paramsArray.join("&");
};

export const apiCall = ({
  method = "GET",
  body,
  endpoint,
  headers = {
    "Content-type": "application/json",
  },
  params,
}) =>
  fetch(endpoint + getParams(params), {
    method,
    ...getHeaders(headers),
    ...getBody(body),
  })
    .then((res) => res.json())
    .catch(console.error);
