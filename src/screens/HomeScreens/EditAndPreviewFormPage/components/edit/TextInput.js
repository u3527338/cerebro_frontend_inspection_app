import { Box, Input, Text, VStack } from "native-base";
import { Controller } from "react-hook-form";
import { memo } from "react";

const TextInput = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Input
            placeholder={detail.session}
            variant={"round"}
            size={"md"}
            color={"baseColor.400"}
            borderColor={"baseColor.400"}
            borderWidth={1}
            bg={"transparent"}
            value={value}
            onChangeText={onChange}
            maxLength={detail.textlimit ? detail.textlimit : 999}
            _focus={{ bg: "primary.100" }}
          />
        </Box>
      )}
    />
  );
};

export default memo(TextInput);
