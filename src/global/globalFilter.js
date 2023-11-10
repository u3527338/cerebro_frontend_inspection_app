import _ from "lodash";
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { memo, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";
import { StateContext } from "../context/stateContext";
import { ComponentRender } from "../screens/HomeScreens/EditAndPreviewFormPage/components/ComponentRender";

const CustomButton = ({ title, callback }) => (
  <Button
    w={"46%"}
    py={1}
    shadow={6}
    bg={"gray.500"}
    borderWidth={1}
    borderRadius={4}
    borderColor={"gray.700"}
    onPress={callback}
  >
    <Text color={"gray.300"} bold>
      {title}
    </Text>
  </Button>
);

const FilterForm = ({ control, sessions, handleResetFilter, handleSubmit }) => {
  return (
    <Box h={"85%"} bg={"baseColor.500"} borderTopRadius={16} py={6} px={4}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {sessions.map((session, i) => (
          <VStack key={i}>
            <Box py={2}>
              <ComponentRender control={control} template={session} />
            </Box>
          </VStack>
        ))}
        <Spacer h={120} />
      </ScrollView>
      <HStack mt={3} justifyContent={"space-between"}>
        <CustomButton callback={handleResetFilter} title={"CLEAR"} />
        <CustomButton callback={handleSubmit} title={"APPLY"} />
      </HStack>
    </Box>
  );
};
const GlobalFilter = ({ open, handleCloseModal, queryData }) => {
  const { setGlobalFilter, resetGlobalFilter, currentProject } =
    useContext(StateContext);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      global_filter: "",
      withCondition: false,
      location: [],
      location_detail: "",
      work: [],
      work_detail: "",
      applicant__full_name: [],
      created_at: null,
    },
  });

  const handleResetFilter = () => {
    // handleCloseModal();
    resetGlobalFilter();
    reset();
  };

  const onSubmit = (data) => {
    handleCloseModal();
    setGlobalFilter(
      _.pickBy(
        {
          ...data,
          location: data.location.toString(),
          work: data.work.toString(),
          applicant__full_name: data.applicant__full_name
            .map((n) => n.item)
            .toString(),
        },
        (value) => value
      )
    );
  };

  const sessions = [
    {
      type: "input",
      key: "global_filter",
      session: "Search",
    },
    {
      type: "checkbox",
      key: "withCondition",
      session: "Complete With Condition",
    },
    {
      type: "multiSelect",
      key: "location",
      session: "Location",
      item: queryData.location,
    },
    {
      type: "input",
      key: "location_detail",
      session: "Location Detail",
    },
    {
      type: "multiSelect",
      key: "work",
      session: "Works",
      item: queryData.works,
    },
    {
      type: "input",
      key: "work_detail",
      session: "Work Detail",
    },
    {
      type: "datetimepicker",
      key: "created_at",
      session: "Date",
      is_date_range: true,
    },
    {
      type: "autocomplete",
      key: "applicant__full_name",
      session: `Applicant`,
      list: queryData.users,
    },
  ];

  // useEffect(() => {
  //   reset();
  //   resetGlobalFilter();
  // }, [currentProject]);

  return (
    <Modal
      isVisible={open}
      onBackdropPress={handleCloseModal}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onSwipeComplete={handleCloseModal}
      propagateSwipe={true}
    >
      <FilterForm
        control={control}
        sessions={sessions}
        handleResetFilter={handleResetFilter}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </Modal>
  );
};

export default memo(GlobalFilter);
