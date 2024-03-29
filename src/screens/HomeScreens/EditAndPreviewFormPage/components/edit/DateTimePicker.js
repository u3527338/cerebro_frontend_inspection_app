import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { dateConverter } from "../../../../../global/function";
import baseColor from "../../../../../themes/colors/baseColor";

const milliseconds = 24 * 60 * 60 * 1000;

const getAppendedDate = (dateString = null, dayToAdd) =>
  new Date(new Date(dateString).getTime() + dayToAdd * milliseconds);

const TimePicker = ({
  open,
  title,
  setOpen,
  setDate,
  date,
  validRange,
  setTime,
  time,
}) => {
  const [timePicker, setTimePicker] = useState(false);
  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      setTimePicker(true);
    },
    [setOpen, setDate]
  );

  const onDismiss = useCallback(() => {
    setTimePicker(false);
  }, [setTimePicker]);

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setTimePicker(false);
      setTime({ hours, minutes });
    },
    [setTimePicker, setTime]
  );

  return (
    <>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        uppercase
        label={title || "Date"}
        presentationStyle="pageSheet"
        date={date}
        validRange={validRange}
      />
      <TimePickerModal
        visible={timePicker}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={time?.hours}
        minutes={time?.minutes}
      />
    </>
  );
};

const MyDateTimePicker = ({ detail, form, disabled }) => {
  const { watch, control } = form;

  const linkage = detail?.interaction?.linkage;
  const backday = detail.backday || 5;

  const [validStartDate, setValidStartDate] = useState(
    detail.infinite ? null : getAppendedDate(null, -backday)
  );

  const watchValue = useWatch({
    control,
    name: linkage?.parent?.key,
  });

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        const [open, setOpen] = useState(false);

        useEffect(() => {
          onChange(`${dateConverter(new Date())}`);
        }, []);

        useEffect(() => {
          if (!!linkage?.parent?.key) {
            const parentValue = watch(linkage?.parent?.key);
            const startDate = getAppendedDate(
              `${parentValue}`,
              linkage?.child.dayAfter
            );
            onChange(`${dateConverter(startDate)}`);
            setValidStartDate(startDate);
          }
        }, [watchValue]);

        return (
          <Box p={2} pb={0}>
            <TimePicker
              open={open}
              setOpen={setOpen}
              setDate={(date) => onChange(`${dateConverter(date)}`)}
              setTime={(time) =>
                onChange(
                  `${dateConverter(
                    new Date(value).setHours(time.hours, time.minutes)
                  )}`
                )
              }
              date={new Date(value)}
              validRange={{
                startDate: new Date(validStartDate),
              }}
            />

            <Pressable
              p={2}
              px={3}
              borderRadius={5}
              borderWidth={1}
              borderColor="baseColor.400"
              style={{
                backgroundColor: disabled ? baseColor[100] : "transparent",
                opacity: disabled ? 0.5 : 1,
              }}
              onPress={() => {
                setOpen(true);
              }}
              disabled={disabled}
            >
              <HStack justifyContent="space-between" alignItems={"center"}>
                <Text color={"baseColor.400"}>
                  {`${dateConverter(value, "lll")}`}
                </Text>
                {!disabled && (
                  <Icon
                    size={"md"}
                    as={<MaterialCommunityIcons name="calendar-edit" />}
                    color="secondary.400"
                  />
                )}
              </HStack>
            </Pressable>
          </Box>
        );
      }}
    />
  );
};

export default memo(MyDateTimePicker);
