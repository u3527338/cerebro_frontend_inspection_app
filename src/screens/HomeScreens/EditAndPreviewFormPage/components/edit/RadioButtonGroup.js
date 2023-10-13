import { Box, Pressable, Radio, Stack } from "native-base";
import { Text } from "native-base";
import { Controller } from "react-hook-form";
import { memo } from "react";

const RadioButtonGroup = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Radio.Group
          value={value}
          onChange={onChange}
          accessibilityLabel="Choice"
          name="myRadioGroup"
        >
          <Stack
            direction={{
              base: detail.direction,
            }}
            space={4}
            w="90%"
          >
            {detail.item.map((item, index) => (
              <Radio
                value={item.title}
                bg={"transparent"}
                key={item.key}
                size="sm"
              >
                <Text
                  textAlign={"justify"}
                  color={"baseColor.500"}
                  bold
                  fontSize={"sm"}
                >
                  {item.title}
                </Text>
              </Radio>
            ))}
          </Stack>
        </Radio.Group>
      )}
    />
  );
};

export default memo(RadioButtonGroup);
