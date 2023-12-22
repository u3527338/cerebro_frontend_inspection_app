import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  Text,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import PDFReader from "rn-pdf-reader-js";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import useDefaultAPI from "../../../hocks/useDefaultAPI";

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
    const LogoText = ({ style }) => {
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
          <Text color={"baseColor.500"} fontSize={14} bold>
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
              <LogoText style={{ maxW: "65%" }} />
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

const FileViewer = ({ loading, open, handleClose, uri }) => {
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
        {loading ? (
          <Center height="100%" pt={2}>
            <LoadingComponent />
          </Center>
        ) : !!uri ? (
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

const LibraryBrowser = ({
  pickImage = false,
  handlePickImage = (uri) => {},
  defaultRoute = [],
}) => {
  const { currentProject } = useContext(StateContext);
  const [rootDir, setRootDir] = useState(defaultRoute);
  const [path, setPath] = useState(null);
  const [filePreview, setFilePreview] = useState(false);

  const { usePreviewFileQuery, useLibraryListQuery } = useDefaultAPI();
  const { data: previewFile, isFetching: fetchingPreviewFile } =
    usePreviewFileQuery(path);
  const { data: libraryList, isFetching: fetchingLibraryList } =
    useLibraryListQuery(formattedRootDir(rootDir));

  useEffect(() => {
    if (currentProject?.project?.id && !pickImage) {
      setRootDir([]);
    }
  }, [currentProject?.project?.id]);

  const handleNextPath = (uri) =>
    setRootDir(rootDir.concat(uri.replace(/\//g, "")));

  const handlePreviousPath = () => {
    setRootDir(rootDir.slice(0, -1));
  };

  const handleFile = (path) => {
    setPath(`library/${currentProject?.project?.project_code}${path}`);
    if (pickImage) {
      handlePickImage(
        `library/${currentProject?.project?.project_code}${path}`
      );
    } else {
      setFilePreview(true);
    }
  };

  const handleClose = () => {
    setFilePreview(false);
  };

  return (
    <>
      <LibraryCard
        data={libraryList?.folder || []}
        loading={fetchingLibraryList}
        handleNextPath={handleNextPath}
        handlePreviousPath={handlePreviousPath}
        type="folder"
        rootDir={rootDir}
        currentProject={currentProject}
      />
      <LibraryCard
        title="Files"
        data={libraryList?.objects || []}
        loading={fetchingLibraryList}
        handleFile={handleFile}
        type="files"
        currentProject={currentProject}
      />
      <FileViewer
        loading={fetchingPreviewFile}
        open={filePreview}
        handleClose={handleClose}
        uri={previewFile?.path}
      />
    </>
  );
};

export default LibraryBrowser;
