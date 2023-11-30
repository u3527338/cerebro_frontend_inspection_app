import { Feather } from "@expo/vector-icons";
import _ from "lodash";
import moment from "moment";
import {
  Box,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import LoadingComponent from "../../../components/common/LoadingComponent";
import GlobalHeader from "../../../global/globalHeader";
import GlobalSearchIcon from "../../../global/globalSearchIcon";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import MyFooter from "../../../routes/FooterRoute/MyFooter";
import DateTimePicker from "../EditAndPreviewFormPage/components/edit/DateTimePicker";
import { parserResultArea } from "./components/parserResponseHelper";
import PieChartArea from "./components/PieChartArea";
import StackedBarChartExample from "./components/stackBar";
import TotalSubmitChartArea from "./components/TotalSubmitChartArea";

const activeState = ["completed", "pending", "rejected"];
const LocalModal = ({ isOpen, onClose, children, ...props }) => (
  <Modal
    isVisible={isOpen}
    onBackdropPress={onClose}
    animationIn={"slideInRight"}
    animationOut={"slideOutRight"}
    backdropColor={"transparent"}
    onSwipeComplete={onClose}
    swipeDirection={"right"}
    propagateSwipe={true}
    style={{ margin: 0 }}
    {...props}
  >
    <Center>
      <Box
        w={"100%"}
        h={"85%"}
        bg={"white"}
        ml={8}
        shadow={2}
        borderLeftRadius={8}
        p={5}
      >
        {children}
      </Box>
    </Center>
  </Modal>
);

const LocalHeader = ({ title, isPressed }) => (
  <HStack justifyContent={"space-between"} alignItems={"center"}>
    <Text
      color={"gray.900"}
      bold
      w="90%"
      // numberOfLines={1}
      ellipsizeMode="middle"
    >
      {title}
    </Text>
    <Box
      opacity={isPressed ? 0.75 : 1}
      bg={"primary.500"}
      p={0.5}
      borderRadius={3}
    >
      <Icon as={Feather} name="bar-chart-2" size={4} color={"white"} />
    </Box>
  </HStack>
);

const Card = ({ number, title, color, width = "50%" }) => (
  <VStack w={width} alignItems={"center"} borderWidth={0}>
    <Text fontSize={"3xl"} color={color}>
      {number}
    </Text>
    <Text fontSize={12} color={"gray.500"}>
      {title}
    </Text>
  </VStack>
);

const TotalNumberArea = ({ data }) => {
  const layout = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const [highLight, setHighLight] = useState("completed");
  const [highLightItem, setHighLightItem] = useState("");

  let weeklyArea = Array(7).fill(0);
  data.weekly_submit.map(
    (item) =>
      (weeklyArea[7 - moment().diff(moment(item.date), "days")] = item.count)
  );

  let totalNumberArea = { pending: 0, completed: 0, rejected: 0 };
  let pieChartArea = {};
  data.total.map((item) => {
    if (activeState.includes(item.state))
      totalNumberArea[item.state] += item.count;
    pieChartArea = parserResultArea(pieChartArea, item);
  });

  const onCloseHandler = () => setIsOpen(false);

  return (
    <VStack p={4} borderRadius={6} space={3} bg={"white"} shadow={3}>
      <Pressable onPress={() => setIsOpen(true)}>
        {({ isPressed }) => (
          <LocalHeader
            title={
              "Total Inspection Form (Up to " +
              moment().format("YYYY-MM-DD") +
              ")"
            }
            isPressed={isPressed}
          />
        )}
      </Pressable>

      <Flex flexWrap={"wrap"} flexDirection={"row"}>
        <Card
          number={_.sumBy(activeState.map((state) => totalNumberArea[state]))}
          title={"Submitted"}
          color={"gray.900"}
        />
        <Card
          number={totalNumberArea.pending}
          title={"Pending"}
          color={"#FFD658"}
        />
        <Card
          number={totalNumberArea.completed}
          title={"Completed"}
          color={"#44CEF7"}
        />
        <Card
          number={totalNumberArea.rejected}
          title={"Rejected"}
          color={"#FF6480"}
        />
      </Flex>

      <LocalModal
        isOpen={isOpen}
        onClose={onCloseHandler}
        children={
          <VStack space={5}>
            <Pressable onPress={onCloseHandler}>
              <HStack alignItems={"center"} space={4}>
                <Box opacity={1} bg={"primary.500"} p={0.5} borderRadius={3}>
                  <Icon
                    as={Feather}
                    name="bar-chart-2"
                    size={4}
                    color={"white"}
                  />
                </Box>
                <Text color={"gray.400"}>
                  Up To ( {moment().format("YYYY/MM/DD")} )
                </Text>
              </HStack>
            </Pressable>

            <VStack>
              <Text color={"gray.800"}>Total Submitted Inspection Form</Text>
              <Center>
                <TotalSubmitChartArea data={weeklyArea} />
              </Center>
            </VStack>

            <VStack space={3} mt={3}>
              <ScrollView horizontal>
                <HStack space={3}>
                  {activeState.map((key, i) => (
                    <Pressable key={i} onPress={() => setHighLight(key)}>
                      <Box
                        bg={highLight === key ? "gray.200" : "transparent"}
                        px={2}
                        borderRadius={4}
                      >
                        <Text color={"gray.800"} textTransform={"capitalize"}>
                          {key}
                        </Text>
                      </Box>
                    </Pressable>
                  ))}
                </HStack>
              </ScrollView>

              <HStack>
                <PieChartArea
                  inputData={pieChartArea}
                  highLight={highLight}
                  highLightItem={highLightItem}
                  setHighLightItem={setHighLightItem}
                />

                <ScrollView
                  h={layout.width * 0.5}
                  m={2}
                  showsVerticalScrollIndicator={false}
                >
                  {Object.keys(pieChartArea).map((item) => (
                    <Pressable onPress={() => setHighLightItem(item)}>
                      <Box
                        bg={highLightItem === item ? "gray.200" : "transparent"}
                        p={1}
                        borderRadius={4}
                      >
                        <Text color={"gray.500"} textTransform={"capitalize"}>
                          {item}
                        </Text>
                      </Box>
                    </Pressable>
                  ))}
                </ScrollView>
              </HStack>
            </VStack>
          </VStack>
        }
      />
    </VStack>
  );
};

const DataCard = ({ item }) => (
  <VStack>
    <Text color={"secondary.500"} textTransform={"capitalize"}>
      {item.title}
    </Text>
    <Text color={"secondary.500"} textAlign={"right"} sub>
      {item.completed + item.rejected + item.pending + item.overdue} Submissions
    </Text>
    <HStack justifyContent={"space-between"}>
      <Card
        number={item.completed}
        color={"#3FB6B6"}
        title={"Completed"}
        width={"auto"}
      />
      <Card
        number={item.rejected}
        color={"#FF6480"}
        title={"Rejected"}
        width={"auto"}
      />
      <Card
        number={item.pending}
        color={"#44CEF7"}
        title={"Pending"}
        width={"auto"}
      />
      <Card
        number={item.overdue}
        color={"gray.600"}
        title={"Overdue"}
        width={"auto"}
      />
    </HStack>
    <Divider mt={3} bg={"gray.300"} />
  </VStack>
);

const ColorTag = ({ title, color }) => (
  <HStack alignItems={"center"} justifyContent={"center"} space={2}>
    <Box bg={color} w={3} h={3} />
    <Text color={"gray.500"} fontSize={12}>
      {title}
    </Text>
  </HStack>
);

const StaticArea = ({ data, control, setDateRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseHandler = () => setIsOpen(false);

  const date = useWatch({
    control,
    name: "date",
  });

  useEffect(() => {
    if (date) {
      setDateRange(date);
    }
  }, [date]);
  console.log(date);
  let resultArea = {};
  console.log("data.result", data.result);
  data.result.map((item) => {
    resultArea = parserResultArea(resultArea, item);
  });
  console.log("resultArea", resultArea);
  return (
    <VStack p={4} borderRadius={6} space={2} bg={"white"} shadow={3} h={"75%"}>
      <Pressable onPress={() => setIsOpen(true)}>
        {({ isPressed }) => (
          <LocalHeader
            title={"Result of submitted Form"}
            isPressed={isPressed}
          />
        )}
      </Pressable>
      <DateTimePicker
        control={control}
        detail={{
          disabled: false,
          key: "date",
          infinite: true,
        }}
      />
      {Object.keys(resultArea).length === 0 ? (
        <Center flex={1}>
          <Text color={"gray.400"}>No Data Found</Text>
        </Center>
      ) : (
        <FlatList
          data={Object.keys(resultArea).map((key) => {
            return { ...resultArea[key], title: key };
          })}
          renderItem={DataCard}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <Box h={3} />}
          ListFooterComponent={() => <Box h={8} />}
          showsVerticalScrollIndicator={false}
        />
      )}
      <LocalModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <VStack space={5}>
            <Pressable onPress={onCloseHandler}>
              <HStack alignItems={"center"} space={4}>
                <Box opacity={1} bg={"primary.500"} p={0.5} borderRadius={3}>
                  <Icon
                    as={Feather}
                    name="bar-chart-2"
                    size={4}
                    color={"white"}
                  />
                </Box>
                <Text color={"gray.400"}>
                  {date
                    ?.split(",")
                    .map((d) => moment(d).format("DD/MM/YYYY"))
                    .join(" - ")}
                </Text>
              </HStack>
            </Pressable>
            <VStack space={2}>
              <Text color={"gray.800"}>Result of Submitted Form</Text>
              <HStack justifyContent={"space-between"} pr={3}>
                <ColorTag title={"Completed"} color={"#3FB6B6"} />
                <ColorTag title={"Rejected"} color={"#FF6480"} />
                <ColorTag title={"Pending"} color={"#44CEF7"} />
                <ColorTag title={"Overdue"} color={"#FFD658"} />
              </HStack>
            </VStack>

            <StackedBarChartExample
              data={Object.keys(resultArea).map((key) => {
                return { ...resultArea[key], title: key };
              })}
            />
          </VStack>
        }
      />
    </VStack>
  );
};

