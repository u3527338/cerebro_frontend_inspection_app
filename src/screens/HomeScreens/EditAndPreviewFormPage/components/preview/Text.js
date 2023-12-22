import { Text, VStack } from "native-base";
import { memo } from "react";

const MyText = ({ control, detail }) => {
  return (
    <>
      {detail.item ? (
        <VStack>
          <Text color="baseColor.400" bold fontSize={"sm"} textAlign="justify">
            {detail.item}
          </Text>
        </VStack>
      ) : null}
    </>
  );
};

export default memo(MyText);
