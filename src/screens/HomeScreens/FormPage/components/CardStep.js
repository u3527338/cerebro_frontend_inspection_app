import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import {
  Box,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { memo } from "react";

const StepComponent = ({ flow_data, from_flow }) => {
  return (
    <>
      {from_flow?.map((step, index) => (
        <Pressable key={index}>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            space={2}
          >
            <HStack flex={2} space={2}>
              <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
                <Box
                  rounded={"2xl"}
                  w={6}
                  h={6}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={
                    flow_data.length === index ? "primary.500" : "baseColor.300"
                  }
                >
                  <Text
                    textAlign={"center"}
                    color={
                      flow_data.length === index
                        ? "baseColor.300"
                        : "primary.50"
                    }
                  >
                    {index + 1}
                  </Text>
                </Box>
              </VStack>

              <Box flex={2}>
                {flow_data.length > index ? (
                  <Text fontSize={"xs"} color={"baseColor.500"}>
                    {flow_data[index].title}
                  </Text>
                ) : (
                  <Text fontSize={"xs"} color={"baseColor.500"}>
                    {typeof step.role === "string"
                      ? step.role
                      : step.role.join(" / ")}
                  </Text>
                )}
              </Box>
            </HStack>

            <Box flex={5}>
              {flow_data.length > index ? (
                <HStack
                  alignItems={"center"}
                  justifyContent={"center"}
                  space={2}
                >
                  <Text
                    flex={1}
                    color={"baseColor.400"}
                    fontSize={"xs"}
                    textAlign={"center"}
                  >
                    {flow_data[index].name}
                  </Text>
                  <Text
                    flex={1}
                    color={"baseColor.200"}
                    textAlign={"right"}
                    fontSize={"xs"}
                  >
                    {moment(flow_data[index].time).format("YYYY-MM-DD HH:mm")}
                  </Text>
                </HStack>
              ) : null}
            </Box>
          </HStack>
          {index < from_flow.length - 1 ? (
            <HStack py={1}>
              <HStack flex={2} space={2}>
                <Box flex={1} alignItems={"center"}>
                  <Icon
                    as={<FontAwesome name={"angle-down"} />}
                    color={"baseColor.200"}
                    size={"sm"}
                    textAlign={"center"}
                  />
                </Box>
                <Box flex={2} />
              </HStack>
              <Box flex={5} />
            </HStack>
          ) : null}
        </Pressable>
      ))}
    </>
  );
};

const CardStep = ({ flow_data, from_flow }) => {
  return (
    <ScrollView
      h={210}
      mx={1}
      mr={2}
      mb={4}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      <VStack m={2} space={0}>
        <StepComponent from_flow={from_flow} flow_data={flow_data} />
      </VStack>
    </ScrollView>
  );
};

export default memo(CardStep);
