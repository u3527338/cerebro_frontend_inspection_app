import { Box, Radio, ScrollView, Stack, Text } from "native-base";
import { memo, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";

const RadioButtonGroup = ({ form, detail, disabled }) => {
  const { watch, control, setValue } = form;
  const linkage = detail?.interaction?.linkage;
  const watchParentValue = useWatch({
    control,
    name: linkage?.parent?.key,
  });

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        useEffect(() => {
          if (!value) onChange(detail.preset || detail.item[0].title);
        }, []);

        useEffect(() => {
          if (!!linkage) {
            const parentValueIndex = linkage?.parent?.item?.indexOf(
              watch(linkage?.parent?.key)
            );
            onChange(linkage?.child?.item[parentValueIndex]);
          }
        }, [watchParentValue]);

        useEffect(() => {
          if (!!linkage && value) {
            const childValueIndex = linkage?.child?.item?.indexOf(value);
            if (childValueIndex >= 0) {
              setValue(
                linkage?.parent?.key,
                linkage?.parent?.item[childValueIndex]
              );
            }
          }
        }, [value]);

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
