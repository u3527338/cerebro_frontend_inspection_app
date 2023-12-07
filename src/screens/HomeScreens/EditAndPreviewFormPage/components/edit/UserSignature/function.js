import * as FileSystem from "expo-file-system";

export const imageType = "png";

const uploadSignature = async (localSignaturePath, uploadFileMutate) => {
  if (!localSignaturePath) return;

  const file = await FileSystem.getInfoAsync(localSignaturePath, {
    size: true,
    md5: true,
  });

  return await uploadFileMutate({
    data: [file],
    params: { storage_path: "signature" },
  });
};

export default uploadSignature;
