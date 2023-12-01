import { HStack, ScrollView, Text } from "native-base";
import { memo } from "react";
import File from "./File";

const FileGallery = ({
  files,
  handlePreviewFile,
  handleDeleteLocalFile,
  updateId,
  status,
}) => {
  if (files.length === 0)
    return (
      <Text bold color="secondary.400">
        No File
      </Text>
    );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack space={6} pr={10}>
        {files.map((file, index) => (
          <File
            key={index}
            file={file}
            handlePreviewFile={() => {
              handlePreviewFile(index);
            }}
            updateId={(id) => updateId(index, id)}
            handleDeleteLocalFile={handleDeleteLocalFile}
            status={status}
          />
        ))}
      </HStack>
    </ScrollView>
  );
};

export default memo(FileGallery);
