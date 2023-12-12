import { Box, Text } from "native-base";

export const ReturnLabel = ({ ...props }) => (
  <Box
    bg={"#FDC034"}
    pr={4}
    pl={4}
    borderLeftRadius={5}
    py={1}
    shadow={2}
    my={1}
    ml={1}
    {...props}
  >
    <Text textAlign={"right"}>Returned</Text>
  </Box>
);
export const WithConditionLabel = ({ ...props }) => (
  <Box
    bg={"#F84F1E"}
    pr={4}
    pl={4}
    borderLeftRadius={5}
    py={1}
    shadow={2}
    my={1}
    ml={1}
    {...props}
  >
    <Text textAlign={"right"}>With Conditions</Text>
  </Box>
);
export const ReSubmitLabel = ({ ...props }) => (
  <Box
    bg={"#44CEF7"}
    pr={4}
    pl={4}
    borderLeftRadius={5}
    py={1}
    shadow={2}
    my={1}
    ml={1}
    {...props}
  >
    <Text textAlign={"right"}>Resubmitted</Text>
  </Box>
);
