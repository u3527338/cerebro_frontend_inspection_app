import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Modal,
  Pressable,
  Spinner,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import baseColor from "../../themes/colors/baseColor";
import useAxios from "axios-hooks";
import { API_login } from "../../global/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { Spacer } from "native-base/src/components/primitives/Flex";
import LoginForm from "../../components/LoginForm";
import LoginLogo from "../../../assets/LoginLogo";
import { AuthContext } from "../../context/authContext";
import { Dimensions, Platform } from "react-native";
import { StateContext } from "../../context/stateContext";
import usePushNotification from "../../hocks/usePushNotification";

const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation();

  const { setProfile, toAuthStore, fromAuthStore } = useContext(AuthContext);
  const { setProjectList } = useContext(StateContext);

  const [{ data, loading, error }, execute] = useAxios(
    {
      method: "POST",
      url: API_login,
      headers: { "Content-Type": "application/json" },
    },
    { manual: true }
  );

  const { sendPushNotification, getReceipts } = usePushNotification();
  const prepareLogin = (data) => {
    execute({
      data: {
        username: data.username,
        password: data.password,
      },
    }).then((response) => {
      // toAuthStore(data.username, data.password);
      // handleLoginResponse(response.data);
      const temp = {
        token:
          Platform.OS === "android"
            ? "1MmF75AHf0uN_eWpbcvy2g"
            : "MtR3d6NHXtIUpsUFUw2iP2",
        body:
          Platform.OS === "android"
            ? "Message from android"
            : "Message from ios",
      };
      Platform.OS === "android";
      sendPushNotification({
        to: `ExponentPushToken[${temp.token}]`,
        sound: "default",
        title: "Original Title",
        body: temp.body,
        data: { someData: "goes here" },
      });
    });
  };

  const onSubmit = (data) => prepareLogin(data);
  const handleLoginResponse = (response_data) => {
    setProfile(response_data);
    setProjectList(response_data.projects);
  };

  const fingerPrintHandler = () => {
    LocalAuthentication.authenticateAsync().then((res) => {
      if (res.success) {
        fromAuthStore()
          .then((info) => execute({ data: info }))
          .then((response) => handleLoginResponse(response.data));
      } else {
        navigation.navigate("RequestError", {
          title: "Login Fail",
          errorCode: res.error,
          errorMessage: "Access Fail",
        });
      }
    });
  };

  const qrCodeHandler = () => {
    // navigation.navigate("QRCoderLogin")
  };

  useEffect(() => {
    if (error !== null) {
      navigation.navigate("RequestError", {
        title: "Oops, there is some error",
        errorCode: error.code,
        errorMessage: error.message,
      });
    }
  }, [error]);

  return (
    <>
      <StatusBar backgroundColor={baseColor[500]} barStyle="light-content" />
      <VStack height={"100%"} width={"100%"} justifyContent={"space-between"}>
        <VStack
          backgroundColor={"baseColor.500"}
          alignItems={"center"}
          roundedBottom={42}
          shadow={6}
          space={3}
          minHeight={"80%"}
        >
          <Center h={windowHeight * 0.3}>
            <LoginLogo size={1} />
          </Center>

          <VStack width={"85%"} space={3}>
            <LoginForm
              loading={loading}
              onSubmit={onSubmit}
              onFingerPrint={fingerPrintHandler}
              containerStyle={{ space: 4 }}
            />
            <Button onPress={getReceipts}>
              <Text>Get Receipts</Text>
            </Button>
            <Spacer h={1} />
            <Pressable onPress={qrCodeHandler}>
              <HStack alignItems={"center"} justifyContent={"center"} space={3}>
                <Text textAlign={"center"}>QR Code Login</Text>
                <Icon
                  size={"lg"}
                  as={FontAwesome}
                  name={"qrcode"}
                  color={"white"}
                />
              </HStack>
            </Pressable>
          </VStack>
        </VStack>

        <Box w={"100%"} h={"12%"}>
          <Text color={"black"} fontSize={"lg"} textAlign={"center"} bold>
            Cerebro Strategy Limited
          </Text>
        </Box>
      </VStack>
    </>
  );
}
