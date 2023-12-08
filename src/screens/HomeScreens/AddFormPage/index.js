import { useRoute } from "@react-navigation/native";
import _, { intersectionWith, isEqual } from "lodash";
import {
  Button,
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

const CustomButton = ({ title, callback }) => (
  <Button py={1} shadow={6} bg={"gray.500"} borderRadius={4} onPress={callback}>
    <Text color={"gray.300"} bold>
      {title}
    </Text>
  </Button>
);

const Body = ({ data, currentStep }) => {
  const { useUploadMultipleFileListsMutation } = useDefaultAPI();

  const {
    mutate: uploadMultipleFileListMutate,
    isPending: uploadFilesPending,
    error: uploadFilesError,
  } = useUploadMultipleFileListsMutation();

  const hasNextStep = data.flow.flow.length > (data.flow_data?.length || 0);
  const { currentPermission } = useContext(StateContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: _.fromPairs(
      data?.template?.map((item) => [item.key, item.preset])
    ),
  });

  const onSubmit = (data) => {
    const filesArr = filesToBeUploaded(data);
    uploadMultipleFileListMutate(filesArr, {
      onSuccess: (uploadedData) => {
        const formData = _.merge(data, ...uploadedData);
        console.log("formData", JSON.stringify(formData));
        // submit form by restructuring other data
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

  const [disabled, setDisabled] = useState(false);
  const [preview, setPreview] = useState(false);
  return (
    <VStack space={2} justifyContent={"space-between"} h={"85%"}>
      <Spinner visible={uploadFilesPending} />
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
