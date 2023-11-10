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
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import LoadingComponent from "../../../components/common/LoadingComponent";
import useDefaultAPI from "../../../hocks/useDefaultAPI";

const windowHeight = Dimensions.get("window").height;

const SelectFormPage = () => {
  const navigation = useNavigation();
  const { getFormTemplateList } = useDefaultAPI();

  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [folderObject, setFolderObject] = useState({});

  const [totalForm, setTotalForm] = useState(0);

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
  const RenderFolderItem = ({ name, handleOpenForm }) => {
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

  const RenderItem = ({ handleOpenForm }) => (
    <>
      {Object.keys(folderObject).map((folderName, index) => (
        <RenderFolderItem
          name={folderName}
          key={index}
          handleOpenForm={handleOpenForm}
        />
      ))}
      {fileList.map((template, index) => (
        <RenderFormItem
          detail={template}
          key={index}
          handleOpenForm={handleOpenForm}
        />
      ))}
    </>
  );

  useEffect(() => {
    setIsLoading(true);
    getFormTemplateList()
      .then((response) => {
        setTotalForm(response.data.count);
        const tmp = groupBy(
          response.data.results.map((item) => ({
            ...item,
            identifier: item.description.includes("_")
              ? item.description.split("_")[0]
              : "default",
          })),
          "identifier"
        );

        if ("default" in tmp) {
          setFileList(tmp["default"]);
          delete tmp.default;
        }
        setFolderObject(tmp);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const navigator = useNavigation();
  const handleOpenForm = (detail) => {
    navigator.navigate("NewForm", { id: detail.id });
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
              Total: {totalForm}
            </Text>
          </HStack>

          {isLoading ? (
            // <Spinner minHeight={windowHeight * 0.3}/> :
            <Center>
              <LoadingComponent />
            </Center>
          ) : fileList.length > 0 || Object.keys(folderObject).length > 0 ? (
            <Box px={2} maxHeight={windowHeight * 0.5}>
              <ScrollView>
                <RenderItem handleOpenForm={handleOpenForm} />
              </ScrollView>
            </Box>
          ) : (
            <Text>No Available Form</Text>
          )}
        </VStack>
      </Pressable>
    </Pressable>
  );
};

export default SelectFormPage;
