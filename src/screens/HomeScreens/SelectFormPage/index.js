import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { groupBy } from "lodash";
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import LoadingComponent from "../../../components/common/LoadingComponent";
import useDefaultAPI from "../../../hocks/useDefaultAPI";

const windowHeight = Dimensions.get("window").height;

const RenderFormItem = ({ detail, handleOpenForm }) => {
  return (
    <>
      <Pressable
        onPress={() => {
          handleOpenForm(detail);
        }}
      >
        <HStack alignItems={"center"} space={3} py={2}>
          <Icon as={<FontAwesome name="file-text" />} size={"md"} />
          <Text fontSize={"md"} numberOfLines={1} ellipsizeMode="tail">
            {detail.description}
          </Text>
        </HStack>
      </Pressable>
    </>
  );
};
const RenderFolderItem = ({ name, handleOpenForm, folderObject }) => {
  const [isOpen, setIsOpen] = useState(true);
  const onPressHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Pressable onPress={onPressHandler}>
        <HStack alignItems={"flex-end"} space={3} py={2}>
          <Icon as={<FontAwesome name="folder" />} size={"md"} />
          <Text fontSize={"lg"} fontWeight={700}>
            {name}
          </Text>
        </HStack>
      </Pressable>
      {isOpen
        ? folderObject[name].map((item, index) => (
            <Box key={index} px={8}>
              <RenderFormItem detail={item} handleOpenForm={handleOpenForm} />
            </Box>
          ))
        : null}
    </>
  );
};

const RenderItem = ({ handleOpenForm, data }) => {
  const object = groupBy(
    data?.results?.map((item) => ({
      ...item,
      identifier: item.description.includes("_")
        ? item.description.split("_")[0]
        : "default",
    })),
    "identifier"
  );

  const folderObject = Object.keys(object)
    .filter((key) => key !== "default")
    .reduce((result, key) => {
      result[key] = object[key];
      return result;
    }, {});
  const fileList = object.default;

  if (!fileList?.length && !Object.keys(folderObject).length)
    return <Text>No Available Form</Text>;

  return (
    <>
      {Object.keys(folderObject)
        .filter((key) => key !== "default")
        .map((folderName, index) => (
          <RenderFolderItem
            name={folderName}
            key={index}
            handleOpenForm={handleOpenForm}
            folderObject={folderObject}
          />
        ))}
      {fileList?.map((template, index) => (
        <RenderFormItem
          detail={template}
          key={index}
          handleOpenForm={handleOpenForm}
        />
      ))}
    </>
  );
};

const SelectFormPage = () => {
  const navigation = useNavigation();
  const { useFormTemplateListQuery } = useDefaultAPI();
  const { data, isFetching, error } = useFormTemplateListQuery();

  const handleOpenForm = (detail) => {
    navigation.navigate("NewForm", { id: detail.id });
  };

  return (
    <Pressable
      flex={1}
      bg={"rgba(33, 33, 33, 0.2)"}
      alignItems={"center"}
      justifyContent={"center"}
      onPress={() => navigation.goBack()}
    >
      <Pressable
        bg={"rgba(0,0,0,0.5)"}
        w={"85%"}
        rounded={"md"}
        m={4}
        borderColor={"baseColor.400"}
        borderWidth={0}
      >
        <VStack space={4} p={3}>
          <HStack
            borderBottomWidth={1}
            borderColor={"baseColor.200"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
            <Text color={"baseColor.50"} fontSize={"xl"} px={2}>
              Select Form
            </Text>
            <Text color={"baseColor.50"} fontSize={"sm"} px={2}>
              Total: {isFetching ? 0 : data.count}
            </Text>
          </HStack>

          {isFetching ? (
            <Center>
              <LoadingComponent />
            </Center>
          ) : (
            <Box px={2} maxHeight={windowHeight * 0.5}>
              <ScrollView>
                <RenderItem handleOpenForm={handleOpenForm} data={data} />
              </ScrollView>
            </Box>
          )}
        </VStack>
      </Pressable>
    </Pressable>
  );
};

export default SelectFormPage;
