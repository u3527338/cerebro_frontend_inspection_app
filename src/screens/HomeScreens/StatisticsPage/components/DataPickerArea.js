import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import {
  Box,
  ChevronDownIcon,
  HStack,
  Modal,
  Pressable,
  Text,
  VStack,
  ZStack,
} from "native-base";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import primary from "../../../../themes/colors/primary";

const DateRangePicker = ({ setStartDate, setEndDate }) => {
  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      if (date) {
        setEndDate(
          date.utcOffset("+0800").set({ hour: 23, minute: 59, second: 59 })
        );
      } else {
        setEndDate("");
      }
    } else {
      setStartDate(
        date.utcOffset("+0800").set({ hour: 0, minute: 0, second: 0 })
      );
      setEndDate("");
    }
  };

  return (
    <Box flex={1}>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="rgb(50,50,50)"
        selectedDayTextColor="rgb(150,150,150)"
        disabledDates={(date) => moment().diff(date, "minutes") < 0}
      />
    </Box>
  );
};

const DateRangePickerSpinner = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onDateChange = (event, date) => {
    console.log(event.type, date);
  };

  return (
    <VStack>
      <Text color={"baseColor.50"} underline fontSize={"md"}>
        Select a Date Range
      </Text>
      <HStack flex={1} py={4} justifyContent={"space-between"}>
        <HStack justifyContent={"flex-start"} alignItems={"flex-end"}>
          <Text color={"baseColor.50"} fontSize={"lg"}>
            From:
          </Text>
          <Box>
            <DateTimePicker
              value={startDate}
              onChange={onDateChange}
              maximumDate={new Date()}
              themeVariant={"dark"}
              accentColor={primary[600]}
            />
          </Box>
        </HStack>

        <HStack justifyContent={"center"} alignItems={"flex-end"}>
          <Text color={"baseColor.50"} fontSize={"lg"}>
            To:
          </Text>
          <DateTimePicker
            value={endDate}
            onChange={onDateChange}
            maximumDate={new Date()}
            themeVariant={"dark"}
            accentColor={primary[600]}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

const DataPickerArea = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);

  const onCloseHandler = () => {
    onClose();
    setShowModal(false);
  };

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        {({ isPressed }) => (
          <VStack my={2} space={2}>
            <Box zIndex={1} position={"absolute"} mx={3} bg={"white"} px={1}>
              <Text color={"gray.400"} fontSize={12}>
                Date
              </Text>
            </Box>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              borderWidth={1}
              borderRadius={4}
              borderColor={"gray.200"}
              p={2}
              opacity={isPressed ? 0.75 : 1}
            >
              <Text color={"gray.500"} fontSize={"md"} px={2} py={1}>
                {startDate ? startDate.format("DD/MM/YYYY") : ""} -{" "}
                {endDate ? endDate.format("DD/MM/YYYY") : ""}
              </Text>
              <ChevronDownIcon size={6} color={"gray.600"} />
            </HStack>
          </VStack>
        )}
      </Pressable>

      <Modal isOpen={showModal} onClose={onCloseHandler}>
        <Modal.Content width="95%" bg={"rgba(0,0,0,0.6)"}>
          <Modal.Body>
            {/*<DateRangePicker setStartDate={setStartDate}*/}
            {/*                 setEndDate={setEndDate}*/}
            {/*/>*/}
            <DateRangePickerSpinner
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DataPickerArea;
