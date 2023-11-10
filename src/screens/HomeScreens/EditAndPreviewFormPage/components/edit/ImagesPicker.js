import {
  Actionsheet,
  Box,
  Button,
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
import * as WebBrowser from "expo-web-browser";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import LoadingComponent from "../../../../../components/common/LoadingComponent";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
import ImageViewer from "react-native-image-zoom-viewer";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const imageSize = { width: 960, height: 1280 };
const ratio = (4.5 * imageSize.width) / windowWidth;

const FileType = {
  IMAGE: "image",
  PDF: "pdf",
};

const MIME_TYPE = {
  image: "image/jpeg",
  pdf: "application/pdf",
};

const ImageSource = ({ uri, size = { height: "100%", width: "100%" } }) => {
  return (
    <Image
      source={{ uri }}
      rounded="md"
      h={size.height}
      w={size.width}
      zIndex={1}
      alt={"Cannot load image"}
    />
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

  if (filePath.length === 0) return null;

  return (
    <ScrollView horizontal>
      {filePath.map((file, index) => (
        <Pressable
          mt={3}
          mx={2}
          key={file.id}
          onPress={() => handlePreviewFile(index)}
        >
          {!file.path.includes(".pdf") ? (
            <ImageSource
              uri={file.path}
              size={{
                height: `${imageSize.height / ratio}px`,
                width: `${imageSize.width / ratio}px`,
              }}
            />
          ) : (
            <PdfLogo
              style={{
                h: `${imageSize.height / ratio}px`,
                w: `${imageSize.width / ratio}px`,
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
const ImagesPicker = ({ control, detail }) => {
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
        ? manipulateAsync(file.uri, [{ resize: imageSize }]).then(
            async (result) => {
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
            }
          )
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

  const handlePdfPreview = () => {
    WebBrowser.openBrowserAsync(filePath[previewFile].path);
  };

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

        return (
          <>
            <HStack justifyContent={"space-around"}>
              <Button onPress={onOpen}>
                <Text>CHOOSE</Text>
              </Button>
              <Button onPress={() => handleLaunchCamera(onChange)}>
                <Text>TAKE PHOTO</Text>
              </Button>
            </HStack>

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
              isVisible={previewFile !== null && previewFile >= 0}
              onBackdropPress={() => setPreviewFile(null)}
            >
              <Box h={"70%"}>
                <HStack
                  p={2}
                  bg={"baseColor.500"}
                  borderTopRadius={8}
                  justifyContent={"space-between"}
                >
                  <Pressable
                    onPress={handlePdfPreview}
                    justifyContent={"center"}
                    px={2}
                    disabled={!filePath[previewFile]?.path?.includes(".pdf")}
                    _disabled={{ display: "none" }}
                  >
                    <Text p={1}>Open PDF</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDeleteFile(onChange)}
                    px={2}
                    justifyContent={"center"}
                    backgroundColor="red.700"
                    borderRadius={4}
                  >
                    <Text p={1}>Delete</Text>
                  </Pressable>
                </HStack>
                <ImageViewer
                  loadingRender={() => <LoadingComponent />}
                  renderImage={(props) => {
                    return props.source.uri.includes(".pdf") ? (
                      <PdfLogo />
                    ) : (
                      <ImageSource uri={props.source.uri} />
                    );
                  }}
                  index={previewFile}
                  onChange={setPreviewFile}
                  imageUrls={filePath.map((i) => ({ url: i.path }))}
                />
              </Box>
            </Modal>
          </>
        );
      }}
    />
  );
};
export default memo(ImagesPicker);
