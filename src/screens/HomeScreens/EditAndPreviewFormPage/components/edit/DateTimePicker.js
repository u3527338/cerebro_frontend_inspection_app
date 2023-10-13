import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React, { memo, useCallback, useContext, useState } from "react";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SystemContext } from "../../../../../context/systemContext";
import primary from "../../../../../themes/colors/primary";
import secondary from "../../../../../themes/colors/secondary";
import { DatePickerModal } from "react-native-paper-dates";
import _ from "lodash";

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
              title={_.startCase(detail.session)}
              onChange={(range) => {
                onChange(
                  `${dateConverter(range.startDate)},${dateConverter(
                    range.endDate
                  )}`
                );
              }}
              validRange={{
                startDate: new Date(),
                endDate: new Date(
                  new Date().getTime() + backday * milliseconds
                ),
              }}
            />
            <Pressable
              p={2}
              borderRadius={8}
              _pressed={{ backgroundColor: primary[100] }}
              underlayColor={secondary[600]}
              onPress={() => {
                setOpen(true);
              }}
            >
              <HStack justifyContent="space-between" alignItems={"center"}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {_.startCase(detail.session)}
                </Text>

                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={18}
                  color="white"
                />
              </HStack>
            </Pressable>
            <Box mt={2} p={2} px={3} borderRadius={5} bg={primary[200]}>
              <Text width="100%" color={"baseColor.400"}>
                {`${dateConverter(
                  value?.split(",")[0],
                  "ll"
                )} - ${dateConverter(value?.split(",")[1], "ll")}`}
              </Text>
            </Box>
          </>
        );
      }}
    />
  );
};

export default memo(MyDateTimePicker);
