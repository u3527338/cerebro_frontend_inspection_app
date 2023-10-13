import ProjectScreen from "../screens/BaseScreens/ProjectScreen";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import SystemScreen from "../screens/BaseScreens/SystemScreen";
import ComponentTest from "../screens/ComponentTest";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import FooterRoute from "./FooterRoute";
import useDefaultAPI from "../hocks/useDefaultAPI";

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
