export const isImage = (uri) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const extension = uri.substring(uri.lastIndexOf(".")).toLowerCase();
  return imageExtensions.includes(extension);
};
