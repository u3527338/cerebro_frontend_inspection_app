import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { DeviceEventEmitter } from "react-native";
import baseColor from "../../themes/colors/baseColor";

const iconMap = {
  Form: (props) => <FontAwesomeIcon icon={["fas", "house"]} {...props} />,
  Division: (props) => (
    <FontAwesomeIcon icon={["fas", "layer-group"]} {...props} />
  ),
  Statistics: (props) => (
    <FontAwesomeIcon icon={["fas", "chart-pie"]} {...props} />
  ),
  Library: (props) => <FontAwesomeIcon icon={["fas", "book"]} {...props} />,
  Add: (props) => <FontAwesomeIcon icon={["fas", "plus-circle"]} {...props} />,
};

const FooterBox = ({ name, callback }) => {
  const route = useRoute();

  return (
    <Pressable flex={1} h={110} onPress={() => callback(name)}>
      <Box
        alignItems={"center"}
        pt={3}
        rounded={"md"}
        bg={"white"}
        borderWidth={0}
      >
        <VStack alignItems={"center"} space={1}>
          {iconMap[name]({
            color: route.name === name ? baseColor[800] : baseColor[300],
            fixed: true,
            size: 22,
          })}
          <Text
            fontSize={"sm"}
            color={route.name === name ? "baseColor.800" : "baseColor.300"}
          >
            {name}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

const footers = ["Form", "Division", "Statistics", "Library", "Add"];

const MyFooter = () => {
  const navigation = useNavigation();

  const onPressHandler = (name) => {
    if (footers[navigation.getState().index] === "Form" && name === "Form") {
      DeviceEventEmitter.emit("scrollToTop");
    } else {
      navigation.navigate(name);
    }
  };

  return (
    <HStack space={2} px={2}>
      {footers.map((footer, i) => (
        <FooterBox key={i} name={footer} callback={onPressHandler} />
      ))}
    </HStack>
  );
};

export default MyFooter;
