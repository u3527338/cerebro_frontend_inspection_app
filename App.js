import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Center } from "native-base";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import AuthContextProvider from "./src/context/authContext";
import StateContextProvider from "./src/context/stateContext";
import fontMap from "./src/global/font/fontMap";
import LoginRoute from "./src/routes/LoginRoute";
import baseColor from "./src/themes/colors/baseColor";
import customThemes from "./src/themes/customThemes";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import * as Notifications from "expo-notifications";
import SystemContextProvider from "./src/context/systemContext";
import usePushNotification from "./src/hocks/usePushNotification";

library.add(fab, fas);
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default function App() {
  const [fontsLoaded] = useFonts(fontMap);
  const { initPushNotificationConfig, registerForPushNotificationsAsync } =
    usePushNotification();

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [fontsLoaded]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  initPushNotificationConfig();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("response", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (expoPushToken) console.log("token", expoPushToken);
  if (notification) console.log("notification", notification);

  return (
    <NativeBaseProvider theme={customThemes}>
      <NavigationContainer>
        <SystemContextProvider>
          <AuthContextProvider>
            <StateContextProvider>
              <SafeAreaView style={{ backgroundColor: baseColor[500] }} />
              <SafeAreaView style={{ height: "100%" }}>
                {fontsLoaded ? (
                  <LoginRoute />
                ) : (
                  <Center flex={1} bg={"baseColor.500"}>
                    <Text>Loading</Text>
                  </Center>
                )}
              </SafeAreaView>
            </StateContextProvider>
          </AuthContextProvider>
        </SystemContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
