import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { memo } from "react";

const LocalSignaturePreview = ({ uri, onPress, disabled }) => {
  return (
    <VStack space={2}>
      <Box
        h={100}
        w={160}
        borderColor="baseColor.300"
        borderRadius="sm"
        borderWidth={1}
      >
        <Image
          source={{ uri }}
          h="100%"
          w="100%"
          resizeMode="contain"
          zIndex={1}
          alt={"Cannot load image"}
        />
      </Box>
      <HStack>
        <Pressable
          onPress={onPress}
          bgColor="primary.400"
          borderRadius={4}
          disabled={disabled}
          _disabled={{ opacity: 0.7 }}
        >
          <Text color="white" p={2}>
            CLEAR
          </Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default memo(LocalSignaturePreview);
