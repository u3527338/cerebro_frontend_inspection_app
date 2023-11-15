import { Box, Input } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const TextInput = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Input
            isDisabled={detail.disabled}
            _disabled={{
              backgroundColor: "baseColor.100",
              opacity: 0.5,
              placeholderTextColor: "baseColor.400",
            }}
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
