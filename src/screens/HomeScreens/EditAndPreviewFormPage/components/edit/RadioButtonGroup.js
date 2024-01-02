import { Radio, Stack, Text } from "native-base";
import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";

const RadioButtonGroup = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          if (!value) onChange(detail.preset || detail.item[0].title);
        }, []);

        return (
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
              justifyContent={"space-between"}
            >
              {detail.item.map((item, index) => (
                <Radio
                  value={item.title}
                  bg="transparent"
                  key={index}
                  size="sm"
                  isDisabled={!!detail.disabled}
                >
                  <Text
                    textAlign="justify"
                    color="baseColor.500"
                    bold
                    fontSize="sm"
                  >
                    {item.title}
                  </Text>
                </Radio>
              ))}
            </Stack>
          </Radio.Group>
        );
      }}
    />
  );
};

export default memo(RadioButtonGroup);
