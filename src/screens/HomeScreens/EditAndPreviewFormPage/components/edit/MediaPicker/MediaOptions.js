import { Actionsheet } from "native-base";
import { memo } from "react";

const MediaOptions = ({
  isOpen,
  onClose,
  handleLaunchImageGallery,
  handleLaunchDocumentLibrary,
  options,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          disabled={options && !options?.includes("photo")}
          onPress={handleLaunchImageGallery}
        >
          Image
        </Actionsheet.Item>
        <Actionsheet.Item
          disabled={options && !options?.includes("pdf")}
          onPress={handleLaunchDocumentLibrary}
        >
          Document
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(MediaOptions);
