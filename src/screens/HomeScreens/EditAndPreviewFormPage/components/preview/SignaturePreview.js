import { Controller } from "react-hook-form";
import {
  AspectRatio,
  Box,
  Center,
  Image,
  Text,
  Spinner,
  VStack,
  HStack,
} from "native-base";
import LoadingComponent from "../../../../../components/common/LoadingComponent";
import { useEffect, useState } from "react";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
import moment from "moment";

const ImageRender = ({ path, name }) => {
  const [loading, setIsLoading] = useState(false);
  const [storagePath, setStoragePath] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getFileFromPath, getFileFromId } = useDefaultAPI();

  const get_media = (media) =>
    media.includes("/") ? getFileFromPath(media) : getFileFromId(media);
  const mediaHandler = () => {
    console.log("mediaHandler", path[0]);
    if (path[0].length > 3) {
      setIsLoading(true);
      get_media(path[0])
        .then((response) => {
          console.log("response", response.data);
          setStoragePath(response.data.path);
        })
        .catch(() => setErrorMessage("No Data Found"))
        .finally(() => setIsLoading(false));
    } else {
      setErrorMessage("Using Default Signature");
    }
  };

  useEffect(() => {
    if (path && !!path.length) mediaHandler();
  }, [path]);

  if (path === undefined) {
    return (
      <Text color={"baseColor.300"} bold>
        No File
      </Text>
    );
  }

  if (!path.length) {
    return (
      <Text color={"baseColor.300"} bold>
        No Signature
      </Text>
    );
  }

  return (
    <>
      {loading ? (
        <Center w={120} h={120}>
          <Spinner size={"lg"} color={"baseColor.200"} />
        </Center>
      ) : (
        <VStack space={1} px={2}>
          <HStack space={2}>
            <Text color={"baseColor.300"}>Signed by:</Text>
            <Text color={"baseColor.500"} bold>
              {path[1]}
            </Text>
          </HStack>
          <Box h={100} w={160}>
            {storagePath ? (
              <Image
                source={{ uri: storagePath }}
                h="100%"
                w="100%"
                resizeMode="contain"
                zIndex={1}
                alt={"Cannot load image"}
              />
            ) : (
              <Center rounded={"md"} bg={"baseColor.100"}>
                <Text color={"baseColor.300"} bold>
                  {errorMessage || "No Signature Found"}
                </Text>
              </Center>
            )}
          </Box>
          {/* <HStack space={2}>
            <Text color={"baseColor.300"}>Signed at:</Text>
            <Text color={"baseColor.500"} bold>
              {moment(path[2]).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </HStack> */}
        </VStack>
      )}
    </>
  );
};

const SignaturePreview = ({ detail, control }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <ImageRender path={value} name={`${detail.key}`} />
      )}
    />
  );
};

export default SignaturePreview;
