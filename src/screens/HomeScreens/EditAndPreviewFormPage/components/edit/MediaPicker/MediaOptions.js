import { Actionsheet } from "native-base";
import { memo } from "react";

const MediaOptions = ({
  isOpen,
  onClose,
  handleLaunchImageGallery,
  handleLaunchDocumentLibrary,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item onPress={handleLaunchImageGallery}>
          Image
        </Actionsheet.Item>
        <Actionsheet.Item onPress={handleLaunchDocumentLibrary}>
          Document
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(MediaOptions);
