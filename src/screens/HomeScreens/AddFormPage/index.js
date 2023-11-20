import { useRoute } from "@react-navigation/native";
import _, { intersectionWith, isEqual } from "lodash";
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import { ComponentRender } from "../EditAndPreviewFormPage/components/ComponentRender";

const CustomButton = ({ title, callback }) => (
  <Button
    // w={"100%"}
    py={1}
    shadow={6}
    bg={"gray.500"}
    // borderWidth={1}
    borderRadius={4}
    // borderColor={"gray.700"}
    onPress={callback}
  >
    <Text color={"gray.300"} bold>
      {title}
    </Text>
  </Button>
);

const Body = ({ sessions, hasNextStep, currentStep, loading }) => {
  if (loading)
    return (
      <Center height={"85%"}>
        <LoadingComponent />
      </Center>
    );

  const { currentPermission } = useContext(StateContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: _.fromPairs(
      sessions?.template?.map((item) => [item.key, item.preset])
    ),
  });
  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(sessions.template));
  };

  let editRole = [];
  const currentFlow = sessions.flow.flow[currentStep];
  if (currentFlow) {
    editRole =
      typeof currentFlow.role === "string"
        ? [currentFlow.role]
        : currentFlow.role;
  }

  const [disabled, setDisabled] = useState(false);
  const [preview, setPreview] = useState(false);
  return (
    <VStack space={2} justifyContent={"space-between"} h={"85%"}>
      <ScrollView
        py={4}
        px={2}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <HStack justifyContent={"space-around"} p={2}>
          <Pressable
            onPress={() => {
              setDisabled(false);
              setPreview(false);
            }}
            bgColor={"primary.500"}
            p={2}
          >
            <Text>DEFAULT</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDisabled(!disabled);
              setPreview(false);
            }}
            bgColor={"primary.500"}
            p={2}
            disabled={disabled}
            _disabled={{ opacity: 0.5 }}
          >
            <Text>SET DISABLED</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDisabled(false);
              setPreview(!preview);
            }}
            bgColor={"primary.500"}
            p={2}
            disabled={preview}
            _disabled={{ opacity: 0.5 }}
          >
            <Text>SET PREVIEW</Text>
          </Pressable>
        </HStack>
        <HStack justifyContent={"space-around"} p={1}>
          <Text bold color="black">{`Disabled: ${disabled}`}</Text>
          <Text bold color="black">{`Preview: ${preview}`}</Text>
        </HStack>
        <VStack
          bg={"white"}
          borderRadius={6}
          shadow={3}
          key={"base"}
          py={4}
          mb={10}
        >
          {sessions.template.map((t, i) => {
            // const preview =
            //   !intersectionWith(currentPermission, t.editable, isEqual)
            //     .length ||
            //   !hasNextStep ||
            //   !intersectionWith(editRole, t.editable, isEqual).length;
            return (
              <ComponentRender
                template={{ ...t, disabled: disabled }}
                control={control}
                preview={preview}
                key={i}
              />
            );
          })}
        </VStack>
      </ScrollView>

      <VStack space={2} px={4} py={1}>
        <CustomButton
          callback={handleSubmit(onSubmit)}
          title="Create & Submit"
        />
      </VStack>
    </VStack>
  );
};

const AddFormPage = () => {
  const routes = useRoute();
  const params = routes.params;
  const { getFormTemplateById } = useDefaultAPI();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Loading...");
  const [template, setTemplate] = useState(null);
  const [hasNextStep, setHasNextStep] = useState(false);

  useEffect(() => {
    getFormTemplateById(params.id)
      .then((response) => {
        setTitle(response.data.description);
        setTemplate(response.data);
        setHasNextStep(
          response.data.flow.flow.length >
            (response.data.flow_data?.length || 0)
        );
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <VStack safeAreaBottom={true} flex={1}>
      <GlobalHeader headerText={title} />
      <Body
        sessions={template}
        hasNextStep={hasNextStep}
        currentStep={template?.flow_data?.length || 0}
        loading={loading}
      />
    </VStack>
  );
};

export default AddFormPage;