const Body = () => {
  const { useStatisticsQuery } = useDefaultAPI();

  const [dateRange, setDateRange] = useState(
    `${new Date().toISOString()},${new Date().toISOString()}`
  );

  const { data, isFetching, error } = useStatisticsQuery({
    created_at: dateRange,
  });

  const { control } = useForm({
    defaultValues: {
      date: dateRange,
    },
  });

  return (
    <>
      {isFetching ? (
        <Center flex={1}>
          <LoadingComponent />
        </Center>
      ) : error ? (
        <Center flex={1}>
          <Text color="baseColor.200" fontSize="md">
            {error.message || "Error Fetching Statistics"}
          </Text>
        </Center>
      ) : (
        <VStack flex={1} p={4} space={3}>
          <TotalNumberArea data={data} />
          <StaticArea
            data={data}
            control={control}
            setDateRange={setDateRange}
          />
        </VStack>
      )}
    </>
  );
};

const StatisticsPage = () => {
  return (
    <>
      <GlobalHeader RightIcon={<GlobalSearchIcon />} />
      <VStack flex={1}>
        <Flex flex={1}>
          <Body />
        </Flex>
        <Flex bg={"white"} marginTop={2} shadow={2}>
          <MyFooter />
        </Flex>
      </VStack>
    </>
  );
};

export default StatisticsPage;
