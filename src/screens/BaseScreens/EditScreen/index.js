import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import {
  Box,
  Button,
  FormControl,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";

const ChangePasswordForm = () => {
  const navigation = useNavigation();
  const { useChangePasswordMutation } = useDefaultAPI();
  const { mutate, isPending } = useChangePasswordMutation();

  const reviewSchema = yup.object({
    password: yup
      .string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    new_password: yup
      .string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("new_password"), null], "Password does not match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    resolver: yupResolver(reviewSchema),
  });

  const onSubmit = ({ confirm_password, ...data }) => {
    mutate(data, {
      onSuccess: () => {
        alert("Password changed");
        navigation.goBack();
      },
    });
  };

  const inputs = ["password", "new_password", "confirm_password"];

  return (
    <Box px={8}>
      <VStack space={2}>
        {inputs.map((input, i) => (
          <FormControl key={i} isRequired isInvalid={input in errors}>
            <FormControl.Label
              _text={{ color: "muted.400", fontSize: "sm", fontWeight: "bold" }}
            >
              {_.startCase(input)}
            </FormControl.Label>
            <Controller
              control={control}
              name={input}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Input
                    value={value}
                    type={"password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    fontSize={"md"}
                    p={4}
                    _focus={{ color: "primary.400" }}
                    selectionColor={"baseColor.500"}
                    color={"muted.300"}
                  />
                );
              }}
            />
            <FormControl.ErrorMessage>
              {errors[input]?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        ))}

        <Button
          colorScheme={"primary"}
          my={4}
          borderRadius={"sm"}
          isLoading={isPending}
          onPress={handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          <Text color={"white"} bold fontSize={14}>
            Submit
          </Text>
        </Button>
      </VStack>
    </Box>
  );
};

const EditScreen = () => {
  return (
    <>
      <GlobalHeader />
      <Pressable onPress={Keyboard.dismiss}>
        <Box bg={"primary.100"} borderRadius={8} m={8} py={4} shadow={2}>
          <ChangePasswordForm />
        </Box>
      </Pressable>
    </>
  );
};

export default EditScreen;
