import { Checkbox, HStack, Text } from "native-base";
import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";

const MyCheckBox = ({ detail, control, disabled }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          onChange(detail.preset || false);
        }, []);

        return (
          <HStack justifyContent={"space-between"} p={2}>
            <Text color="black">{detail.session}</Text>
            <Checkbox
              onChange={onChange}
              isChecked={value}
              value={value}
              accessibilityLabel="checkbox"
              isDisabled={disabled}
              backgroundColor="transparent"
            />
          </HStack>
        );
      }}
    />
  );
};

export default memo(MyCheckBox);
