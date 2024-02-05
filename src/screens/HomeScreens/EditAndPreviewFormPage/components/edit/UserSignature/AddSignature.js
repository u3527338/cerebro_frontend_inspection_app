import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Pressable, Text } from "native-base";
import { memo } from "react";
import primary from "../../../../../../themes/colors/primary";

const AddSignature = ({ disabled, onPress }) => {
  return (
    <Box py={1}>
      <Pressable
        borderRadius={8}
        _pressed={{ backgroundColor: primary[100] }}
        _disabled={{ opacity: 0.3 }}
        disabled={disabled}
        onPress={onPress}
        p={2}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            bold
            color="baseColor.400"
          >
            Signature
          </Text>
          <Ionicons name="add-outline" size={20} color="gray" />
        </HStack>
      </Pressable>
    </Box>
  );
};

export default memo(AddSignature);
