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
            <Text color={"baseColor.300"} fontSize={"xs"}>
              {item.session}
            </Text>
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
            <VStack>
              {item.caption ? (
                <Text color={"gray.400"} sub px={2}>
                  {item.caption}
                </Text>
              ) : (
                <Box h={1} />
              )}
              {item.divider ? (
                <Divider my={1} bg={"baseColor.300"} rounded={"md"} />
              ) : null}
            </VStack>
          </VStack>
        </>
      ))}
    </>
  );
};

export default FormWrapper;
