import _ from "lodash";

export const isImage = (uri) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  // const extension = uri.substring(uri.lastIndexOf(".")).toLowerCase();
  // return imageExtensions.includes(extension);
  return _.some(imageExtensions, (extension) => _.includes(uri, extension));
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

export const setDefaultValues = (template) =>
  _.fromPairs(
    template
      ?.filter((item) => !["text", "textfold"].includes(item.type))
      ?.map((item) => [item.key, item.preset || ""])
  );
