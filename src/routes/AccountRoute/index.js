import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/BaseScreens/AccountScreen";
import EditScreen from "../../screens/BaseScreens/EditScreen";

const Stack = createStackNavigator();

const AccountRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Account"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default AccountRoute;
