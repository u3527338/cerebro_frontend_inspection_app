import { AntDesign } from "@expo/vector-icons";
import { Badge, Box, HStack, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";
import { Dimensions } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import baseColor from "../../../../../themes/colors/baseColor";
import primary from "../../../../../themes/colors/primary";
import secondary from "../../../../../themes/colors/secondary";
import montserrat from "../../../../../themes/fonts/montserrat";

const MyMultiSelect = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <Box p={2}>
            <MultiSelect
              data={detail.item}
              labelField="label"
              valueField="value"
              mode="modal"
              // placeholder={detail.session}
              placeholder="Select options"
              search
              searchPlaceholder="Search"
              value={value || detail.preset?.split(",")}
              onChange={onChange}
              containerStyle={{
                backgroundColor: secondary[200],
                borderRadius: 4,
                padding: 8,
                paddingBottom: 0,
                minHeight: Dimensions.get("window").height * 0.5,
                maxHeight: Dimensions.get("window").height * 0.9,
                width: Dimensions.get("window").width,
                position: "absolute",
                bottom: 0,
              }}
              itemTextStyle={{
                color: baseColor[500],
                fontSize: 12,
                fontFamily: montserrat[700].normal,
              }}
              renderSelectedItem={(item, unselect) => (
                <Badge borderRadius={16} m={1} py={1.5} bgColor={primary[500]}>
                  <HStack space={3}>
                    <Text fontSize={10} bold>
                      {item.label}
                    </Text>
                    <AntDesign name="closecircleo" size={16} color="white" />
                  </HStack>
                </Badge>
              )}
              inputSearchStyle={{
                borderRadius: 10,
                borderColor: baseColor[500],
                fontFamily: montserrat[400].normal,
                fontSize: 14,
              }}
              placeholderStyle={{
                color: "white",
                fontSize: 14,
                paddingLeft: 8,
                fontFamily: montserrat[400].normal,
              }}
              iconColor="white"
              activeColor={primary[300]}
            />
          </Box>
        );
      }}
    />
  );
};

export default memo(MyMultiSelect);
