import { Center, HStack, ScrollView, Text } from "native-base";
import { memo } from "react";
import LoadingComponent from "../../../../../../components/common/LoadingComponent";
import File from "./File";

const FileGallery = ({
  files,
  handlePreviewFile,
  handleDeleteLocalFile,
  status,
  loading,
}) => {
  if (loading)
    return (
      <Center py={4}>
        <LoadingComponent />
      </Center>
    );

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
            handleDeleteLocalFile={() => handleDeleteLocalFile(file, index)}
            status={status}
          />
        ))}
      </HStack>
    </ScrollView>
  );
};

export default memo(FileGallery);
