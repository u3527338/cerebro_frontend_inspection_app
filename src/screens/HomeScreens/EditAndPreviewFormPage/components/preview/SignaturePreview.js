import { Box, Center, HStack, Image, Spinner, Text, VStack } from "native-base";
import { Controller } from "react-hook-form";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";

const ImageRender = ({ path }) => {
  if (!path) {
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

  const { getFileFromPath, getFileFromId, useFileFromPathQuery } =
    useDefaultAPI();
  const { data, isFetching, error } = useFileFromPathQuery(path[0]);

  return (
    <>
      {isFetching ? (
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
            {data ? (
              <Image
                source={{ uri: data.path }}
                h="100%"
                w="100%"
                resizeMode="contain"
                zIndex={1}
                alt={"Cannot load image"}
              />
            ) : (
              <Center rounded={"md"} bg={"baseColor.100"}>
                <Text color={"baseColor.300"} bold>
                  {path[0].length <= 3
                    ? "Using Default Signature"
                    : error.message || "No Signature Found"}
                </Text>
              </Center>
            )}
          </Box>
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
        <ImageRender path={value} />
      )}
    />
  );
};

export default SignaturePreview;
