import { Text, VStack } from "native-base";

const MyText = ({ control, detail }) => {
  return (
    <>
      {detail.item ? (
        <VStack>
          <Text color="baseColor.400" bold fontSize={"sm"}>
            {detail.item}
          </Text>
        </VStack>
      ) : null}
    </>
  );
};

export default MyText;
