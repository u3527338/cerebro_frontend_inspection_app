import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import {
  Actionsheet,
  Badge,
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
import { FontAwesome } from "@expo/vector-icons";

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
        resizeMode="cover"
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

const DeleteBadge = ({ handleDeleteFile, disabled }) => {
  return (
    <Pressable
      mb={-3}
      mr={-3}
      zIndex={1}
      onPress={handleDeleteFile}
      disabled={disabled}
      _disabled={{ opacity: 0.5 }}
    >
      <Badge
        colorScheme="danger"
        rounded={8}
        variant="solid"
        alignSelf="flex-end"
      >
        <Icon
          pl={0.5}
          as={<FontAwesome name="trash-o" />}
          color="white"
          size={4}
        />
      </Badge>
    </Pressable>
  );
};

const File = ({
  file,
  handlePreviewFile,
  handleDeleteFile,
  editable,
  disabled,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Pressable key={file.id} onPress={handlePreviewFile}>
      {editable && (
        <DeleteBadge
          disabled={loading || disabled}
          handleDeleteFile={() => {
            setLoading(true);
            handleDeleteFile(file);
          }}
        />
      )}
      {file.path.includes(".jpeg") ? (
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
  );
};

const FileGallery = ({
  loading,
  filePath = [],
  handlePreviewFile,
  handleDeleteFile,
  editable,
  disabled,
}) => {
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack space={6} pr={10}>
        {filePath.map((file, index) => (
          <File
            key={file.id}
            file={file}
            handlePreviewFile={() => {
              handlePreviewFile(index);
            }}
            handleDeleteFile={handleDeleteFile}
            editable={editable}
            disabled={disabled}
          />
        ))}
      </HStack>
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
  const [modal, setModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

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
        // useEffect(() => {
        //   if (!value) {
        //     setFilePath([]);
        //     return;
        //   }
        //   const fileArr = value.split(",");
        //   let promises = [];
        //   fileArr.map((file) => promises.push(getFileFromId(file)));
        //   Promise.all(promises).then((results) => {
        //     setFilePath(
        //       results.map((r) => ({
        //         id: r.data.id,
        //         path: r.data.path,
        //       }))
        //     );
        //   });
        // }, [value]);

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

        const handlePreviewFiles = (files) => {
          setFilePath([
            ...filePath,
            ...files.map((file, index) => ({
              id: filePath.length + index,
              path: file.uri,
            })),
          ]);
        };

        const handleSubmit = (files, type) => {
          let newFileArr = [];
          setLoading(true);
          const promises = files.map((file, index) => {
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
                    resize: {
                      width: 960,
                      height: (960 * file.height) / file.width,
                    },
                  },
                ]).then(async (result) => {
                  newFileArr.push({
                    id: index,
                    path: result.uri,
                  });
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
              onChange(
                [...filePath, ...newFileArr].map((file) => file.id).join(",")
              );
              setFilePath([...filePath, ...newFileArr]);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        };

        const handleLaunchImageGallery = async () => {
          onClose();
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
          });

          if (!result.canceled) {
            const files = result.assets;
            handlePreviewFiles(files);
          }
        };

        const handleLaunchDocumentLibrary = async () => {
          onClose();
          const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            // multiple: true,
          });

          if (result.type === "success") {
            const files = [result];
            handlePreviewFiles(files);
          }
        };

        const handleLaunchCamera = async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });

          if (!result.canceled) {
            const files = result.assets;
            handlePreviewFiles(files);
          }
        };

        const handleChooseMedia = () => {
          if (imageOnly) {
            handleLaunchImageGallery();
          } else {
            onOpen();
          }
        };

        const handleDeleteFile = (fileToDelete) => {
          FileSystem.deleteAsync(fileToDelete.path).then(() => {
            setFilePath(filePath.filter((file) => file.id !== fileToDelete.id));
            setPreviewFile(null);
          });

          // deleteFileById(fileIdToDelete)
          //   .then((response) => {
          //     onChange(
          //       filePath
          //         .filter((files) => files.id !== fileIdToDelete)
          //         .map((file) => file.id)
          //         .join(",")
          //     );
          //     setPreviewFile(null);
          //   })
          //   .catch((err) => alert("Delete File Error"));
        };

        return (
          <>
            {editable && (
              <HStack pb={2} justifyContent={"space-around"}>
                <CustomButton
                  onPress={handleChooseMedia}
                  disabled={!!detail.disabled}
                  label="CHOOSE"
                />
                {imageOnly && (
                  <CustomButton
                    onPress={() => handleLaunchCamera()}
                    disabled={!!detail.disabled}
                    label="TAKE PHOTO"
                  />
                )}
              </HStack>
            )}

            <FileGallery
              loading={loading}
              filePath={filePath}
              handlePreviewFile={(index) => {
                setPreviewFile(index);
                setModal(true);
              }}
              handleDeleteFile={handleDeleteFile}
              editable={editable}
              disabled={!!detail.disabled}
            />

            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Actionsheet.Item onPress={() => handleLaunchImageGallery()}>
                  Image
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => handleLaunchDocumentLibrary()}>
                  Document
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>

            <Modal
              isVisible={modal}
              onBackdropPress={() => {
                setModal(false);
              }}
            >
              <Carousel
                width={Dimensions.get("window").width * 0.9}
                height={Dimensions.get("window").height * 0.7}
                data={filePath}
                defaultIndex={previewFile}
                onSnapToItem={setPreviewFile}
                loop={false}
                renderItem={({ index }) => {
                  return !filePath[index].path?.includes(".jpeg") ? (
                    <PdfPreview uri={filePath[index].path} />
                  ) : (
                    <ImageSource uri={filePath[index].path} />
                  );
                }}
                style={{
                  borderRadius: 8,
                  backgroundColor: "black",
                }}
              />
            </Modal>
          </>
        );
      }}
    />
  );
};
export default memo(MediaPicker);
