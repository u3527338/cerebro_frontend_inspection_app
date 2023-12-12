import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Modal,
  Pressable,
  Skeleton,
  Text,
  VStack,
  ZStack,
} from "native-base";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAxios from "axios-hooks";
import { API_requestUploadImage } from "../global/constants";
import { AuthContext } from "../context/AuthContextProvider";
import { Controller, useFieldArray } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const windowWidth = Dimensions.get("window").width;
const imagePreviewSize = windowWidth * 0.262;

const MyImagePreviewArea = ({ asset, onRemoveHandler, append }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { token, default_project } = useContext(AuthContext);

  const [
    { data: request, loading: requestLoading, error: requestError },
    executeRequestUpload,
  ] = useAxios(
    {
      method: "POST",
      url: API_requestUploadImage,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    },
    { manual: true }
  );

  const [{}, executeRemove] = useAxios(
    {
      method: "DELETE",
      url: API_requestUploadImage,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    },
    { manual: true }
  );

  const [
    { data: uploadData, loading: uploadLoading, error: uploadError },
    executeUpload,
  ] = useAxios(
    {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
    },
    { manual: true }
  );

  const onPressHandler = () => {
    navigation.navigate("Preview", { previewUri: asset.uri });
  };

  const removePreProcess = () => {
    executeRemove({
      params: {
        project: default_project.project.id,
        file: asset.id,
      },
    }).then((res) => {
      onRemoveHandler(asset);
    });
  };

  const uploadImage = () => {
    manipulateAsync(asset.uri, [{ resize: { width: 960, height: 1280 } }]).then(
      (result) => {
        FileSystem.getInfoAsync(result.uri).then((info) => {
          const payload = {
            file_name: asset.uri.split("/").pop(),
            file_type: "image/jpeg",
            size: info.size,
          };

          const imageObj = {
            uri: info.uri,
            name: asset.uri.split("/").pop(),
            type: "image/jpeg",
            size: info.size,
          };

          executeRequestUpload({
            data: payload,
            url:
              API_requestUploadImage + `?project=${default_project.project.id}`,
          }).then((response) => {
            const gcs_upload_path = response.data.signed_url;
            fetch(gcs_upload_path, {
              method: "PUT",
              body: imageObj,
              headers: { "Content-Type": "image/jpeg" },
            }).then(() => {
              asset["preview_path"] = response.data.path;
              asset["id"] = response.data.file;

              append(response.data.file);
              setIsLoading(true);
            });
          });
        });
      }
    );
  };

  useEffect(() => {
    uploadImage();
  }, []);

  return (
    <VStack
      w={imagePreviewSize}
      h={imagePreviewSize}
      bg={"coolGray.300"}
      m={1}
      rounded="md"
    >
      <Pressable onPress={onPressHandler}>
        <ZStack>
          {isLoading ? (
            <Skeleton
              h={imagePreviewSize}
              rounded="md"
              startColor="primary.100"
              isLoaded={!isLoading}
              zIndex={2}
            />
          ) : null}
          {requestError || uploadError ? (
            <Center w={imagePreviewSize} h={imagePreviewSize}>
              <Box borderWidth={0} borderRadius={32} p={2}>
                <Icon
                  size={"6xl"}
                  as={Entypo}
                  name={"circle-with-cross"}
                  color={"coolGray.400"}
                />
              </Box>
            </Center>
          ) : null}
          <Image
            onLoadEnd={() => setIsLoading(false)}
            source={{ uri: asset.preview_path }}
            rounded="md"
            size={imagePreviewSize}
            zIndex={1}
            alt={"test image"}
          />
        </ZStack>
      </Pressable>
      <Pressable
        position={"absolute"}
        top={0}
        left={"85%"}
        onPress={removePreProcess}
      >
        <Icon
          size={"sm"}
          as={FontAwesome}
          name={"close"}
          color={"alertColor.500"}
        />
      </Pressable>
    </VStack>
  );
};

const MediaPicker = ({ control, name }) => {
  const [imageList, setImageList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [statusC, requestCPermission] = ImagePicker.useCameraPermissions();
  const [statusM, requestMPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: name, // unique name for your Field Array
    }
  );

  useEffect(() => {
    if (!statusC) requestCPermission();
    if (!statusM) requestMPermission();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      // quality: 0.7,
    });
    //
    // console.log(result);

    if (!result.canceled) {
      setImageList((prevState) => [...prevState, ...result.assets]);
    }
  };

  const pickCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsMultipleSelection: true,
      // allowsEditing: true,
      // aspect: [16, 9],
      // quality: 0.7,
    });

    // console.log(result);

    if (!result.canceled) {
      setImageList((prevState) => [...prevState, ...result.assets]);
    }
  };

  const onRemoveHandler = (asset) => {
    remove(asset.uri);
    setImageList((prevState) =>
      prevState.filter((item) => item.uri !== asset.uri)
    );
  };

  return (
    <>
      <HStack flexWrap={"wrap"}>
        <Pressable
          borderColor={"primary.500"}
          rounded="md"
          m={1}
          borderWidth={1}
          alignItems={"center"}
          justifyContent={"center"}
          w={imagePreviewSize}
          h={imagePreviewSize}
          onPress={() => setIsOpen(true)}
        >
          {({ isPressed }) => (
            <Icon
              size={"2xl"}
              as={Feather}
              name={"plus"}
              color={"primary.500"}
            />
          )}
        </Pressable>

        {imageList.map((item, index) => (
          <MyImagePreviewArea
            key={index}
            imagePreviewSize={imagePreviewSize}
            onRemoveHandler={(asset) => onRemoveHandler(asset)}
            asset={item}
            append={append}
          />
        ))}
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={"full"}
        style={{ justifyContent: "flex-end" }}
      >
        <Modal.Content>
          <VStack w={"100%"} p={4} space={2} bg={"baseColor.500"} pb={"20%"}>
            <Pressable p={3} onPress={pickImage}>
              {({ isPressed }) => (
                <HStack
                  w={"100%"}
                  bg={"baseColor.500"}
                  alignItems={"center"}
                  space={10}
                >
                  <Icon
                    size={"xl"}
                    as={Entypo}
                    name={"image"}
                    color={isPressed ? "coolGray.300" : "white"}
                  />
                  <Text color={isPressed ? "coolGray.200" : "white"}>
                    Upload from Album
                  </Text>
                </HStack>
              )}
            </Pressable>
            <Pressable p={3} onPress={pickCamera}>
              {({ isPressed }) => (
                <HStack
                  w={"100%"}
                  bg={"baseColor.500"}
                  alignItems={"center"}
                  space={10}
                >
                  <Icon
                    size={"xl"}
                    as={Entypo}
                    name={"camera"}
                    color={isPressed ? "coolGray.300" : "white"}
                  />
                  <Text color={isPressed ? "coolGray.200" : "white"}>
                    Camera
                  </Text>
                </HStack>
              )}
            </Pressable>
          </VStack>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default MediaPicker;
