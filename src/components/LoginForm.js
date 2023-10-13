import { useForm } from "react-hook-form";
import {
  Button,
  HStack,
  Icon,
  Pressable,
  Spinner,
  Text,
  VStack,
  FormControl,
} from "native-base";
import MyTextInput from "./MyTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const LoginForm = ({ loading, onSubmit, onFingerPrint, containerStyle }) => {
  const { fromAuthStore } = useContext(AuthContext);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    fromAuthStore().then(({ username }) => setValue("username", username));
  }, []);

  return (
    <VStack {...containerStyle}>
      <FormControl space={1}>
        <MyTextInput
          control={control}
          name={"username"}
          error={errors.username}
        />
        {errors.username && (
          <Text fontSize={12} color={"alertColor.300"}>
            This is required.
          </Text>
        )}
      </FormControl>

      <FormControl space={1}>
        <MyTextInput
          control={control}
          name={"password"}
          secureTextEntry={true}
        />
        {errors.password && (
          <Text fontSize={12} color={"alertColor.300"}>
            {errors.password.type === "minLength"
              ? "Must be at least 6 characters"
              : "This is required."}
          </Text>
        )}
      </FormControl>

      <HStack justifyContent={"space-between"} pt={3} width={"100%"} space={4}>
        <Button
          flex={4}
          borderRadius={"sm"}
          p={5}
          shadow={6}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? (
            <Spinner color={"white"} />
          ) : (
            <Text fontWeight={"bold"}>LOGIN</Text>
          )}
        </Button>
        <Pressable
          rounded={"md"}
          borderColor={loading ? "gray.500" : "white"}
          borderWidth={2}
          disabled={loading}
          justifyContent={"center"}
          alignItems={"center"}
          onPress={onFingerPrint}
          flex={1}
        >
          {/*<Icon size={"3xl"} as={MaterialCommunityIcons} name={"fingerprint"} color={loading ? "gray" : "white"}/>*/}
          <FontAwesomeIcon
            icon={["fas", "fingerprint"]}
            size={30}
            color={loading ? "gray" : "white"}
          />
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default LoginForm;
