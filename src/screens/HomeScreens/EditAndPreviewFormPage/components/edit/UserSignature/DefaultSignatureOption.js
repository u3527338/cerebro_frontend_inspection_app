import { Checkbox, Text, VStack } from "native-base";
import { memo } from "react";

const DefaultSignatureOption = ({ onChange, defaultSignature }) => {
  return (
    <VStack pt={2} space={2}>
      <Checkbox onChange={onChange} size="sm" bgColor="transparent">
        <Text fontSize={12} color="baseColor.400">
          Use Default Signature
        </Text>
      </Checkbox>
      {defaultSignature && (
        <Text color="red.500" bold fontSize={12}>
          Remarks: Please make sure you have provided your default signature.
          Otherwise, no signature will be signed on the generated PDF.
        </Text>
      )}
    </VStack>
  );
};

export default memo(DefaultSignatureOption);
