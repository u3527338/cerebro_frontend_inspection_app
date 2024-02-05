import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import _ from "lodash";
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
import Spinner from "react-native-loading-spinner-overlay";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import {
  filesToBeUploaded,
  mergeObject,
  setDefaultValues,
} from "../../../global/function";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import { ComponentRender } from "../EditAndPreviewFormPage/components/ComponentRender";

const CustomButton = ({ title, callback, disabled, ...props }) => (
  <Pressable
    py={1}
    shadow={6}
    bg={"primary.600"}
    borderRadius={4}
    onPress={callback}
    disabled={disabled}
    _disabled={{ bg: "primary.800", opacity: 0.5 }}
    _pressed={{ bg: "primary.800" }}
    {...props}
  >
    <Center>
      <Text color={"gray.300"} bold>
        {title}
      </Text>
    </Center>
  </Pressable>
);

const Body = ({ data, currentStep, templateId }) => {
  const navigation = useNavigation();
  const { useNewFormMutation, useUploadFileMutation } = useDefaultAPI();

  const { currentProject, currentCategory, currentPermission } =
    useContext(StateContext);

  const { mutate: uploadFilesMutate, isPending: uploadFilesPending } =
    useUploadFileMutation();

  const { mutate: createNewFormMutate, isPending: newFormCreationPending } =
    useNewFormMutation();

  const hasNextStep = data.flow.flow.length > (data.flow_data?.length || 0);

  const form = useForm({
    defaultValues: setDefaultValues(data?.template),
  });

  const { control, handleSubmit } = form;

  const info = {
    project: currentProject.project.id,
    template: templateId,
    flow: data.flow.id,
    category: currentCategory.id,
  };

  const onSubmit = (finalizedData) => {
    console.log(JSON.stringify(finalizedData));
    // createNewFormMutate(finalizedData, {
    //   onSuccess: (response) => {
    //     navigation.navigate("My Task");
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
      uploadFilesMutate(filesArr, {
        onSuccess: (uploadedData) => {
          onSubmit({ ...info, data: mergeObject(form_data, uploadedData) });
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

  const [disabled, setDisabled] = useState(false);
  const [preview, setPreview] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [addForm, setAddForm] = useState(
    data.template.some((obj) => "page" in obj)
      ? data.template.filter((obj) => obj.page === currentPage)
      : data.template
  );
  const totalPage = _.max(data.template.map((obj) => obj.page)) || 1;

  const addPage = (page) => {
    setCurrentPage(currentPage + page);
    setAddForm(data.template.filter((obj) => obj.page === currentPage + page));
  };

  return (
    <VStack space={2} justifyContent={"space-between"} h={"88%"}>
      <Spinner visible={uploadFilesPending || newFormCreationPending} />
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
          <FlashList
            data={addForm}
            renderItem={({ item }) => (
              <ComponentRender
                template={{ ...item, disabled: disabled }}
                // template={t}
                control={control}
                preview={preview}
                form={form}
              />
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
        {/* <VStack
          bg={"white"}
          borderRadius={6}
          shadow={3}
          key={"base"}
          py={4}
          mb={10}
        >
          {addForm.map((t, i) => {
            // const preview =
            //   !intersectionWith(currentPermission, t.editable, isEqual)
            //     .length ||
            //   !hasNextStep ||
            //   !intersectionWith(editRole, t.editable, isEqual).length;
            return (
              <ComponentRender
                template={{ ...t, disabled: disabled }}
                // template={t}
                preview={preview}
                key={i}
                form={form}
              />
            );
          })}
        </VStack> */}
      </ScrollView>

      <VStack space={2} px={4} py={1}>
        <HStack justifyContent="space-between">
          <CustomButton
            w={24}
            callback={() => addPage(-1)}
            title="Previous"
            disabled={currentPage <= 1}
          />
          <Text
            marginY="auto"
            color="black"
          >{`${currentPage} / ${totalPage}`}</Text>
          <CustomButton
            w={24}
            callback={() => addPage(1)}
            title="Next"
            disabled={currentPage >= totalPage}
          />
        </HStack>
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
        <Body
          data={data}
          currentStep={data?.flow_data?.length || 0}
          templateId={params.id}
        />
      )}
    </VStack>
  );
};

export default AddFormPage;
