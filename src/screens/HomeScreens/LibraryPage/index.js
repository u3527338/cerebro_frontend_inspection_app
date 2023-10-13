import GlobalHeader from "../../../global/globalHeader";
import {
  Box,
  Center,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import MyFooter from "../../../routes/FooterRoute/MyFooter";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import { useEffect, useState } from "react";

const RootFolder = ({ callback }) => {
  const { listLibrary } = useDefaultAPI();
  const [folderList, setFolderList] = useState([]);

  const FolderButton = ({ uri, callback }) => (
    <Pressable onPress={() => callback(uri)}>
      {({ isPressed }) => (
        <Box
          bg={"primary.500"}
          rounded={"xl"}
          p={4}
          shadow={1}
          transform={[
            {
              scale: isPressed ? 0.96 : 1,
            },
          ]}
        >
          <Text>{uri.replace("/", "")}</Text>
        </Box>
      )}
    </Pressable>
  );

  useEffect(() => {
    listLibrary("/").then((response) => {
      setFolderList(response.data.folder);
    });
  }, []);

  return (
    <Box bg={"baseColor.50"} rounded={"xl"}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={2} p={4}>
          {folderList.map((uri, index) => (
            <FolderButton uri={uri} callback={callback} key={index} />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

const BowserArea = ({ folder, files }) => {
  const onPress = (uri) => {
    console.log(uri);
  };

  return (
    <>
      <Box bg={"baseColor.50"} rounded={"xl"}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={2} p={4}>
            {folder.map((uri, index) => (
              <Text key={index}>{uri}</Text>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      <Box bg={"baseColor.50"} rounded={"xl"}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={2} p={4}>
            {files.map((uri, index) => (
              <Text key={index}>{uri}</Text>
            ))}
          </HStack>
        </ScrollView>
      </Box>
    </>
  );
};

const Body = () => {
  const { listLibrary } = useDefaultAPI();
  const [currentLayer, setCurrentLayer] = useState({ folder: [], objects: [] });

  const [rootDir, setRootDir] = useState("");

  const onRootFolderPressed = (uri) => {
    setRootDir(uri);
  };

  useEffect(() => {
    if (rootDir !== "") {
      console.log("/" + rootDir + "/");
      listLibrary("/" + rootDir + "/").then((response) => {
        setCurrentLayer({ ...response.data });
        console.log(response.data);
      });
    }
  }, [rootDir]);

  return (
    <VStack p={2}>
      <RootFolder callback={onRootFolderPressed} />
      <BowserArea folder={currentLayer.folder} files={currentLayer.objects} />
      <Text color={"baseColor.500"}>{rootDir}</Text>
    </VStack>
  );
};

const LibraryPage = () => {
  return (
    <>
      <GlobalHeader />
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

export default LibraryPage;
