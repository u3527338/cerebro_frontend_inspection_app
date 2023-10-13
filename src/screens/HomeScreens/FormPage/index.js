import { useNavigation, useRoute } from "@react-navigation/native";
import { Flex, VStack } from "native-base";
import { useContext, useEffect } from "react";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import GlobalSearchIcon from "../../../global/globalSearchIcon";
import MyFooter from "../../../routes/FooterRoute/MyFooter";
import MyTabs from "./MyTopTabNavigator";

const Body = ({ onCreateFormHandler }) => {
  return <MyTabs />;
};

const FormPage = () => {
  const navigation = useNavigation();
  const { currentCategory } = useContext(StateContext);

  useEffect(() => {
    if (currentCategory.id === undefined) {
      navigation.navigate("Division");
    }
  }, [currentCategory]);

  return (
    <>
      <GlobalHeader RightIcon={<GlobalSearchIcon />} />
      <VStack flex={1}>
        <Flex flex={1}>
          <Body />
        </Flex>
        <Flex bg={"white"} marginTop={2} shadow={2}>
          <MyFooter />
        </Flex>
      </VStack>
    </>
  );
};

export default FormPage;
