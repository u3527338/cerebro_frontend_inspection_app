import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Text } from "native-base";
import RequestErrorScreen from "../screens/DialogScreens/RequestErrorScreen";
import RequestSuccessScreen from "../screens/DialogScreens/RequestSuccessScreen";
import QRCodeLoginScreen from "../screens/DialogScreens/QRCodeLoginScreen";
import BaseDrawerRoute from "./BaseDrawerRoute";
import { SystemContext } from "../context/systemContext";
import { Platform } from "react-native";

const HomeRoute = () => {
  return <Text>This is Home</Text>;
};

const Stack = createNativeStackNavigator();

const LoginRoute = () => {
  const { token } = useContext(AuthContext);
  const { setOperatingSystem } = useContext(SystemContext);

  useEffect(() => {
    setOperatingSystem(Platform.OS);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: true }}
    >
      {token ? (
        <Stack.Screen name="HomeRoute" component={BaseDrawerRoute} />
      ) : (
        <Stack.Screen name="WithoutSignIn" component={LoginScreen} />
      )}
      <Stack.Screen
        name="RequestError"
        component={RequestErrorScreen}
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="RequestSuccess"
        component={RequestSuccessScreen}
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="QRCoderLogin"
        component={QRCodeLoginScreen}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginRoute;
