import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform } from "react-native";

const getDayOffset = (date, backDay, dayAfter) => {
  if (typeof backDay === "number") {
    return date.getDate() - backDay;
  }
  if (typeof dayAfter === "number") {
    return date.getDate() + dayAfter;
  }
  return date.getDate() - 5;
};

export default function MyDateTimePicker({ control, name }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // const [minDate, setMinDate] = useState(getDayOffset(date, items.backday, null))

  const onDateChange = (event, selectedDate, onFormChange) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");

    onFormChange(selectedDate);
    // console.log(currentDate.toISOString())
    // props.values[items.key] = currentDate.toISOString()
    // props.setFieldValue(name, currentDate.toISOString())
  };

  const showMode = (currentMode) => {
    setShow(mode !== currentMode || !show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <VStack space={1}>
          <Text color={"baseColor.400"}>Photo Date</Text>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={3}
            space={4}
          >
            <Pressable onPress={showDatepicker} flex={2}>
              <Box
                borderRadius={4}
                borderWidth={1}
                py={2}
                bg={"coolGray.50"}
                borderColor={"coolGray.400"}
              >
                <Text color={"coolGray.800"} textAlign={"center"}>
                  {value
                    ? `${value.getDate()} / ${
                        value.getMonth() + 1
                      } / ${value.getFullYear()}`
                    : null}
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={showTimepicker} flex={1}>
              <Box
                borderRadius={4}
                borderWidth={1}
                py={2}
                bg={"coolGray.50"}
                borderColor={"coolGray.400"}
              >
                <Text textAlign={"center"} color={"coolGray.800"}>
                  {value
                    ? `${value.getHours()} : ${
                        (value.getMinutes() < 10 ? "0" : "") +
                        value.getMinutes()
                      }`
                    : null}
                </Text>
              </Box>
            </Pressable>
          </HStack>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value ? value : new Date()}
              mode={mode}
              is24Hour={true}
              display="spinner"
              textColor="black"
              onChange={(event, selectedDate) =>
                onDateChange(event, selectedDate, onChange)
              }
            />
          )}
        </VStack>
      )}
    />
  );
}
