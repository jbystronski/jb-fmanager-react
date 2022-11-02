export const downloadFile = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      responseType: "blob",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", url.split("/").reverse()[0]);
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};
