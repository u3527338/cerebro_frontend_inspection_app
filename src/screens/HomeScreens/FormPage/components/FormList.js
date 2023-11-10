import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import useAxios from "axios-hooks";
import moment from "moment";
import {
  Box,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, RefreshControl } from "react-native";
import { AuthContext } from "../../../../context/authContext";
import { StateContext } from "../../../../context/stateContext";
import useDefaultAPI from "../../../../hocks/useDefaultAPI";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReturnLabel = ({ ...props }) => (
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
const WithConditionLabel = ({ ...props }) => (
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
const ReSubmitLabel = ({ ...props }) => (
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

const CardHeader = memo(({ detail }) => (
  <VStack space={1} pt={3}>
    <HStack justifyContent={"space-between"} alignItems={"center"}>
      <Box px={3}>
        <TextBox content={detail.ref_num} title={"Ref Number"} />
      </Box>

      {detail.resubmitted ? <ReSubmitLabel /> : null}
      {detail.returnTo ? <ReturnLabel /> : null}
      {detail.withCondition ? <WithConditionLabel /> : null}
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
));

const FormList = ({ tabName = "" }) => {
  const { currentProject, currentCategory, globalFilter } =
    useContext(StateContext);
  const { token } = useContext(AuthContext);
  const { getMytaskList, getFormDataList } = useDefaultAPI();
  const navigator = useNavigation();

  const [content, setContent] = useState([]);
  const [isMount, setIsMount] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [{ loading }, execute_get] = useAxios(
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    },
    { manual: true }
  );

  const onRefreshHandler = () => {
    setContent([]);
    makeRequest(1);
  };

  const getNextPage = () => {
    if (content.length > 0 && nextPage !== null && !isLoading) {
      setIsLoading(true);
      execute_get({ url: nextPage })
        .then((response) => handleResult(response.data))
        .finally(() => setIsLoading(false));
    }
  };

  const handleResult = (response_data) => {
    if (response_data.results) {
      const data = response_data.results.map((item) => ({
        ...item,
        is_over_due:
          item.state === "pending"
            ? item.response <
              Math.round(
                (new Date().getTime() - new Date(item.created_at)) / 1000
              )
            : item.runtime > item.response,
        // step_component: get_form_flow_component(item.flow_data, item.flow.flow)
      }));

      setContent((prevState) => [...prevState, ...data]);
    }

    setNextPage(response_data.next);
    setPrevPage(response_data.previous);
  };

  const makeRequest = (page = null) => {
    setIsLoading(true);

    const default_filter = {
      page_size: 15,
      page: page ? 1 : 1,
      state: tabName === "My Task" ? "all" : tabName.toLowerCase(),
    };

    if (tabName === "My Task") {
      getMytaskList(default_filter)
        .then((response) => {
          handleResult(response.data);
        })
        .finally(() => setIsLoading(false));
    } else {
      getFormDataList(default_filter)
        .then((response) => {
          handleResult(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    setContent([]);
    setIsMount(false);

    if (currentProject.project?.id && currentCategory.id) {
      setIsMount(true);
      makeRequest();
    }
  }, [currentProject, currentCategory, globalFilter]);

  const StepComponent = ({ flow_data, from_flow }) => {
    return (
      <>
        {from_flow?.map((step, index) => (
          <Pressable key={index}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              space={2}
            >
              <HStack flex={2} space={2}>
                <VStack
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    rounded={"2xl"}
                    w={6}
                    h={6}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={
                      flow_data.length === index
                        ? "primary.500"
                        : "baseColor.300"
                    }
                  >
                    <Text
                      textAlign={"center"}
                      color={
                        flow_data.length === index
                          ? "baseColor.300"
                          : "primary.50"
                      }
                    >
                      {index + 1}
                    </Text>
                  </Box>
                </VStack>

                <Box flex={2}>
                  {flow_data.length > index ? (
                    <Text fontSize={"xs"} color={"baseColor.500"}>
                      {flow_data[index].title}
                    </Text>
                  ) : (
                    <Text fontSize={"xs"} color={"baseColor.500"}>
                      {typeof step.role === "string"
                        ? step.role
                        : step.role.join(" / ")}
                    </Text>
                  )}
                </Box>
              </HStack>

              <Box flex={5}>
                {flow_data.length > index ? (
                  <HStack
                    alignItems={"center"}
                    justifyContent={"center"}
                    space={2}
                  >
                    <Text
                      flex={1}
                      color={"baseColor.400"}
                      fontSize={"xs"}
                      textAlign={"center"}
                    >
                      {flow_data[index].name}
                    </Text>
                    <Text
                      flex={1}
                      color={"baseColor.200"}
                      textAlign={"right"}
                      fontSize={"xs"}
                    >
                      {moment(flow_data[index].time).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </HStack>
                ) : null}
              </Box>
            </HStack>
            {index < from_flow.length - 1 ? (
              <HStack py={1}>
                <HStack flex={2} space={2}>
                  <Box flex={1} alignItems={"center"}>
                    <Icon
                      as={<FontAwesome name={"angle-down"} />}
                      color={"baseColor.200"}
                      size={"sm"}
                      textAlign={"center"}
                    />
                  </Box>
                  <Box flex={2} />
                </HStack>
                <Box flex={5} />
              </HStack>
            ) : null}
          </Pressable>
        ))}
      </>
    );
  };

  const CardStep = memo(({ flow_data, from_flow }) => {
    return (
      <ScrollView
        h={210}
        mx={1}
        mr={2}
        mb={4}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <VStack m={2} space={0}>
          <StepComponent from_flow={from_flow} flow_data={flow_data} />
        </VStack>
      </ScrollView>
    );
  });

  const Card = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => navigator.navigate("Preview", { formId: item.id })}
      >
        {({ isPressed }) => (
          <Box
            bg={"white"}
            my={2}
            mx="auto"
            shadow={1}
            borderLeftWidth={3}
            rounded={"xl"}
            w={windowWidth * 0.95}
            maxHeight={420}
            borderColor={item.is_over_due ? "alertColor.500" : "primary.500"}
            opacity={isPressed ? 0.7 : 1}
          >
            <VStack space={2}>
              <CardHeader detail={item} />
              {/*<CardStep step_component={item.step_component}/>*/}
              <CardStep flow_data={item.flow_data} from_flow={item.flow.flow} />
            </VStack>
          </Box>
        )}
      </Pressable>
    ),
    []
  );

  const keyExtractor = (item) => `${item.state}_${item.id}`;
  const ListEmptyComponent = () => (
    <Text textAlign={"center"} color={"gray.500"}>
      {isLoading ? "Now Loading" : "No Data Found"}
    </Text>
  );

  return (
    <>
      {/* {isMount && ( */}
      <Box w="100%" h="100%">
        <FlashList
          data={content}
          keyExtractor={keyExtractor}
          renderItem={Card}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefreshHandler}
            />
          }
          estimatedItemSize={436}
          onEndReached={getNextPage}
          onEndReachedThreshold={1}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Box>
      {/* )} */}
    </>
  );
};

export default memo(FormList);
