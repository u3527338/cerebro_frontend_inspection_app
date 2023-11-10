import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAxios from "axios-hooks";
import * as LocalAuthentication from "expo-local-authentication";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Pressable,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import React, { useContext, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import LoginLogo from "../../../assets/LoginLogo";
import LoginForm from "../../components/LoginForm";
import { AuthContext } from "../../context/authContext";
import { StateContext } from "../../context/stateContext";
import { API_login } from "../../global/constants";
import baseColor from "../../themes/colors/baseColor";
import usePushNotification from "../../hocks/usePushNotification";

const windowHeight = Dimensions.get("window").height;

const TempSendMessage = () => {
  const { sendPushNotification } = usePushNotification();
  const sendMessage = () => {
    const expoPushToken =
      Platform.OS === "android"
        ? "ExponentPushToken[vMEHi6Jy23Bwi8tU5UXjTD]"
        : "ExponentPushToken[v1Q2frCEsrXmmJe3dGodzX]";
    const message = `Message from ${Platform.OS}`;
    sendPushNotification({
      to: expoPushToken,
      sound: "default",
      title: "Dummy Title",
      body: message,
      data: { someData: "goes here" },
    });
  };
  return <Button onPress={sendMessage}>Send Message</Button>;
};
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

  const prepareLogin = (data) => {
    execute({
      data: {
        username: data.username,
        password: data.password,
      },
    }).then((response) => {
      toAuthStore(data.username, data.password);
      handleLoginResponse(response.data);
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
            <TempSendMessage />
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
