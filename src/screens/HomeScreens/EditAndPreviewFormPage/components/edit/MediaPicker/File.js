import { Pressable } from "native-base";
import { memo } from "react";
import { isImage } from "../../../../../../global/function";
import { DeleteBadge, PdfLogo } from "./Custom";
import FilePreview from "./FilePreview";

const File = ({ file, handlePreviewFile, handleDeleteLocalFile, status }) => {
  return (
    <Pressable onPress={handlePreviewFile}>
      {status.editable && (
        <DeleteBadge
          disabled={status.disabled}
          handleDeleteFile={handleDeleteLocalFile}
        />
      )}
      {isImage(file.data.uri) ? (
        <FilePreview
          uri={file.data.uri}
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
