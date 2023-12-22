import { Box } from "native-base";
import Modal from "react-native-modal";
import LibraryBrowser from "../../../../LibraryPage/LibraryBrowser";

const LibraryBrowserModal = ({
  isOpen,
  onClose,
  handlePickImage,
  defaultRoute,
}) => {
  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      propagateSwipe={true}
    >
      <Box
        justifyContent={"center"}
        h={"85%"}
        bg={"baseColor.600"}
        borderRadius={16}
        p={2}
      >
        <LibraryBrowser
          pickImage
          defaultRoute={defaultRoute}
          handlePickImage={(path) => {
            handlePickImage(path);
            onClose();
          }}
        />
      </Box>
    </Modal>
  );
};

export default LibraryBrowserModal;
