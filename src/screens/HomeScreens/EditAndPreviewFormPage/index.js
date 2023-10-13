import GlobalHeader from "../../../global/globalHeader";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import LoadingComponent from "../../../components/common/LoadingComponent";
import EditFormArea from "./components/EditFormArea";
import { Center, VStack } from "native-base";

const Body = () => {
  const route = useRoute();
  const { getFormData } = useDefaultAPI();

  const [formDetail, setFormDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getFormData(route.params.formId)
      .then((response) => setFormDetail(response.data))
      .catch((error) => setIsError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Center flex={1}>
          <LoadingComponent />
        </Center>
      ) : (
        <EditFormArea formDetail={formDetail} />
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
