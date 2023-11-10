import { memo } from "react";
import { Controller } from "react-hook-form";
import { Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import baseColor from "../../../../../themes/colors/baseColor";
import primary from "../../../../../themes/colors/primary";
import secondary from "../../../../../themes/colors/secondary";
import montserrat from "../../../../../themes/fonts/montserrat";

const MySelect = ({ control, detail }) => {
  const data = detail.item.map((i) => ({
    key: i.key,
    label: i.title,
    value: i.title,
  }));

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Dropdown
            data={data}
            // search
            // searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Select an option"
            value={value || detail.preset}
            onChange={(item) => onChange(item.value)}
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
              color: baseColor[400],
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: montserrat[700].normal,
            }}
            selectedStyle={{
              backgroundColor: primary[500],
              borderRadius: 12,
            }}
            activeColor={primary[300]}
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: baseColor[400],
              backgroundColor: "transparent",
              opacity: 1,
              paddingHorizontal: 12,
            }}
            placeholderStyle={{
              color: baseColor[400],
              fontSize: 14,
              fontFamily: montserrat[400].normal,
            }}
            iconColor={baseColor[400]}
            selectedTextStyle={{
              color: baseColor[400],
              fontSize: 14,
              fontFamily: montserrat[400].normal,
            }}
            mode="modal"
          />
        );
      }}
    />
  );
};

export default memo(MySelect);
