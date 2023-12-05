import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";

const FileType = {
  IMAGE: "image",
  PDF: "pdf",
};

const MIME_TYPE = {
  image: "image/jpeg",
  pdf: "application/pdf",
};

const isImage = (uri) => uri.includes(".jpeg");

const uploadFile = (files, uploadFileMutate, uploadGcsPathMutate) => {
  files.map(async (file) => {
    const type = isImage(file.uri) ? FileType.IMAGE : FileType.PDF;
    let payload = {
      file_name: file.uri.split("/").pop(),
      file_type: MIME_TYPE[type],
      size: file.size,
    };
    let fileObj = {
      uri: file.uri,
      name: file.uri.split("/").pop(),
      type: MIME_TYPE[type],
      size: file.size,
    };

    if (isImage(file.uri)) {
      try {
        const result = await manipulateAsync(file.uri, [
          {
            resize: {
              width: 960,
              height: (960 * file.height) / file.width,
            },
          },
        ]);

        const info = await FileSystem.getInfoAsync(result.uri);
        payload = { ...payload, size: info.size };
        fileObj = { ...fileObj, uri: info.uri, size: info.size };
      } catch (error) {
        console.error(error);
      }
    }

    uploadFileMutate(
      { data: payload },
      {
        onSuccess: (data) => {
          uploadGcsPathMutate({
            url: data.signed_url,
            body: fileObj,
            type: MIME_TYPE[type],
          });
        },
      }
    );
  });
};

export default uploadFile;
