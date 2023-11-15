import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Icon, Pressable } from "native-base";
import { memo, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import baseColor from "../../../../../themes/colors/baseColor";
import primary from "../../../../../themes/colors/primary";
import secondary from "../../../../../themes/colors/secondary";
import montserrat from "../../../../../themes/fonts/montserrat";

const getStructuredData = (list) =>
  list.map((i) => ({
    key: i.key,
    label: i.default,
    value: i.default,
    children: i.item,
  }));

const NestedDropDown = ({ control, detail }) => {
  const ref = useRef();
  const parentData = getStructuredData(detail.item);
  const [data, setData] = useState(parentData);
  const [isChildren, setIsChildren] = useState(false);

  const handleOnChange = (item, onChange) => {
    if (!!item.children) {
      setData(getStructuredData(item.children));
      setIsChildren(true);
    } else {
      onChange(item.value);
    }
  };

  useEffect(() => {
    if (ref && isChildren) {
      ref.current.open();
    }
  }, [data, ref, isChildren]);

  const CustomButton = ({ onChange, reset }) => {
    const button = {
      onPress: () => {
        setIsChildren(false);
        setData(parentData);
        onChange(null);
      },
      as: reset ? AntDesign : Entypo,
      name: reset ? "closecircleo" : "chevron-small-down",
    };
    return (
      <Pressable onPress={button.onPress} disabled={!reset}>
        <Icon
          size={5}
          as={button.as}
          name={button.name}
          color={baseColor[400]}
        />
      </Pressable>
    );
  };

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Dropdown
            renderRightIcon={(visible) => (
              <CustomButton onChange={onChange} reset={isChildren} />
            )}
            disable={!!detail.disabled}
            ref={ref}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={detail.session || "Select an option"}
            value={value || detail.preset}
            onChange={(item) => handleOnChange(item, onChange)}
            containerStyle={{
              backgroundColor: secondary[200],
              borderRadius: 4,
              padding: 8,
              paddingBottom: 0,
              minHeight: Dimensions.get("window").height * 0.5,
              maxHeight: Dimensions.get("window").height * 0.85,
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
              backgroundColor: detail.disabled ? baseColor[100] : "transparent",
              opacity: detail.disabled ? 0.5 : 1,
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

export default memo(NestedDropDown);
