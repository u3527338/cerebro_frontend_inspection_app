import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../../context/stateContext";
import { Box, Divider, Text, VStack } from "native-base";
import { isEqual, intersectionWith } from "lodash";
import { ComponentRender } from "./ComponentRender";

const FormWrapper = ({ templateDetail, control, hasNextStep, currentFlow }) => {
  const { currentPermission } = useContext(StateContext);
  let editRole = [];
  if (currentFlow) {
    editRole =
      typeof currentFlow.role === "string"
        ? [currentFlow.role]
        : currentFlow.role;
  }

  return (
    <>
      {templateDetail.template.template.map((item, index) => (
        <>
          <VStack px={2} pt={2} bg={item.bgColor} key={index}>
            {!!intersectionWith(currentPermission, item.editable, isEqual)
              .length &&
            hasNextStep &&
            !!intersectionWith(editRole, item.editable, isEqual).length ? (
              <ComponentRender
                template={item}
                control={control}
                preview={false}
              />
            ) : (
              <ComponentRender
                template={item}
                control={control}
                preview={true}
              />
            )}
            <VStack></VStack>
          </VStack>
        </>
      ))}
    </>
  );
};

export default FormWrapper;
