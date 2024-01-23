import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import _ from "lodash";
import { Box, HStack, Text, useDisclose } from "native-base";
import { memo, useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Platform } from "react-native";
import useDefaultAPI from "../../../../../../hocks/useDefaultAPI";
import CarouselPreview from "./CarouselPreview";
import { CustomButton } from "./Custom";
import FileGallery from "./FileGallery";
import LibraryBrowserModal from "./LibraryBrowserModal";
import MediaOptions from "./MediaOptions";

const MediaPicker = ({ control, detail, editable = true, browseLibrary }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: detail.key,
  });
  const [libraryBrowser, setLibraryBrowser] = useState(false);
  const [statusC, requestCPermission] = ImagePicker.useCameraPermissions();
  const [statusM, requestMPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { isOpen, onOpen, onClose } = useDisclose();
  // const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const { usePreviewFileQuery } = useDefaultAPI();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        if (!statusC) requestCPermission();
        if (!statusM) requestMPermission();
      }
    })();
  }, []);

  const handleLaunchImageGallery = async () => {
    onClose();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: detail.limitation > 1,
      quality: 1,
    });

    if (!result.canceled) {
      const newFiles = result.assets;
      // setFiles([...files, ...newFiles]);
      append(newFiles);
    }
  };

  const handleLaunchDocumentLibrary = async () => {
    onClose();
    const result = await DocumentPicker.getDocumentAsync({
      // copyToCacheDirectory: false,
      // multiple: true,
    });

    if (result.type === "success") {
      // setFiles([...files, result]);
      append(result);
    }
  };

  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newFiles = result.assets;
      // setFiles([...files, ...newFiles]);
      append(newFiles);
    }
  };

  const handleChooseMedia = () => {
    if (browseLibrary) {
      setLibraryBrowser(true);
    } else {
      onOpen();
    }
  };

  const handleDeleteLocalFile = (fileToDelete, index) => {
    if (fileToDelete.id) {
      // setFiles(files.filter((file) => file.uri !== fileToDelete.uri));
      remove(index);
      setPreviewFile(null);
    } else {
      FileSystem.deleteAsync(fileToDelete.uri).finally(() => {
        // setFiles(files.filter((file) => file.uri !== fileToDelete.uri));
        remove(index);
        setPreviewFile(null);
      });
    }
  };

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        const [libraryPath, setLibraryPath] = useState(null);
        const { data, isFetching } = usePreviewFileQuery(libraryPath);

        // useEffect(() => {
        //   console.log("onChange", fields);
        //   onChange(
        //     browseLibrary
        //       ? fields.map((file) => file.id)
        //       : { uploadRequired: true, data: fields }
        //   );
        // }, [fields]);

        useEffect(() => {
          if (data && !isFetching) {
            // setFiles((prevState) => [
            //   ...prevState,
            //   { id: data.id, uri: data.path },
            // ]);
            append({ id: data.id, uri: data.path });
          }
        }, [data]);

        return (
          <Box p={2}>
            <Text color={"baseColor.300"} fontSize={"xs"} m={-2} pb={4}>
              {`${_.startCase(detail.session)} ( ${fields.length} selected )`}
            </Text>
            {editable && (
              <HStack pb={2} justifyContent={"space-around"}>
                <CustomButton
                  onPress={handleChooseMedia}
                  disabled={
                    !!detail.disabled || detail.limitation === fields.length
                  }
                  label="CHOOSE"
                />
                {!browseLibrary && (
                  <CustomButton
                    onPress={handleLaunchCamera}
                    disabled={
                      !!detail.disabled || detail.limitation === fields.length
                    }
                    label="TAKE PHOTO"
                  />
                )}
              </HStack>
            )}

            <FileGallery
              files={fields}
              handlePreviewFile={(index) => {
                setPreviewFile(index);
                setModal(true);
              }}
              handleDeleteLocalFile={handleDeleteLocalFile}
              status={{ editable: editable, disabled: !!detail.disabled }}
              loading={isFetching}
            />

            <MediaOptions
              isOpen={isOpen}
              onClose={onClose}
              handleLaunchImageGallery={handleLaunchImageGallery}
              handleLaunchDocumentLibrary={handleLaunchDocumentLibrary}
            />

            <CarouselPreview
              isVisible={modal}
              onBackdropPress={() => {
                setModal(false);
              }}
              // files={files}
              files={fields}
              previewFile={previewFile}
              setPreviewFile={setPreviewFile}
            />

            <LibraryBrowserModal
              isOpen={libraryBrowser}
              defaultRoute={detail.directory
                ?.split("/")
                ?.slice(1)
                ?.filter((e) => e !== "")}
              onClose={() => {
                setLibraryBrowser(false);
              }}
              handlePickImage={(uri) => setLibraryPath(uri)}
            />
          </Box>
        );
      }}
    />
  );
};

export default memo(MediaPicker);
