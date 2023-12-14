import { useNavigation, useRoute } from "@react-navigation/native";
import _, { intersectionWith, isEqual } from "lodash";
import {
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import { ComponentRender } from "../EditAndPreviewFormPage/components/ComponentRender";
import Spinner from "react-native-loading-spinner-overlay";
import { filesToBeUploaded } from "../../../global/function";

const CustomButton = ({ title, callback, disabled }) => (
  <Pressable
    py={1}
    shadow={6}
    bg={"gray.500"}
    borderRadius={4}
    onPress={callback}
    disabled={disabled}
    _disabled={{ opacity: 0.5 }}
  >
    <Center>
      <Text color={"gray.300"} bold>
        {title}
      </Text>
    </Center>
  </Pressable>
);

const Body = ({ data, currentStep }) => {
  const navigation = useNavigation();
  const { useUploadMultipleFileListsMutation, useNewFormMutation } =
    useDefaultAPI();
  const { currentProject, currentCategory, currentPermission } =
    useContext(StateContext);

  const {
    mutate: uploadMultipleFileListMutate,
    isPending: uploadFilesPending,
  } = useUploadMultipleFileListsMutation();

  const { mutate: createNewFormMutate, isPending: newFormCreationPending } =
    useNewFormMutation();

  const hasNextStep = data.flow.flow.length > (data.flow_data?.length || 0);
  const { control, handleSubmit } = useForm({
    defaultValues: _.fromPairs(
      data?.template?.map((item) => [item.key, item.preset])
    ),
  });

  const info = {
    project: currentProject.project.id,
    template: 1,
    flow: data.flow.id,
    category: currentCategory.id,
  };

  const onSubmit = (finalizedData) => {
    //execute
    alert(JSON.stringify(finalizedData));
    // createNewFormMutate(finalizedData, {
    //   onSuccess: (response) => {
    //     navigation.goBack();
    //   },
    //   onError: (error) => {
    //     alert(error.message);
    //   },
    // });
  };

  const preSubmit = (form_data) => {
    const filesArr = filesToBeUploaded(form_data);
    if (filesArr.length === 0) onSubmit({ ...info, data: form_data });
    else
      uploadMultipleFileListMutate(filesArr, {
        onSuccess: (uploadedData) => {
          const formData = _.merge(form_data, ...uploadedData);
          onSubmit({ ...info, data: formData });
        },
        onError: (error) => {
          alert(error.message);
        },
      });
  };

  let editRole = [];
  const currentFlow = data.flow.flow[currentStep];
  if (currentFlow) {
    editRole =
      typeof currentFlow.role === "string"
        ? [currentFlow.role]
        : currentFlow.role;
  }

  // const [disabled, setDisabled] = useState(false);
  // const [preview, setPreview] = useState(false);
  return (
    <VStack space={2} justifyContent={"space-between"} h={"85%"}>
      <Spinner visible={uploadFilesPending || newFormCreationPending} />
      <ScrollView
        py={4}
        px={2}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {/* <HStack justifyContent={"space-around"} p={2}>
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
        </HStack> */}
        <VStack
          bg={"white"}
          borderRadius={6}
          shadow={3}
          key={"base"}
          py={4}
          mb={10}
        >
          {data.template.map((t, i) => {
            const preview =
              !intersectionWith(currentPermission, t.editable, isEqual)
                .length ||
              !hasNextStep ||
              !intersectionWith(editRole, t.editable, isEqual).length;
            return (
              <ComponentRender
                // template={{ ...t, disabled: disabled }}
                template={t}
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
          callback={handleSubmit(preSubmit)}
          title="Create & Submit"
          disabled={uploadFilesPending || newFormCreationPending}
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
