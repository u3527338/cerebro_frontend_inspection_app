import { Controller } from "react-hook-form";
import { HStack, ScrollView, Text, Checkbox, VStack } from "native-base";
import { memo, useEffect } from "react";

const MyCheckBox = ({ detail, control }) => {
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
            accessibilityLabel="checkbox"
          />
        </HStack>
      )}
    />
  );
};

export default memo(MyCheckBox);
