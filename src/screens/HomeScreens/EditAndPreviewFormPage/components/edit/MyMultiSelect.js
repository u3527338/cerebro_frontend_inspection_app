import { Entypo } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  useDisclose,
} from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";
import baseColor from "../../../../../themes/colors/baseColor";

const MyMultiSelect = ({ control, detail, disabled }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <Box p={2}>
            <Pressable
              p={2}
              px={3}
              borderRadius={5}
              borderWidth={1}
              borderColor="baseColor.400"
              style={{
                backgroundColor: disabled ? baseColor[100] : "transparent",
                opacity: disabled ? 0.5 : 1,
              }}
              onPress={onOpen}
              disabled={disabled}
            >
              <HStack justifyContent="space-between" alignItems={"center"}>
                <Text
                  w="90%"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color={"baseColor.400"}
                >
                  Select options
                </Text>
                <Icon
                  size={5}
                  as={Entypo}
                  name={"chevron-small-down"}
                  color={baseColor[400]}
                />
              </HStack>
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                {detail.item.map((item) => (
                  <Actionsheet.Item
                    key={item.key}
                    onPress={() => {
                      onChange([...value, item.label]);
                    }}
                    backgroundColor={
                      value.includes(item.label) ? "primary.500" : null
                    }
                    disabled={value.includes(item.label)}
                    _disabled={{ opacity: 1 }}
                  >
                    {item.label}
                  </Actionsheet.Item>
                ))}
              </Actionsheet.Content>
            </Actionsheet>
            {value.length > 0 && (
              <FlashList
                horizontal
                data={value}
                renderItem={({ item }) => (
                  <Button
                    backgroundColor="primary.400"
                    onPress={() => {
                      onChange(value.filter((ev) => ev !== item));
                    }}
                    endIcon={<Icon as={Entypo} name={"circle-with-cross"} />}
                    p={3}
                    py={1}
                    m={1}
                    mt={3}
                    alignSelf="flex-start"
                    borderRadius={16}
                  >
                    <Text fontSize={12}>{item}</Text>
                  </Button>
                )}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </Box>
        );
      }}
    />
  );
};

export default memo(MyMultiSelect);
