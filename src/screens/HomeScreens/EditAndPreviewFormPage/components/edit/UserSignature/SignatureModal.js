import _ from "lodash";
import { Box } from "native-base";
import { memo, useRef } from "react";
import Modal from "react-native-modal";
import SignatureScreen from "react-native-signature-canvas";

const imageType = "png";

const SignatureModal = ({ open, callback, closeSignature, label }) => {
  const ref = useRef();

  const style = `.m-signature-pad--footer
  .button {
    background-color: white;
    color: #000;
  }
  .m-signature-pad {
    font-size: 10px;
    width: 90%;
    height: 80%;
    margin-left: 5%;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  }
  `;

  return (
    <Modal
      isVisible={open}
      style={{ justifyContent: "center", margin: 0 }}
      onSwipeComplete={closeSignature}
      onBackdropPress={closeSignature}
      propagateSwipe={true}
    >
      <Box h="80%" bg="white" py={1} pr={6}>
        <SignatureScreen
          ref={ref}
          onOK={callback}
          webStyle={style}
          rotated={true}
          descriptionText={_.startCase(label)}
          imageType={`image/${imageType}`}
        />
      </Box>
    </Modal>
  );
};

export default memo(SignatureModal);
