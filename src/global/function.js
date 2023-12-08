export const isImage = (uri) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const extension = uri.substring(uri.lastIndexOf(".")).toLowerCase();
  return imageExtensions.includes(extension);
};

export const isSignature = (uri) => {
  return (
    typeof uri === "string" &&
    uri.substring(0, uri.lastIndexOf(".")).endsWith("signature")
  );
};

export const filesToBeUploaded = (data) => {
  const filesArr = [];
  Object.keys(data)
    .filter((key) => !!data[key]?.uploadRequired)
    .map(async (key) => {
      filesArr.push({ key, file: data[key].data });
    });
  return filesArr;
};
