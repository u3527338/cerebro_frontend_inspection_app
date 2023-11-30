import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import React, { memo, useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePickerModal } from "react-native-paper-dates";
import baseColor from "../../../../../themes/colors/baseColor";

const dateConverter = (date, formatter = null) =>
  formatter
    ? moment(date).format(formatter)
    : moment(date).toDate().toISOString();

const TimePicker = ({ open, setOpen, title, onChange, validRange }) => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      onChange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  return (
    <DatePickerModal
      locale="en"
      mode="range"
      visible={open}
      onDismiss={onDismiss}
      startDate={range.startDate}
      endDate={range.endDate}
      onConfirm={onConfirm}
      uppercase
      label={title || "Date"}
      startLabel={null}
      endLabel={null}
      presentationStyle="pageSheet"
      validRange={validRange}
    />
  );
};

const MyDateTimePicker = ({ control, detail }) => {
  const backday = detail.backday || 5;
  const milliseconds = 24 * 60 * 60 * 1000;
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <TimePicker
              open={open}
              setOpen={setOpen}
              onChange={(range) => {
                onChange(
                  `${dateConverter(range.startDate)},${dateConverter(
                    range.endDate
                  )}`
                );
              }}
              validRange={{
                startDate: detail.infinite
                  ? null
                  : new Date(new Date().getTime() - backday * milliseconds),
              }}
            />

            <Box
              p={2}
              px={3}
              borderRadius={5}
              borderWidth={1}
              borderColor="baseColor.400"
              style={{
                backgroundColor: !!detail.disabled
                  ? baseColor[100]
                  : "transparent",
                opacity: !!detail.disabled ? 0.5 : 1,
              }}
            >
              <HStack justifyContent="space-between" alignItems={"center"}>
                <Text color={"baseColor.400"}>
                  {`${dateConverter(
                    value?.split(",")[0],
                    "ll"
                  )} - ${dateConverter(value?.split(",")[1], "ll")}`}
                </Text>
                {!detail.disabled && (
                  <Pressable
                    onPress={() => {
                      setOpen(true);
                    }}
                    disabled={!!detail.disabled}
                    p={1}
                    borderRadius={4}
                    _pressed={{ backgroundColor: "primary.100" }}
                  >
                    <Icon
                      size={"md"}
                      as={<MaterialCommunityIcons name="calendar-edit" />}
                      color="secondary.400"
                    />
                  </Pressable>
                )}
              </HStack>
            </Box>
          </>
        );
      }}
    />
  );
};

export default memo(MyDateTimePicker);
