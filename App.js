import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Center } from "native-base";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { useEffect } from "react";
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
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/api/queryClient";
import SystemContextProvider from "./src/context/systemContext";

library.add(fab, fas);
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default function App() {
  const [fontsLoaded] = useFonts(fontMap);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [fontsLoaded]);

  return (
    <NativeBaseProvider theme={customThemes}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
