import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Box, Text } from "native-base";
import { memo, useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, RefreshControl } from "react-native";
import useDefaultAPI from "../../../../hocks/useDefaultAPI";
import Card from "./Card";

const getData = (response_data) => {
  if (!response_data) return [];
  return response_data.results.map((item) => ({
    ...item,
    is_over_due:
      item.state === "pending"
        ? item.response <
          Math.round((new Date().getTime() - new Date(item.created_at)) / 1000)
        : item.runtime > item.response,
  }));
};

const FormList = ({ tabName = "", currentTabName }) => {
  const navigator = useNavigation();
  const route = useRoute();
  console.log(route);
  const { useTaskListByStatusQuery } = useDefaultAPI();
  const [page, setPage] = useState(0);
  const [listData, setListData] = useState([]);
  const flashListRef = useRef();

  const initPage = () => {
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const default_filter = {
    page_size: 5,
    page: page,
    state: tabName === "My Task" ? "all" : tabName.toLowerCase(),
  };

  const { data, isFetching, error, refetch } = useTaskListByStatusQuery({
    status: tabName,
    params: default_filter,
    enabled: currentTabName === tabName,
  });

  const handleScrollToTop = () => {
    if (flashListRef) {
      flashListRef.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  };

  useEffect(() => {
    DeviceEventEmitter.addListener("scrollToTop", handleScrollToTop);
    return () => {
      DeviceEventEmitter.removeAllListeners("scrollToTop");
    };
  }, []);

  useEffect(() => {
    setListData(getData(data?.data));
  }, [currentTabName]);

  useEffect(() => {
    if (page === 1) {
      setListData(getData(data?.data));
    } else if (listData.length < data?.data?.count) {
      setListData((prevState) => [...prevState, ...getData(data?.data)]);
    }
  }, [page, data]);

  const keyExtractor = (item, index) => `${item.state}_${item.id}_${index}`;
  const ListEmptyComponent = () => (
    <Text textAlign={"center"} color={"gray.500"}>
      {isFetching
        ? "Now Loading"
        : !!error
        ? "Error Fetching Data"
        : "No Data Found"}
    </Text>
  );

  return (
    <Box w="100%" h="100%">
      <FlashList
        ref={flashListRef}
        data={listData}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <Card item={item} navigator={navigator} />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={initPage} />
        }
        estimatedItemSize={436}
        onEndReached={handleNextPage}
        onEndReachedThreshold={1}
        ListEmptyComponent={ListEmptyComponent}
      />
    </Box>
  );
};

export default memo(FormList);
