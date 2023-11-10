import { Checkbox, HStack, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const MyCheckBox = ({ detail, control, preview }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <HStack justifyContent={"space-between"}>
          <Text>{detail.session}</Text>
          <Checkbox
            onChange={onChange}
            isChecked={value}
            value={value}
            defaultIsChecked={detail.preset}
            accessibilityLabel="checkbox"
          />
        </HStack>
      )}
    />
  );
};

export default memo(MyCheckBox);
