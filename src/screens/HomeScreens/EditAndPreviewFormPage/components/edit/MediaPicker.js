import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from "native-base";
import { memo, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import Carousel from "react-native-reanimated-carousel";
import { WebView } from "react-native-webview";
import LoadingComponent from "../../../../../components/common/LoadingComponent";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";

const FileType = {
  IMAGE: "image",
  PDF: "pdf",
};

const MIME_TYPE = {
  image: "image/jpeg",
  pdf: "application/pdf",
};

const PdfPreview = ({ uri }) => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        uri: uri,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
const ImageSource = ({
  uri,
  size = { height: "100%", width: "100%" },
  bgColor = "transparent",
}) => {
  return (
    <Box
      h={size.height}
      w={size.width}
      backgroundColor={bgColor}
      borderRadius="md"
    >
      <Image
        source={{ uri }}
        rounded="md"
        h="100%"
        w="100%"
        resizeMode="contain"
        zIndex={1}
        alt={"Cannot load image"}
      />
    </Box>
  );
};

const PdfLogo = ({ style = null, color = "red.500" }) => {
  return (
    <Center {...style}>
      <Icon
        as={<MaterialIcons name="picture-as-pdf" />}
        size={16}
        color={color}
      />
    </Center>
  );
};

const FileGallery = ({ loading, filePath = [], handlePreviewFile }) => {
  if (loading)
    return (
      <Center h={120}>
        <LoadingComponent />
      </Center>
    );

  if (filePath.length === 0)
    return (
      <Text bold color="secondary.400">
        No File
      </Text>
    );

  return (
    <ScrollView horizontal>
      {filePath.map((file, index) => (
        <Pressable
          mt={2}
          mx={2}
          key={file.id}
          onPress={() => handlePreviewFile(index)}
        >
          {!file.path.includes(".pdf") ? (
            <ImageSource
              uri={file.path}
              size={{
                height: "100px",
                width: "100px",
              }}
              bgColor="primary.100"
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
      ))}
    </ScrollView>
  );
};

const CustomButton = ({ onPress, disabled, label }) => {
  return (
    <Pressable
      onPress={onPress}
      _disabled={{ opacity: 0.5 }}
      _pressed={{ bgColor: "primary.700" }}
      disabled={disabled}
      bgColor="primary.400"
      borderRadius="md"
      px={3}
      py={2}
    >
      <Text>{label}</Text>
    </Pressable>
  );
};

const MediaPicker = ({ control, detail, editable = true, imageOnly }) => {
  const [statusC, requestCPermission] = ImagePicker.useCameraPermissions();
  const [statusM, requestMPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { uploadFile, deleteFileById, getFileFromId } = useDefaultAPI();
  const [filePath, setFilePath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const processUploadFiles = (payload, fileObj, newFileArr, type) => {
    return uploadFile(payload).then((response) => {
      newFileArr.push({
        id: response.data.file,
        path: response.data.path,
      });
      const gcs_upload_path = response.data.signed_url;
      return fetch(gcs_upload_path, {
        method: "PUT",
        body: fileObj,
        headers: {
          "Content-Type": MIME_TYPE[type],
        },
      });
    });
  };

  const handleUploadFiles = (files, type, onChange) => {
    let newFileArr = [];
    setLoading(true);
    const promises = files.map((file) => {
      let payload = {
        file_name: file.uri.split("/").pop(),
        file_type: MIME_TYPE[type],
        size: file.size,
      };
      let fileObj = {
        uri: file.uri,
        name: file.uri.split("/").pop(),
        type: MIME_TYPE[type],
        size: file.size,
      };

      return type === FileType.IMAGE
        ? manipulateAsync(file.uri, [
            {
              resize: { width: 960, height: (960 * file.height) / file.width },
            },
          ]).then(async (result) => {
            return FileSystem.getInfoAsync(result.uri).then((info) => {
              payload = { ...payload, size: info.size };
              fileObj = { ...fileObj, uri: info.uri, size: info.size };
              return processUploadFiles(
                payload,
                fileObj,
                newFileArr,
                FileType.IMAGE
              );
            });
          })
        : processUploadFiles(payload, fileObj, newFileArr, FileType.PDF);
    });
    Promise.all(promises)
      .then(() => {
        onChange([...filePath, ...newFileArr].map((file) => file.id).join(","));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLaunchImageGallery = async (onChange) => {
    onClose();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const files = result.assets;
      handleUploadFiles(files, FileType.IMAGE, onChange);
    }
  };

  const handleLaunchDocumentLibrary = async (onChange) => {
    onClose();
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      // multiple: true,
    });

    if (result.type === "success") {
      const files = [result];
      handleUploadFiles(files, FileType.PDF, onChange);
    }
  };

  const handleLaunchCamera = async (onChange) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const files = result.assets;
      handleUploadFiles(files, FileType.IMAGE, onChange);
    }
  };

  // const handlePdfPreview = () => {
  //   WebBrowser.openBrowserAsync(filePath[previewFile].path);
  // };

  const handleDeleteFile = (onChange) => {
    const fileIdToDelete = filePath[previewFile].id;
    deleteFileById(fileIdToDelete)
      .then((response) => {
        onChange(
          filePath
            .filter((files) => files.id !== fileIdToDelete)
            .map((file) => file.id)
            .join(",")
        );
        setPreviewFile(null);
      })
      .catch((err) => alert("Delete File Error"));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        if (!statusC) requestCPermission();
        if (!statusM) requestMPermission();
      }
    })();
  }, []);

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          if (!value) {
            setFilePath([]);
            return;
          }
          const fileArr = value.split(",");
          let promises = [];
          fileArr.map((file) => promises.push(getFileFromId(file)));
          Promise.all(promises).then((results) => {
            setFilePath(
              results.map((r) => ({
                id: r.data.id,
                path: r.data.path,
              }))
            );
          });
        }, [value]);

        const handleChooseMedia = () => {
          if (imageOnly) {
            handleLaunchImageGallery(onChange);
          } else {
            onOpen();
          }
        };

        return (
          <>
            {editable && (
              <HStack pb={2} justifyContent={"space-around"}>
                <CustomButton
                  onPress={handleChooseMedia}
                  disabled={detail.disabled}
                  label="CHOOSE"
                />
                {imageOnly && (
                  <CustomButton
                    onPress={() => handleLaunchCamera(onChange)}
                    disabled={detail.disabled}
                    label="TAKE PHOTO"
                  />
                )}
              </HStack>
            )}

            <FileGallery
              loading={loading}
              filePath={filePath}
              handlePreviewFile={setPreviewFile}
            />

            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Actionsheet.Item
                  disabled={false}
                  onPress={() => handleLaunchImageGallery(onChange)}
                >
                  Image
                </Actionsheet.Item>
                <Actionsheet.Item
                  disabled={false}
                  onPress={() => handleLaunchDocumentLibrary(onChange)}
                >
                  Document
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>

            <Modal
              isVisible={
                previewFile !== null && previewFile >= 0 && !!filePath.length
              }
              onBackdropPress={() => setPreviewFile(null)}
            >
              <Box h={"70%"}>
                <HStack
                  w={Dimensions.get("window").width * 0.9}
                  p={2}
                  bg={"baseColor.500"}
                  borderTopRadius={8}
                  justifyContent={"space-between"}
                >
                  {/* <Pressable
                    onPress={handlePdfPreview}
                    justifyContent={"center"}
                    px={2}
                    disabled={!filePath[previewFile]?.path?.includes(".pdf")}
                    _disabled={{ display: "none" }}
                  >
                    <Text p={1}>Open PDF</Text>
                  </Pressable> */}
                  {editable && (
                    <Pressable
                      onPress={() => handleDeleteFile(onChange)}
                      px={2}
                      justifyContent={"center"}
                      backgroundColor="red.700"
                      borderRadius={4}
                    >
                      <Text p={1}>Delete</Text>
                    </Pressable>
                  )}
                </HStack>
                <Carousel
                  width={Dimensions.get("window").width * 0.9}
                  height={Dimensions.get("window").height * 0.65}
                  data={filePath}
                  defaultIndex={previewFile}
                  onSnapToItem={setPreviewFile}
                  loop={false}
                  renderItem={({ index }) => {
                    return filePath[index].path.includes(".pdf") ? (
                      <PdfPreview uri={filePath[index].path} />
                    ) : (
                      <ImageSource uri={filePath[index].path} />
                    );
                  }}
                  style={{
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    backgroundColor: "black",
                  }}
                />
              </Box>
            </Modal>
          </>
        );
      }}
    />
  );
};
export default memo(MediaPicker);
