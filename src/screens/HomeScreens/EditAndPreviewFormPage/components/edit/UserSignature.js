import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import _ from "lodash";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Modal from "react-native-modal";
import SignatureScreen from "react-native-signature-canvas";
import uuid from "react-native-uuid";
import LoadingComponent from "../../../../../components/common/LoadingComponent";
import { AuthContext } from "../../../../../context/authContext";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
import primary from "../../../../../themes/colors/primary";

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
          imageType="image/png"
        />
      </Box>
    </Modal>
  );
};

const UserSignature = ({ control, detail }) => {
  const { full_name } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signature, setSignature] = useState(null);
  const { uploadFile, getFileFromId, deleteFileById } = useDefaultAPI();

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value = [] } }) => {
        const handleSignature = async (signature) => {
          setLoading(true);
          setOpen(false);
          const path = `${FileSystem.cacheDirectory}${uuid.v4()}.png`;
          FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
          )
            .then((res) => {
              FileSystem.getInfoAsync(path, { size: true, md5: true })
                .then((file) => {
                  const payload = {
                    file_name: file.uri.split("/").pop(),
                    file_type: "image/png",
                    size: file.size,
                  };
                  const fileObj = {
                    name: file.uri.split("/").pop(),
                    type: "image/png",
                    uri: file.uri,
                    size: file.size,
                  };
                  uploadFile(payload, { storage_path: "signature" })
                    .then((response) => {
                      setSignature(response.data.path);
                      onChange([response.data.file, full_name]);
                      const gcs_upload_path = response.data.signed_url;
                      fetch(gcs_upload_path, {
                        method: "PUT",
                        body: fileObj,
                        headers: {
                          "Content-Type": "image/png",
                        },
                      })
                        .catch((err) => setError(err.message))
                        .finally(() => {
                          setLoading(false);
                        });
                    })
                    .catch((err) => setError(err.message));
                })
                .catch((err) => setError(err.message));
            })
            .catch((err) => {
              setError(err.message);
            });
        };

        const handleClearSignature = () => {
          deleteFileById(value[0])
            .then((response) => {
              onChange([]);
            })
            .catch((err) => alert("Delete Signature Error"));
        };

        useEffect(() => {
          if (!value[0]) {
            setSignature(null);
            return;
          }
          getFileFromId(value[0]).then((result) =>
            setSignature(result.data.path)
          );
        }, [value]);

        return (
          <>
            {loading ? (
              <Center h={60}>
                <LoadingComponent />
              </Center>
            ) : error ? (
              <Text fontSize={12} color="red.400">
                {error}
              </Text>
            ) : signature ? (
              <VStack>
                <Box
                  h={100}
                  w={160}
                  borderColor="baseColor.300"
                  borderRadius="sm"
                  borderWidth={1}
                >
                  <Image
                    source={{ uri: signature }}
                    h="100%"
                    w="100%"
                    resizeMode="contain"
                    zIndex={1}
                    alt={"Cannot load image"}
                  />
                </Box>
                <HStack space={2} pt={2}>
                  <Pressable
                    onPress={() => {
                      console.log("save as default signature");
                    }}
                    bgColor="primary.400"
                    borderRadius={4}
                    disabled={detail.disabled}
                    _disabled={{ opacity: 0.7 }}
                  >
                    <Text color="white" p={2}>
                      SAVE
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={handleClearSignature}
                    bgColor="primary.400"
                    borderRadius={4}
                    disabled={detail.disabled}
                    _disabled={{ opacity: 0.7 }}
                  >
                    <Text color="white" p={2}>
                      CLEAR
                    </Text>
                  </Pressable>
                </HStack>
              </VStack>
            ) : (
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  bold
                  color="baseColor.400"
                >
                  Signature
                </Text>

                <Pressable
                  borderRadius={8}
                  _pressed={{ backgroundColor: primary[100] }}
                  _disabled={{ opacity: 0.3 }}
                  disabled={detail.disabled}
                  onPress={() => {
                    setOpen(true);
                  }}
                >
                  <Ionicons name="add-outline" size={20} color="gray" />
                </Pressable>
              </HStack>
            )}

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
