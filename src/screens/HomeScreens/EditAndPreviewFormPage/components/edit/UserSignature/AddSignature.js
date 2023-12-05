import { Ionicons } from "@expo/vector-icons";
import { HStack, Pressable, Text } from "native-base";
import { memo } from "react";
import primary from "../../../../../../themes/colors/primary";

const AddSignature = ({ disabled, onPress }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text numberOfLines={1} ellipsizeMode="tail" bold color="baseColor.400">
        Signature
      </Text>

      <Pressable
        borderRadius={8}
        _pressed={{ backgroundColor: primary[100] }}
        _disabled={{ opacity: 0.3 }}
        disabled={disabled}
        onPress={onPress}
      >
        <Ionicons name="add-outline" size={20} color="gray" />
      </Pressable>
    </HStack>
  );
};

export default memo(AddSignature);
