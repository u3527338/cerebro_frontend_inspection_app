import moment from "moment";
import { Box, HStack, Text, VStack } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const FormattedPreview = ({ date, label }) => {
  return (
    <HStack>
      <VStack w={"50%"}>
        <Text color={"gray.400"} fontSize={12}>
          {`${label} Date`}
        </Text>
        <Text color={"baseColor.500"} fontSize={"md"}>
          {date.format("YYYY / MM / DD")}
        </Text>
      </VStack>
      <VStack w={"50%"}>
        <Text color={"gray.400"} fontSize={12}>
          {`${label} Time`}
        </Text>
        <Text color={"baseColor.500"} fontSize={"md"}>
          {date.format("HH : mm")}
        </Text>
      </VStack>
    </HStack>
  );
};

const DateTimePreview = ({ detail, control }) => {
  const rangeLabel = ["Start", "End"];
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        const isRange = value?.split(",")?.length > 1;
        const dates = value?.split(",")?.map((date, i) => ({
          date: moment(date),
          label: isRange ? rangeLabel[i] : "",
        }));

        return (
          <Box p={2}>
            {!!dates ? (
              dates?.map((date, i) => (
                <FormattedPreview key={i} date={date.date} label={date.label} />
              ))
            ) : (
              <Text bold color="secondary.400">
                No date
              </Text>
            )}
          </Box>
        );
      }}
    />
  );
};

export default memo(DateTimePreview);
