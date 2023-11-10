import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

const SelectActionArea = ({ choices, actionState, callback = () => null }) => (
  <>
    {choices.map((item, index) => (
      <Pressable onPress={() => callback(item)} key={index}>
        <Box
          px={3}
          py={1}
          m={1}
          rounded={"md"}
          bg={"white"}
          key={`action_${index}`}
        >
          <Text
            color={actionState === item ? "primary.500" : "baseColor.400"}
            bold
            textTransform={"uppercase"}
            fontSize={"md"}
          >
            {item}
          </Text>
        </Box>
      </Pressable>
    ))}
  </>
);

const initValue = {
  formAction: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "action":
      return { ...state, formAction: action.value };
  }
};

const EditFormArea = ({ formDetail }) => {
  const [actions, setActions] = useState(null);
  const [hasNextStep, setHasNextStep] = useState(false);
  const [currentFlow, setCurrentFlow] = useState({});
  const [formControlState, formControlDispatch] = useReducer(
    reducer,
    initValue
  );

  useEffect(() => {
    const currentStep = formDetail.flow_data.length;
    const hasNextStep = formDetail.flow.flow.length > currentStep;

    if (hasNextStep) {
      setActions(formDetail.flow.flow[currentStep].action);
    }

    setHasNextStep(hasNextStep);
    setCurrentFlow(formDetail.flow.flow[currentStep]);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...formDetail.data },
  });

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <VStack space={2} flex={1}>
      {actions ? (
        <VStack
          flex={1}
          space={1}
          bg={"white"}
          shadow={1}
          rounded={"md"}
          mx={2}
          mt={2}
          px={2}
          py={3}
        >
          <Button variant={"outline"} size={"sm"}>
            <Text bold color={"baseColor.500"} fontSize={"xs"}>
              Discriminator
            </Text>
          </Button>
          <HStack
            justifyItems={"space-between"}
            alignItems={"center"}
            space={1}
          >
            <Text fontSize={"xs"} color={"baseColor.300"}>
              Action:{" "}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <SelectActionArea
                choices={actions}
                actionState={formControlState.formAction}
                callback={(action) =>
                  formControlDispatch({ type: "action", value: action })
                }
              />
            </ScrollView>
            <Button
              size={"sm"}
              onPress={handleSubmit(onSubmitHandler)}
              isDisabled={formControlState.formAction === null}
            >
              Confirm
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Box h={1} />
      )}

      <Box flex={8} bg={"white"} shadow={1} rounded={"md"} mx={2}>
        <Box h={2} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack mb={200}>
            <FormWrapper
              control={control}
              templateDetail={formDetail}
              hasNextStep={hasNextStep}
              currentFlow={currentFlow}
            />
          </VStack>
        </ScrollView>
        <Box h={2} />
      </Box>
    </VStack>
  );
};

export default EditFormArea;
