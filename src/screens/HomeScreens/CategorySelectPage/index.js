import {
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../context/stateContext";
import { uniqBy } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import LoadingComponent from "../../../components/common/LoadingComponent";

const CategoryCard = ({ detail, callback }) => {
  return (
    <Pressable onPress={() => callback(detail)}>
      {({ isPressed }) => {
        return (
          <Stack
            px={3}
            py={2}
            rounded={"md"}
            h={110}
            bg={"rgba(130,130,130,0.8)"}
            justifyContent={"space-between"}
            opacity={isPressed ? 0.5 : 1}
            transform={[
              {
                scale: isPressed ? 0.96 : 1,
              },
            ]}
          >
            {/*<HStack space={2} alignItems={"center"}>*/}
            {/*<Text fontSize={"xl"} color={"baseColor.500"}>{detail.category.division.name}</Text>*/}
            <HStack space={2}>
              <Text flex={1} fontSize={"lg"}>
                {detail.category.inspection.name} inspection
              </Text>
              <Text flex={1} fontSize={"lg"}>
                ({detail.category.team.name})
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text flex={3} fontSize={"sm"}>
                Permission:{" "}
                <Text fontSize={"md"}>{detail.permission.description}</Text>
              </Text>
              <Text
                flex={1}
                textAlign={"right"}
                fontSize={"sm"}
                color={"baseColor.50"}
              >
                {detail.category.division.name}
              </Text>
            </HStack>
          </Stack>
        );
      }}
    </Pressable>
  );
};

const CategorySelectPage = () => {
  const navigation = useNavigation();

  const {
    currentProject,
    currentCategory,
    setCurrentCategory,
    setCurrentPermission,
  } = useContext(StateContext);
  const [categoryList, setCategoryList] = useState([]);

  const { getUserInfo } = useDefaultAPI();

  const onPressHandler = (detail) => {
    setCurrentCategory(detail.category);
    setCurrentPermission(
      categoryList
        .filter((item) => item.category.id === detail.category.id)
        .map((item) => item.permission.description)
    );
    navigation.goBack();
  };

  useEffect(() => {
    if (currentProject.project) {
      getUserInfo().then((response) => {
        setCategoryList(response.data);
      });
    }
  }, [currentProject]);

  return (
    <Pressable
      flex={1}
      bg={"rgba(33, 33, 33, 0.2)"}
      alignItems={"center"}
      justifyContent={"center"}
      onPress={() => (currentCategory.id ? navigation.goBack() : () => null)}
    >
      <VStack
        bg={"rgba(0,0,0,0.6)"}
        w={"90%"}
        maxHeight={"60%"}
        rounded={"md"}
        borderColor={"baseColor.400"}
        borderWidth={0}
        pt={4}
        pb={5}
        px={0}
        space={4}
      >
        <Box borderBottomWidth={1} borderColor={"baseColor.200"} px={2} mx={4}>
          <Text color={"baseColor.50"} fontSize={"xl"}>
            Select Category
          </Text>
        </Box>

        {categoryList.length === 0 ? (
          <Center>
            <LoadingComponent />
          </Center>
        ) : (
          <ScrollView px={4}>
            <VStack space={4}>
              {uniqBy(categoryList, "category.id").map((item, index) => (
                <CategoryCard
                  key={index}
                  detail={item}
                  callback={onPressHandler}
                />
              ))}
            </VStack>
          </ScrollView>
        )}
      </VStack>
    </Pressable>
  );
};

export default CategorySelectPage;
