import { Entypo } from "@expo/vector-icons";
import _ from "lodash";
import { Icon } from "native-base";
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import SelectBox from "react-native-multi-selectbox";
import primary from "../../../../../themes/colors/primary";
import montserrat from "../../../../../themes/fonts/montserrat";

const onMultiChange = (value, onChange) => (item) => {
  onChange(_.xorBy(value, [item], "id"));
};

const AutoComplete = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <SelectBox
            label={`${detail.session} ( ${value.length} selected )`}
            labelStyle={{
              color: "white",
              fontSize: 14,
              fontFamily: montserrat[400].normal,
              paddingLeft: 8,
            }}
            hideInputFilter
            inputPlaceholder={"Type To Search"}
            options={detail.list}
            selectedValues={value}
            onMultiSelect={onMultiChange(value, onChange)}
            onTapClose={onMultiChange(value, onChange)}
            isMulti
            arrowIconColor={primary[500]}
            searchIconColor={primary[500]}
            toggleIconColor={primary[400]}
            selectIcon={
              <Icon
                size={4}
                as={Entypo}
                name="chevron-down"
                color="white"
                position="absolute"
              />
            }
            inputFilterStyle={{
              color: "black",
              paddingLeft: 10,
              fontFamily: montserrat[400].normal,
            }}
            inputFilterContainerStyle={{
              backgroundColor: primary[100],
              borderRadius: 8,
              marginTop: 10,
              paddingRight: 8,
            }}
            multiListEmptyLabelStyle={{
              color: "white",
              fontSize: 14,
              fontFamily: montserrat[400].normal,
              paddingLeft: 10,
            }}
            multiOptionContainerStyle={{
              backgroundColor: primary[500],
            }}
            multiOptionsLabelStyle={{ fontWeight: "bold" }}
            optionContainerStyle={{
              padding: 10,
              paddingVertical: 0,
              paddingRight: 6,
            }}
            listEmptyLabelStyle={{
              color: "white",
              fontSize: 14,
              fontFamily: montserrat[400].normal,
            }}
            optionsLabelStyle={{
              color: "white",
              fontSize: 14,
              paddingLeft: 4,
              padding: 10,
              fontFamily: montserrat[400].normal,
            }}
            listOptionProps={{ nestedScrollEnabled: true }}
          />
        );
      }}
    />
  );
};

export default memo(AutoComplete);
