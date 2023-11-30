import { useRoute } from "@react-navigation/native";
import { Center, Text, VStack } from "native-base";
import LoadingComponent from "../../../components/common/LoadingComponent";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import EditFormArea from "./components/EditFormArea";

const Body = () => {
  const route = useRoute();
  const { useFormDataQuery } = useDefaultAPI();
  const { data, isFetching, error } = useFormDataQuery(route.params?.formId);

  return (
    <>
      {isFetching ? (
        <Center flex={1}>
          <LoadingComponent />
        </Center>
      ) : error ? (
        <Center flex={1}>
          <Text color="baseColor.200" fontSize="md">
            {error.message || "Error Fetching Form Data"}
          </Text>
        </Center>
      ) : (
        <EditFormArea formDetail={data} />
      )}
    </>
  );
};

const EditAndPreviewFormPage = () => {
  return (
    <VStack safeAreaBottom={true} flex={1}>
      <GlobalHeader />
      <Body />
    </VStack>
  );
};

export default EditAndPreviewFormPage;
