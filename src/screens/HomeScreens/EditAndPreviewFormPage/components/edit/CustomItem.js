import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import { memo, useEffect, useRef } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Dimensions } from "react-native";
import { ComponentRender } from "../ComponentRender";

const CustomItem = ({ control, detail }) => {
  const flashListRef = useRef();
  const { fields, append, remove } = useFieldArray({
    control,
    name: detail.key,
  });

  const windowWidth = Dimensions.get("window").width;

  const ItemGroup = ({ itemIndex }) => {
    return (
      <VStack px={2}>
        {detail.item?.map((_item, index) => {
          return (
            <ComponentRender
              control={control}
              template={{
                ..._item,
                key: `${detail.key}.${itemIndex}.${_item.key}`,
              }}
              key={index}
            />
          );
        })}
      </VStack>
    );
  };

  const EachItem = ({ item, index }) => {
    return (
      <Box
        borderWidth={1}
        borderRadius={4}
        borderColor={"gray.300"}
        width={windowWidth * 0.75}
        p={1}
        pb={3}
        mx={1}
        mb={4}
        shadow={1}
        bg={"white"}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text color={"baseColor.500"} p={2}>
            {detail.itemName} {index + 1}
          </Text>
          {index === fields.length - 1 ? (
            <Pressable
              onPress={() => {
                handleDeleteItem(index);
              }}
              disabled={detail.disabled}
              p={2}
            >
              <Icon as={<FontAwesome name="trash-o" />} color={"gray.400"} />
            </Pressable>
          ) : null}
        </HStack>

        <ItemGroup key={"ci_" + index} itemIndex={index} />
      </Box>
    );
  };

  const handleAddItem = () => {
    append({ itemImageAttachments: [], description: "" });
  };

  const handleDeleteItem = (indexToDelete) => {
    remove(indexToDelete);
    if (flashListRef && indexToDelete > 0) {
      flashListRef.current.scrollToIndex({
        index: indexToDelete - 1,
        animated: true,
      });
    }
  };

  return (
    <>
      <Controller
        name={detail.key}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          useEffect(() => {
            onChange([]);
          }, []);

          return (
            <>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Pressable
                  onPress={() => {
                    handleAddItem();
                  }}
                  disabled={detail.disabled || fields.length >= detail.limit}
                  _disabled={{ opacity: 0.2 }}
                >
                  <HStack alignItems={"center"} space={2} py={2}>
                    <Icon
                      as={<AntDesign name="pluscircle" />}
                      color={"gray.400"}
                    />
                    <Text color={"baseColor.500"}>ADD ITEM</Text>
                  </HStack>
                </Pressable>
                <Text color={"gray.500"} mr={3}>
                  {fields.length} / {detail.limit}
                </Text>
              </HStack>
              <FlashList
                ref={flashListRef}
                data={fields}
                maximumZoomScale={2.0}
                keyExtractor={(field) => field.id}
                horizontal
                renderItem={EachItem}
                estimatedItemSize={100}
                showsVerticalScrollIndicator={false}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default memo(CustomItem);
