import { intersectionWith, isEqual } from "lodash";
import { VStack } from "native-base";
import { useContext } from "react";
import { StateContext } from "../../../../context/stateContext";
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
      {templateDetail.template.template.map((item, index) => {
        const preview =
          !intersectionWith(currentPermission, item.editable, isEqual).length ||
          !hasNextStep ||
          !intersectionWith(editRole, item.editable, isEqual).length;
        return (
          <VStack bg={item.bgColor} key={index}>
            <ComponentRender
              template={item}
              control={control}
              preview={preview}
            />
          </VStack>
        );
      })}
    </>
  );
};

export default FormWrapper;
