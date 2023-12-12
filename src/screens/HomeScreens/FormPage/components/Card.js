import { Box, Pressable, VStack } from "native-base";
import { Dimensions } from "react-native";
import CardHeader from "./CardHeader";
import CardStep from "./CardStep";

const windowWidth = Dimensions.get("window").width;

const Card = ({ item, navigator }) => {
  return (
    <Pressable
      onPress={() => navigator.navigate("Preview", { formId: item.id })}
    >
      {({ isPressed }) => (
        <Box
          bg={"white"}
          my={2}
          mx="auto"
          shadow={1}
          borderLeftWidth={3}
          rounded={"xl"}
          w={windowWidth * 0.95}
          maxHeight={420}
          borderColor={item.is_over_due ? "alertColor.500" : "primary.500"}
          opacity={isPressed ? 0.7 : 1}
        >
          <VStack space={2}>
            <CardHeader detail={item} />
            <CardStep flow_data={item.flow_data} from_flow={item.flow.flow} />
          </VStack>
        </Box>
      )}
    </Pressable>
  );
};

export default Card;
