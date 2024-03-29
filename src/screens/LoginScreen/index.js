import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAxios from "axios-hooks";
import * as LocalAuthentication from "expo-local-authentication";
import {
  Box,
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
import { Dimensions } from "react-native";
import LoginLogo from "../../../assets/LoginLogo";
import LoginForm from "../../components/LoginForm";
import { AuthContext } from "../../context/authContext";
import { StateContext } from "../../context/stateContext";
import { API_login } from "../../global/constants";
import useDefaultAPI from "../../hocks/useDefaultAPI";
import baseColor from "../../themes/colors/baseColor";

const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation();

  const { setProfile, toAuthStore, fromAuthStore } = useContext(AuthContext);
  const { setProjectList } = useContext(StateContext);
  const { useLoginMutation } = useDefaultAPI();

  const { mutate, isPending: loading, error } = useLoginMutation();

  const prepareLogin = (data) => {
    mutate(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          toAuthStore(data.username, data.password);
          handleLoginResponse(response.data);
        },
      }
    );
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
          .then((info) => {
            mutate(info, {
              onSuccess: (response) => handleLoginResponse(response.data),
            });
          })
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
      <StatusBar bg="baseColor.500" barStyle="light-content" />
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
