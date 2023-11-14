import { Box, Pressable, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const DefaultPreview = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Pressable onPress={() => alert(JSON.stringify(detail.item))}>
            <Text color={"baseColor.400"}>
              {value || `${detail.type}: DefaultPreview`}
            </Text>
          </Pressable>
        </Box>
      )}
    />
  );
};

export default memo(DefaultPreview);
