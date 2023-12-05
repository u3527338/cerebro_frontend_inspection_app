import * as FileSystem from "expo-file-system";

const imageType = "png";

const uploadSignature = (
  localSignaturePath,
  uploadFileMutate,
  uploadGcsPathMutate
) => {
  FileSystem.getInfoAsync(localSignaturePath, { size: true, md5: true })
    .then((file) => {
      const payload = {
        file_name: file.uri.split("/").pop(),
        file_type: `image/${imageType}`,
        size: file.size,
      };
      const fileObj = {
        name: file.uri.split("/").pop(),
        type: `image/${imageType}`,
        uri: file.uri,
        size: file.size,
      };
      uploadFileMutate(
        {
          data: payload,
          params: { storage_path: "signature" },
        },
        {
          onSuccess: (data) => {
            uploadGcsPathMutate({
              url: data.signed_url,
              body: fileObj,
            });
          },
        }
      );
    })
    .catch((err) => setError(err.message));
};

export default uploadSignature;
