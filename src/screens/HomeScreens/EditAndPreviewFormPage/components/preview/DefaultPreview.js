import { Box, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const DefaultPreview = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Text color={"baseColor.400"}>
            {value || `${detail.type}: DefaultPreview`}
          </Text>
        </Box>
      )}
    />
  );
};

export default memo(DefaultPreview);
