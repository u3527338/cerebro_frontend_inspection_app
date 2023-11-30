import { Entypo } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  useDisclose,
} from "native-base";
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import baseColor from "../../../../../themes/colors/baseColor";

const SimpleDropDown = ({ control, detail }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <Box
              p={2}
              px={3}
              borderRadius={5}
              borderWidth={1}
              borderColor="baseColor.400"
              style={{
                backgroundColor: !!detail.disabled
                  ? baseColor[100]
                  : "transparent",
                opacity: !!detail.disabled ? 0.5 : 1,
              }}
            >
              <HStack justifyContent="space-between" alignItems={"center"}>
                <Text
                  w="90%"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color={"baseColor.400"}
                >
                  {value || detail.session}
                </Text>
                <Pressable
                  onPress={onOpen}
                  disabled={!!detail.disabled}
                  borderRadius="full"
                  _pressed={{ backgroundColor: "secondary.100" }}
                >
                  <Icon
                    size={5}
                    as={Entypo}
                    name={"chevron-small-down"}
                    color={baseColor[400]}
                  />
                </Pressable>
              </HStack>
            </Box>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                {detail.item.map((item) => (
                  <Actionsheet.Item
                    key={item.key}
                    onPress={() => {
                      onChange(item.title);
                      onClose();
                    }}
                  >
                    {item.title}
                  </Actionsheet.Item>
                ))}
              </Actionsheet.Content>
            </Actionsheet>
          </>
        );
      }}
    />
  );
};

export default memo(SimpleDropDown);
