import moment from "moment";
import { Box, HStack, Text, VStack } from "native-base";
import { memo } from "react";
import { CardLabel } from "./CardLabel";

const TextBox = ({ content = "", title = "" }) => {
  return (
    <VStack>
      <Text
        noOfLines={1}
        ellipsizeMode={"clip"}
        fontSize={"xs"}
        color={"baseColor.200"}
      >
        {title}
      </Text>
      <Text
        noOfLines={1}
        ellipsizeMode={"tail"}
        fontSize={"sm"}
        color={"baseColor.500"}
      >
        {content}
      </Text>
    </VStack>
  );
};

const CardHeader = ({ detail }) => (
  <VStack space={1} pt={3}>
    <HStack justifyContent={"space-between"} alignItems={"center"}>
      <Box px={3}>
        <TextBox content={detail.ref_num} title={"Ref Number"} />
      </Box>

      <CardLabel
        resubmitted={detail.resubmitted}
        returned={detail.returnTo}
        withConditions={detail.withCondition}
      />
    </HStack>

    <VStack mx={3} p={2} rounded={"md"} space={1} shadow={1} bg={"white"}>
      <TextBox
        content={`${detail.location}${
          detail.data.LocationRe ? " - " + detail.data.LocationRe : ""
        }`}
        title={"Location"}
      />
      <TextBox
        content={`${detail.work}${
          detail.data.WorkTobeInspectedRe
            ? " - " + detail.data.WorkTobeInspectedRe
            : ""
        }`}
        title={"Work"}
      />
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <TextBox
          content={moment(detail.created_at).format("YYYY/MM/DD HH:mm")}
          title={"created at"}
        />
        <TextBox
          content={moment(detail.data.DateScheduled).format("YYYY/MM/DD HH:mm")}
          title={"scheduled at"}
        />
      </HStack>
    </VStack>
  </VStack>
);

export default memo(CardHeader);
