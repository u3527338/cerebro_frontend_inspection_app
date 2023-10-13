import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import base64 from "base-64";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useAxios from "axios-hooks";

const shadowColor = "rgba(30,30,30,0.5)";
import { AlertDialog } from "native-base";
import { API_login, API_QRCodeLogin } from "../../../global/constants";
import { AuthContext } from "../../../context/authContext";
import LoginForm from "../../../components/LoginForm";

const QRCodeLoginScreen = () => {
  const navigation = useNavigation();
  const { token, fromAuthStore } = useContext(AuthContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [loginModal, setLoginModal] = useState(false);
  const [barCodeData, setBarCodeData] = useState("");

  const [{ __, loading: loginLoading, error: loginError }, executeLogin] =
    useAxios(
      {
        method: "POST",
        url: API_login,
        headers: { "Content-Type": "application/json" },
      },
      { manual: true }
    );

  const [{ _, loading: remoteLoading, error: remoteError }, executeRemote] =
    useAxios(
      {
        method: "POST",
        url: API_QRCodeLogin,
      },
      { manual: true }
    );

  useEffect(() => {
    if (loginError !== null) {
      navigation.navigate("RequestError", {
        title: "Login Fail",
        errorCode: loginError.code,
        errorMessage: loginError.message,
      });
    }
    if (remoteError !== null) {
      navigation.navigate("RequestError", {
        title: "Remote Login Fail",
        errorCode: remoteError.code,
        errorMessage: remoteError.message,
      });
    }
  }, [loginError, remoteError]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const remoteLogin = (remoteToken = null, authToken) => {
    const data = { token: remoteToken !== null ? remoteToken : barCodeData };
    const headers = {
      Authorization: `Token ${authToken !== null ? authToken : token}`,
      "Content-Type": "application/json",
    };
    executeRemote({ data, headers }).then((response) => {
      navigation.goBack();
      navigation.navigate("RequestSuccess", {
        title: "Login Success",
        message: "Access Granted, Your Browser will Redirect SOON. ",
      });
    });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const decodeStr = JSON.parse(base64.decode(data));
    const remoteToken =
      typeof decodeStr.token === "string" ? decodeStr.token : "";

    if (token === "") {
      setBarCodeData(remoteToken);
      setLoginModal(true);
    } else {
      remoteLogin(remoteToken, null);
    }
  };

  const onSubmit = (data) => {
    executeLogin({
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((response) => {
        remoteLogin(null, response.data.token);
      })
      .finally(() => setLoginModal(false));
  };

  const fingerPrintHandler = () => {
    LocalAuthentication.authenticateAsync()
      .then((res) => {
        if (res.success) {
          fromAuthStore().then((info) =>
            executeLogin({ data: info }).then((response) => {
              remoteLogin(null, response.data.token);
            })
          );
        } else {
          navigation.navigate("RequestError", {
            title: "Login Fail",
            errorCode: res.error,
            errorMessage: "Access Fail",
          });
        }
      })
      .finally(() => setLoginModal(false));
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <>
      <VStack minWidth={"100%"} minHeight={"100%"}>
        <HStack space={3} alignItems={"center"}>
          <Pressable onPress={() => navigation.goBack()} p={2}>
            <Icon
              size={"3xl"}
              as={Entypo}
              name={"chevron-small-left"}
              color={"baseColor.500"}
            />
          </Pressable>
          <Text
            py={2}
            textAlign={"center"}
            color={"baseColor.500"}
            fontSize={"md"}
          >
            Scan the QRCode to Login
          </Text>
        </HStack>

        {(loginError || remoteError) && (
          <Text textAlign={"center"} color={"baseColor.500"} fontSize={"md"}>
            Remote Login Fail
          </Text>
        )}

        <Box flex={1} borderWidth={0} borderRadius={3}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          >
            <VStack w={"100%"} h={"100%"}>
              <Box w={"100%"} h={"25%"} bg={shadowColor} />
              <HStack w={"100%"} h={"30%"}>
                <Box w={"25%"} bg={shadowColor} />
                <Box
                  w={"50%"}
                  borderWidth={1}
                  borderColor={"white"}
                  bg={"transparent"}
                />
                <Box w={"25%"} bg={shadowColor} />
              </HStack>
              <Box w={"100%"} h={"45%"} bg={shadowColor} />
            </VStack>
          </BarCodeScanner>
        </Box>
      </VStack>

      <Modal isOpen={loginModal} onClose={() => setLoginModal(false)}>
        <Modal.Content w={"100%"}>
          <VStack space={3} p={5} bg={"baseColor.500"}>
            <Text color={"white"}>Login Required</Text>
            <LoginForm
              loading={false}
              onSubmit={onSubmit}
              onFingerPrint={fingerPrintHandler}
              containerStyle={{ space: 3 }}
            />
          </VStack>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default QRCodeLoginScreen;
