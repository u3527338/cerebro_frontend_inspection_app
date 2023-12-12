import { Box, Text } from "native-base";

const labels = {
  Resubmitted: "#44CEF7",
  Returned: "#FDC034",
  "With Conditions": "#F84F1E",
};

export const CardLabel = ({
  resubmitted = false,
  returned = false,
  withConditions = false,
  ...props
}) => {
  const status = resubmitted
    ? "Resubmitted"
    : returned
    ? "Returned"
    : withConditions
    ? "With Conditions"
    : null;

  if (!status) return null;

  return (
    <Box
      bg={labels[status]}
      pr={4}
      pl={4}
      borderLeftRadius={5}
      py={1}
      shadow={2}
      my={1}
      ml={1}
      {...props}
    >
      <Text textAlign="right">{status}</Text>
    </Box>
  );
};
