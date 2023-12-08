import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { HStack, useDisclose } from "native-base";
import { memo, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CarouselPreview from "./CarouselPreview";
import { CustomButton } from "./Custom";
import FileGallery from "./FileGallery";
import MediaOptions from "./MediaOptions";

const MediaPicker = ({ control, detail, editable = true, imageOnly }) => {
  const [statusC, requestCPermission] = ImagePicker.useCameraPermissions();
  const [statusM, requestMPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [files, setFiles] = useState([]);
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

  const handleLaunchImageGallery = async () => {
    onClose();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newFiles = result.assets;
      setFiles([...files, ...newFiles]);
    }
  };

  const handleLaunchDocumentLibrary = async () => {
    onClose();
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      // multiple: true,
    });

    if (result.type === "success") {
      setFiles([...files, result]);
    }
  };

  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newFiles = result.assets;
      setFiles([...files, ...newFiles]);
    }
  };

  const handleChooseMedia = () => {
    if (imageOnly) {
      handleLaunchImageGallery();
    } else {
      onOpen();
    }
  };

  const handleDeleteLocalFile = (fileToDelete) => {
    //  need to handle pdf local delete
    FileSystem.deleteAsync(fileToDelete.uri).then(() => {
      setFiles(files.filter((file) => file.uri !== fileToDelete.uri));
      setPreviewFile(null);
    });
  };

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          onChange({ uploadRequired: true, data: files });
        }, [files]);

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
              files={files}
              handlePreviewFile={(index) => {
                setPreviewFile(index);
                setModal(true);
              }}
              handleDeleteLocalFile={handleDeleteLocalFile}
              updateId={(index, id) => {
                setFiles((prevState) =>
                  prevState.map((file, i) =>
                    index === i ? { ...file, id: id } : file
                  )
                );
              }}
              status={{ editable: editable, disabled: !!detail.disabled }}
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
              files={files}
              previewFile={previewFile}
              setPreviewFile={setPreviewFile}
            />
          </>
        );
      }}
    />
  );
};

export default memo(MediaPicker);
