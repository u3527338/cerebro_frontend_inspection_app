import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useDefaultAPI from "../hocks/useDefaultAPI";
import ProjectScreen from "../screens/BaseScreens/ProjectScreen";
import SystemScreen from "../screens/BaseScreens/SystemScreen";
import ComponentTest from "../screens/ComponentTest";
import AccountRoute from "./AccountRoute";
import FooterRoute from "./FooterRoute";

const UseRouteSetting = () => {
  const { setProfile } = useContext(AuthContext);
  const { loadUser } = useDefaultAPI();

  return [
    {
      name: "Project",
      component: ProjectScreen,
      icon: <Ionicons name="ios-clipboard" />,
      onPressCallBack: () => {
        loadUser().then((response) => setProfile(response.data));
      },
      onPressHandler: null,
      selectable: true,
    },
    {
      name: "System",
      component: SystemScreen,
      icon: <FontAwesome name="gear" />,
      onPressCallBack: null,
      onPressHandler: (nameTag) =>
        console.log(`override default ${nameTag} navigation`),
      selectable: true,
    },
    {
      name: "Test",
      component: ComponentTest,
      icon: <FontAwesome5 name="exclamation-circle" />,
      onPressCallBack: null,
      onPressHandler: null,
      selectable: true,
    },
    {
      name: "AccountStack",
      component: AccountRoute,
      icon: <FontAwesome5 name="exclamation-circle" />,
      onPressCallBack: null,
      onPressHandler: null,
      selectable: false,
    },
    {
      name: "HomeStack",
      component: FooterRoute,
      icon: <FontAwesome5 name="exclamation-circle" />,
      onPressCallBack: null,
      onPressHandler: null,
      selectable: false,
    },
  ];
};

export default UseRouteSetting;
