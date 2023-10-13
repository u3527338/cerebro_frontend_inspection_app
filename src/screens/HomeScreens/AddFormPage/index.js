import { useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import GlobalHeader from "../../../global/globalHeader";
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

const Body = ({ sessions }) => {
  // const route = useRoute()
  // const {getFormData} = useDefaultAPI()

  // const [formDetail, setFormDetail] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [isError, setIsError] = useState(false)

  // useEffect(() => {
  //   getFormData(route.params.formId)
  //     .then(response => setFormDetail(response.data))
  //     .catch(error => setIsError(error))
  //     .finally(() => setIsLoading(false))
  // }, [])

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      // global_filter: "",
      // withCondition: false,
      // location: [],
      // location_detail: "",
      // work: [],
      // work_detail: "",
      // applicant__full_name: [],
      // created_at: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <VStack space={2} justifyContent={"space-between"} h={"85%"}>
        <ScrollView
          py={4}
          px={2}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <VStack
            bg={"white"}
            borderRadius={6}
            shadow={3}
            key={"base"}
            py={2}
            // space={}
            mb={10}
          >
            {sessions.map((session, i) => (
              <VStack key={i}>
                <ComponentRender control={control} template={session} />
              </VStack>
            ))}
          </VStack>
        </ScrollView>

        <VStack space={2} px={4} py={1}>
          <CustomButton
            callback={handleSubmit(onSubmit)}
            title="Create & submit"
          />
        </VStack>
      </VStack>
    </>
  );
};

const AddFormPage = () => {
  const routes = useRoute();
  const params = routes.params;

  return (
    <VStack safeAreaBottom={true} flex={1}>
      <GlobalHeader headerText={params.detail.description} />
      <Body sessions={params.detail.template} />
    </VStack>
  );
};

export default AddFormPage;
