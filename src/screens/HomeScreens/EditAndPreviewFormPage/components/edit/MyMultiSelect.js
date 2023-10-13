import { AntDesign } from "@expo/vector-icons";
import { Badge, HStack, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";
import { MultiSelect } from "react-native-element-dropdown";
import baseColor from "../../../../../themes/colors/baseColor";
import primary from "../../../../../themes/colors/primary";
import montserrat from "../../../../../themes/fonts/montserrat";

const MyMultiSelect = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <MultiSelect
            data={detail.item}
            labelField="label"
            valueField="value"
            mode="modal"
            placeholder={detail.session}
            search
            searchPlaceholder="Search"
            value={value}
            onChange={onChange}
            containerStyle={{
              backgroundColor: primary[100],
              borderRadius: 4,
              padding: 8,
              maxHeight: "85%",
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
        );
      }}
    />
  );
};

export default memo(MyMultiSelect);
