import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import { Pressable } from "native-base";
import { memo, useEffect } from "react";
import useDefaultAPI from "../../../../../../hocks/useDefaultAPI";
import { CustomLoading, DeleteBadge, PdfLogo } from "./Custom";
import FilePreview from "./FilePreview";

// const FileType = {
//   IMAGE: "image",
//   PDF: "pdf",
// };

// const MIME_TYPE = {
//   image: "image/jpeg",
//   pdf: "application/pdf",
// };

const isImage = (uri) => uri.includes(".jpeg");

const File = ({
  file,
  handlePreviewFile,
  handleDeleteLocalFile,
  // updateId,
  status,
}) => {
  // const type = isImage(file.uri) ? FileType.IMAGE : FileType.PDF;
  // const {
  //   useUploadFileMutation,
  //   useUploadGCSPathMutation,
  //   useDeleteFileMutation,
  // } = useDefaultAPI();
  // const {
  //   mutate: uploadFileMutate,
  //   isPending: uploadPending,
  //   error: uploadError,
  // } = useUploadFileMutation();
  // const {
  //   mutate: uploadGcsPathMutate,
  //   isPending: gcsPending,
  //   error: gcsError,
  // } = useUploadGCSPathMutation();
  // const {
  //   mutate: deleteFileMutate,
  //   isPending: deletePending,
  //   error: deleteError,
  // } = useDeleteFileMutation((response) => console.log("delete success"));

  // const uploadFile = async () => {
  //   let payload = {
  //     file_name: file.uri.split("/").pop(),
  //     file_type: MIME_TYPE[type],
  //     size: file.size,
  //   };
  //   let fileObj = {
  //     uri: file.uri,
  //     name: file.uri.split("/").pop(),
  //     type: MIME_TYPE[type],
  //     size: file.size,
  //   };

  //   if (isImage(file.uri)) {
  //     try {
  //       const result = await manipulateAsync(file.uri, [
  //         {
  //           resize: {
  //             width: 960,
  //             height: (960 * file.height) / file.width,
  //           },
  //         },
  //       ]);

  //       const info = await FileSystem.getInfoAsync(result.uri);
  //       payload = { ...payload, size: info.size };
  //       fileObj = { ...fileObj, uri: info.uri, size: info.size };
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   uploadFileMutate(
  //     { data: payload },
  //     {
  //       onSuccess: (data) => {
  //         updateId(data.file); // unnecessary for one-time submit
  //         uploadGcsPathMutate({
  //           url: data.signed_url,
  //           body: fileObj,
  //           type: MIME_TYPE[type],
  //         });
  //       },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   uploadFile(isImage(file.uri) ? FileType.IMAGE : FileType.PDF);
  // }, []);

  // if (uploadPending || gcsPending) return <CustomLoading loading />;

  // if (uploadError || gcsError) return <CustomLoading error />;

  // if (deletePending) return <CustomLoading deleting />;

  return (
    <Pressable onPress={handlePreviewFile}>
      {status.editable && (
        <DeleteBadge
          // disabled={deletePending || status.disabled}
          disabled={status.disabled}
          handleDeleteFile={() => {
            handleDeleteLocalFile(file);
            // deleteFileMutate(file.id);
          }}
        />
      )}
      {isImage(file.uri) ? (
        <FilePreview
          uri={file.uri}
          size={{
            height: 100,
            width: 100,
          }}
        />
      ) : (
        <PdfLogo
          style={{
            h: "100px",
            w: "100px",
            borderColor: "red.400",
            borderWidth: 1,
            borderRadius: "md",
            borderStyle: "dashed",
            backgroundColor: "red.100",
          }}
        />
      )}
    </Pressable>
  );
};

export default memo(File);
