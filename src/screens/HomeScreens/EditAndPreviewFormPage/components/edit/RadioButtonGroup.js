import { Box, Radio, ScrollView, Stack, Text } from "native-base";
import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";

const RadioButtonGroup = ({ control, detail, disabled }) => {
  console.log(JSON.stringify(detail));
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          if (!value) onChange(detail.preset || detail.item[0].title);
        }, []);

        return (
          <Box p={2}>
            <ScrollView
              horizontal={detail.direction === "row"}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
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
                      isDisabled={disabled}
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
            </ScrollView>
          </Box>
        );
      }}
    />
  );
};

export default memo(RadioButtonGroup);
