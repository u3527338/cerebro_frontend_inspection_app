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
import uploadFile from "../EditAndPreviewFormPage/components/edit/MediaPicker/submitFunction";
import Spinner from "react-native-loading-spinner-overlay";
import montserrat from "../../../themes/fonts/montserrat";

const CustomButton = ({ title, callback }) => (
  <Button py={1} shadow={6} bg={"gray.500"} borderRadius={4} onPress={callback}>
    <Text color={"gray.300"} bold>
      {title}
    </Text>
  </Button>
);

const Body = ({ data, currentStep }) => {
  const { useUploadFileMutation, useUploadGCSPathMutation } = useDefaultAPI();
  const {
    mutate: uploadFileMutate,
    isPending: uploadPending,
    error: uploadError,
  } = useUploadFileMutation();
  const {
    mutate: uploadGcsPathMutate,
    isPending: gcsPending,
    error: gcsError,
  } = useUploadGCSPathMutation();

  const hasNextStep = data.flow.flow.length > (data.flow_data?.length || 0);
  const { currentPermission } = useContext(StateContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: _.fromPairs(
      data?.template?.map((item) => [item.key, item.preset])
    ),
  });
  const onSubmit = (data) => {
    console.log(data.ImageAttachments);
    uploadFile(data.ImageAttachments, uploadFileMutate, uploadGcsPathMutate);
  };

  let editRole = [];
  const currentFlow = data.flow.flow[currentStep];
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
      <Spinner visible={uploadPending || gcsPending} />
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
          {data.template.map((t, i) => {
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
  const { useFormTemplateByIdQuery } = useDefaultAPI();
  const { data, isFetching } = useFormTemplateByIdQuery(params.id);

  return (
    <VStack safeAreaBottom={true} flex={1}>
      <GlobalHeader headerText={isFetching ? "Loading..." : data.description} />
      {isFetching ? (
        <Center height={"85%"}>
          <LoadingComponent />
        </Center>
      ) : (
        <Body data={data} currentStep={data?.flow_data?.length || 0} />
      )}
    </VStack>
  );
};

export default AddFormPage;
