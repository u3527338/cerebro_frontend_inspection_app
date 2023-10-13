import { TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import React, { useState } from "react";
import primary from "../themes/colors/primary";
import { Box, HStack, Icon, Pressable } from "native-base";
import { Entypo } from "@expo/vector-icons";
import _ from "lodash";

const MyTextInput = ({
  control,
  name,
  secureTextEntry = false,
  customStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(secureTextEntry);

  return (
    <Controller
      name={name}
      rules={{
        required: true,
        minLength: secureTextEntry ? 6 : 0,
      }}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <HStack
          borderWidth={2}
          borderRadius={6}
          borderColor={isFocused ? "primary.500" : "white"}
          alignItems={"center"}
        >
          <Box flex={12} w={"100%"}>
            <TextInput
              // placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              placeholder={_.startCase(name)}
              placeholderTextColor={"white"}
              secureTextEntry={show}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onChangeText={onChange}
              value={value}
              style={[{ ...styles.textInput, ...customStyle }]}
            />
          </Box>

          {secureTextEntry && (
            <Pressable
              onPress={() => setShow((prevState) => !prevState)}
              flex={1}
              p={4}
            >
              <Icon
                size={"md"}
                as={Entypo}
                name={!show ? "eye" : "eye-with-line"}
                color={"coolGray.500"}
              />
            </Pressable>
          )}
        </HStack>
      )}
    />
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  textInput: {
    // borderWidth: 2,
    // borderRadius: 4,
    padding: 18,
    paddingHorizontal: 14,
    // margin: 3,
    width: "100%",
    color: "white",
    // backgroundColor: "red"
  },

  onFocused: {
    borderColor: primary[500],
  },

  onDefault: {
    borderColor: "white",
  },
});
