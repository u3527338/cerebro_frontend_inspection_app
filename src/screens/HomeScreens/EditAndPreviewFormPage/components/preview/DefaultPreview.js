import { Pressable, Text } from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

const DefaultPreview = ({ control, detail }) => {
  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Pressable
          onPress={() => {
            alert(JSON.stringify(detail));
          }}
        >
          <Text color={"baseColor.400"} p={2}>
            {value || `Blank (type: ${detail.type}, component: DefaultPreview)`}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default memo(DefaultPreview);
