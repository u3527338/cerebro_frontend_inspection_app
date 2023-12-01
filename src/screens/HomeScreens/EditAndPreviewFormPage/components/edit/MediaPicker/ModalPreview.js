import { memo } from "react";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import Carousel from "react-native-reanimated-carousel";
import FilePreview from "./FilePreview";

const ModalPreview = ({
  isVisible,
  onBackdropPress,
  files,
  previewFile,
  setPreviewFile,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Carousel
        width={Dimensions.get("window").width * 0.9}
        height={Dimensions.get("window").height * 0.7}
        data={files}
        defaultIndex={previewFile}
        onSnapToItem={setPreviewFile}
        loop={false}
        renderItem={({ index }) => <FilePreview uri={files[index].uri} />}
        style={{
          borderRadius: 8,
          backgroundColor: "black",
        }}
      />
    </Modal>
  );
};

export default memo(ModalPreview);
