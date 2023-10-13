import { createStackNavigator } from "@react-navigation/stack";
import FormPage from "../../screens/HomeScreens/FormPage";
import CategorySelectPage from "../../screens/HomeScreens/CategorySelectPage";
import StatisticsPage from "../../screens/HomeScreens/StatisticsPage";
import LibraryPage from "../../screens/HomeScreens/LibraryPage";
import SelectFormPage from "../../screens/HomeScreens/SelectFormPage";
import EditAndPreviewFormPage from "../../screens/HomeScreens/EditAndPreviewFormPage";
import AddFormPage from "../../screens/HomeScreens/AddFormPage";

const Stack = createStackNavigator();

const FooterRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Form"}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="Form" component={FormPage} />
      <Stack.Screen
        name="Division"
        component={CategorySelectPage}
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen name="Statistics" component={StatisticsPage} />
      <Stack.Screen name="Library" component={LibraryPage} />
      <Stack.Screen
        name="Add"
        component={SelectFormPage}
        options={{ presentation: "transparentModal" }}
      />

      <Stack.Screen name={"Preview"} component={EditAndPreviewFormPage} />
      <Stack.Screen name={"NewForm"} component={AddFormPage} />
    </Stack.Navigator>
  );
};

export default FooterRoute;
