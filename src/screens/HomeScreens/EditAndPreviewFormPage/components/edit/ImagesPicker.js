import { Actionsheet, Button, HStack, Text, useDisclose } from "native-base";
import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";
// import * as WebBrowser from "expo-web-browser";
import * as ImagePicker from "expo-image-picker";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
// import DocumentPicker from "react-native-document-picker";

const ImagesPicker = ({ control, detail }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { uploadImage } = useDefaultAPI();
  const handleLaunchImageGallery = async () => {
    onClose();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const images = result.assets;
      images.map((image) =>
        uploadImage({
          file_name: image.fileName,
          file_type: image.type,
          size: image.fileSize,
        }).then((response) => console.log(response.data))
      );
    }
  };

  const handleLaunchDocumentLibrary = async () => {
    onClose();
    // const result = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.pdf],
    // });
    // if (!result.canceled) {
    //   console.log(result);
    // }
  };

  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const images = result.assets;
      console.log(images);
      uploadImage({
        file_name: images[0].uri,
        file_type: images[0].type,
        size: 1000,
      }).then((response) => console.log(response.data));
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { statusCamera } =
          await ImagePicker.requestCameraPermissionsAsync();
      }
    })();
  }, []);

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <HStack justifyContent={"space-around"}>
            <Button onPress={onOpen}>
              <Text>CHOOSE</Text>
            </Button>
            <Button onPress={handleLaunchCamera}>
              <Text>TAKE PHOTO</Text>
            </Button>
          </HStack>

          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item
                disabled={false}
                onPress={handleLaunchImageGallery}
              >
                Image
              </Actionsheet.Item>
              <Actionsheet.Item
                disabled={false}
                onPress={handleLaunchDocumentLibrary}
              >
                Document
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      )}
    />
  );
};
export default memo(ImagesPicker);
