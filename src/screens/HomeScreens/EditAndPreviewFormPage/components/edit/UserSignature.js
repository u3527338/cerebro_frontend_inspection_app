import { Box, HStack, Pressable, ScrollView, Text } from "native-base";
import { memo, useContext, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import SignatureScreen from "react-native-signature-canvas";
import primary from "../../../../../themes/colors/primary";
import secondary from "../../../../../themes/colors/secondary";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import Modal from "react-native-modal";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
import axios from "axios";
import { API_upload_signature } from "../../../../../global/constants";
import { AuthContext } from "../../../../../context/authContext";

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
    height: 73%;
    margin: 5%;
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
      <Box h={"80%"} bg={"white"} py={7} px={9}>
        <SignatureScreen
          ref={ref}
          onOK={callback}
          webStyle={style}
          rotated={true}
          // descriptionText={"Signature Pad"}
          descriptionText={label}
        />
      </Box>
    </Modal>
  );
};
const UserSignature = ({ control, detail }) => {
  const [open, setOpen] = useState(false);
  const { token, default_project } = useContext(AuthContext);

  const { uploadSignature } = useDefaultAPI();

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        const handleSignature = (signature) => {
          uploadSignature({
            signature: signature,
            directory: "signature/uploaded_signature",
          }).then((response) => {
            console.log(response);
            // onChange(response.data);
          });
          // axios
          //   .post(
          //     API_upload_signature,
          //     {
          //       signature: signature,
          //       directory: "signature/uploaded_signature",
          //     },
          //     {
          //       headers: {
          //         "Content-Type": "application/json",
          //         Authorization: `Token ${token}`,
          //       },
          //       // params: params,
          //     }
          //   )
          //   .then((response) => console.log(response));
        };

        return (
          <>
            <HStack justifyContent="space-between" alignItems={"center"}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                bold
                color="baseColor.400"
              >
                {_.startCase(detail.session)}
              </Text>

              <Pressable
                borderRadius={8}
                _pressed={{ backgroundColor: primary[100] }}
                onPress={() => {
                  setOpen(true);
                }}
              >
                <Ionicons name="add-outline" size={24} color="gray" />
              </Pressable>
            </HStack>

            <SignatureModal
              callback={handleSignature}
              open={open}
              closeSignature={() => setOpen(false)}
              label={detail.session}
            />
          </>
        );
      }}
    />
  );
};

export default memo(UserSignature);
