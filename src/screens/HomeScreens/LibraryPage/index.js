import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import PDFReader from "rn-pdf-reader-js";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import MyFooter from "../../../routes/FooterRoute/MyFooter";

const CARD_HEIGHT = 200;

const LibraryCard = ({
  data,
  loading,
  title,
  handleNextPath,
  handlePreviousPath,
  handleFile,
  type,
  rootDir = [],
  currentProject,
}) => {
  const [search, setSearch] = useState("");

  const searchHandler = (text) => setSearch(text);

  const RowItem = ({ item }) => {
    const LogoText = ({ style, innerStyle }) => {
      return (
        <HStack {...style}>
          <Box mr={2}>
            <Icon
              as={
                <FontAwesome
                  name={
                    type === "folder"
                      ? "folder"
                      : item.drawingNum.endsWith("pdf")
                      ? "file-pdf-o"
                      : "file-image-o"
                  }
                />
              }
              size={5}
              color={"primary.600"}
            />
          </Box>
          <Text color={"baseColor.500"} fontSize={14} bold {...innerStyle}>
            {type === "folder" ? item : item.drawingNum}
          </Text>
        </HStack>
      );
    };

    return (
      <>
        {type === "folder" ? (
          <Pressable
            onPress={() => handleNextPath(item)}
            _pressed={{ backgroundColor: "amber.100" }}
          >
            <LogoText style={{ alignItems: "center", m: 2 }} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handleFile(item.path)}
            _pressed={{ backgroundColor: "amber.100" }}
          >
            <HStack justifyContent={"space-between"} m={2} w={"auto"}>
              <LogoText innerStyle={{ maxW: "75%" }} />
              <Text color={"gray.500"} fontSize={12}>
                {moment(item.date).format("YYYY/MM/DD")}
              </Text>
            </HStack>
          </Pressable>
        )}
      </>
    );
  };

  const ListEmptyComponent = () => (
    <Center h={CARD_HEIGHT}>
      <Text color={"gray.400"}>No data</Text>
    </Center>
  );

  return (
    <Box p={2}>
      <HStack
        borderTopRadius={8}
        shadow={2}
        bg={"baseColor.500"}
        p={3}
        px={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        space={3}
      >
        <HStack alignItems={"center"} space={1} maxW="50%">
          <Pressable
            disabled={rootDir.length === 0}
            onPress={handlePreviousPath}
          >
            <Box mr={2}>
              <Icon
                as={
                  type === "folder" ? (
                    <Ionicons name="ios-arrow-back" />
                  ) : (
                    <FontAwesome name="file-text" />
                  )
                }
                size={5}
                color={
                  rootDir.length === 0 && type === "folder"
                    ? "gray.500"
                    : "primary.500"
                }
              />
            </Box>
          </Pressable>
          <Text isTruncated color={"primary.500"} bold fontSize={"md"}>
            {title ||
              rootDir[rootDir.length - 1] ||
              currentProject?.project?.project_code}
          </Text>
        </HStack>

        <Input
          size="xs"
          placeholder={"Search"}
          maxW={"40%"}
          borderColor="secondary.400"
          placeholderTextColor="secondary.400"
          InputLeftElement={
            <Box ml={2}>
              <Icon
                as={<Ionicons name="search" />}
                size={4}
                color={"primary.500"}
              />
            </Box>
          }
          onChangeText={searchHandler}
        />
      </HStack>

      <Box borderBottomRadius={8} shadow={2} p={1} bg={"white"} h={CARD_HEIGHT}>
        {loading ? (
          <Center flex={1}>
            <LoadingComponent />
          </Center>
        ) : (
          <FlashList
            data={data.filter((item) =>
              (type === "folder" ? item : item.drawingNum)
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            keyExtractor={(item, index) => index}
            renderItem={RowItem}
            estimatedItemSize={37}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </Box>
    </Box>
  );
};

const ButtonArea = () => {
  // if (!onSelectBnCallback) return <Text>Nothing Here</Text>
  return (
    <HStack justifyContent={"space-between"}>
      <Text>Nothing Here</Text>
      <Pressable pt={1} px={2}>
        <Text color={"baseColor.500"}>Select</Text>
      </Pressable>
    </HStack>
  );
};

const FileViewer = ({ open, handleClose, uri }) => {
  return (
    <Modal
      isVisible={open}
      onSwipeComplete={handleClose}
      onBackdropPress={handleClose}
      swipeDirection={["down"]}
      propagateSwipe={true}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <Box p={2} bg={"white"} h={"90%"}>
        <ButtonArea />
        {/* <PDFReader
          webviewStyle={{ flex: 1 }}
          source={{
            uri: "https://storage.googleapis.com/cerebrohk-inspection/file/010f0b1066b7484fa146c98907b87d7c/files/011e1c97db114bf780496e4e229e9d5b?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=inspection-gcs%40cerebro-dwss-inspection.iam.gserviceaccount.com%2F20231103%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231103T015059Z&X-Goog-Expires=1800&X-Goog-SignedHeaders=host&X-Goog-Signature=99262b13c3c30cd516fa0f3e08e119b61a186949ee9df93bdc4f9ba400b269ff7db77148a30b086a62ebba567770faa47153ecdb8a93870f5aed37ab6942034d2fda7c2cc2936e0ba094e046c775e5842ad693d460256e6a96480b3c5cfce53005745b0e82538dd5c4b1ebe5f7f294c5d896d4d868669979576b269cf212bfd698042aea80cdf4ecd6b0435a8a97c62981e647bbf706f6e6cc687066dc557ed7a25bad8eb0712e5e1bba09b2133212197a939500ef8722aa585fb016f7b024bfea519f5c277f862a4ec1ccf22720f7c3ffbe686ad83a9dc23bdad701b2fb2f1f6b325cef38e56098b02d569612b655acf48789b9f20f5a0390077e84658b399b",
          }}
        /> */}
        {!!uri ? (
          uri?.endsWith(".pdf") ? (
            <PDFReader webviewStyle={{ flex: 1 }} source={{ uri }} />
          ) : (
            <Image
              alt={"Cannot load image"}
              source={{ uri }}
              w={"100%"}
              h={"100%"}
              resizeMode={"contain"}
            />
          )
        ) : (
          <Center h="100%">
            <Text color={"secondary.400"}>File Not Found</Text>
          </Center>
        )}
      </Box>
    </Modal>
  );
};

const formattedRootDir = (pathArr) => {
  if (pathArr.length === 0) return "/";
  return "/" + pathArr[pathArr.length - 1] + "/";
};

const Body = () => {
  const { currentProject } = useContext(StateContext);
  const { listLibrary, getPreviewFile } = useDefaultAPI();
  const [currentLayer, setCurrentLayer] = useState({ folder: [], objects: [] });
  const [loading, setLoading] = useState(false);
  const [rootDir, setRootDir] = useState([]);
  const [filePreview, setFilePreview] = useState(false);
  const [source, setSource] = useState(null);

  const fetchData = (rootDir) => {
    setLoading(true);
    listLibrary(rootDir).then((response) => {
      setCurrentLayer(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(formattedRootDir(rootDir));
  }, [rootDir]);

  useEffect(() => {
    if (currentProject?.project?.id) {
      setRootDir([]);
    }
  }, [currentProject?.project?.id]);

  const handleNextPath = (uri) =>
    setRootDir(rootDir.concat(uri.replace(/\//g, "")));

  const handlePreviousPath = () => {
    setRootDir(rootDir.slice(0, -1));
  };

  const handleFile = (path) => {
    getPreviewFile({ path })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((err) => console.log(err.message));
    setFilePreview(true);
  };

  const handleClose = () => {
    setFilePreview(false);
  };

  return (
    <>
      <LibraryCard
        data={currentLayer.folder || []}
        loading={loading}
        handleNextPath={handleNextPath}
        handlePreviousPath={handlePreviousPath}
        type="folder"
        rootDir={rootDir}
        currentProject={currentProject}
      />
      <LibraryCard
        title="Files"
        data={currentLayer.objects || []}
        loading={loading}
        handleFile={handleFile}
        type="files"
        currentProject={currentProject}
      />
      <FileViewer open={filePreview} handleClose={handleClose} uri={source} />
    </>
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
