import {Controller} from "react-hook-form";
import {VStack, Text} from "native-base"
import {memo} from "react";

const DefaultComponent = ({control, detail}) => {

  return (
    <Controller name={detail.key}
                control={control}
                render={
                  ({field: {value}}) => (
                    <Text color={"baseColor.500"} px={2} bold>{value}</Text>
                  )
                }
    />
  )
}

export default memo(DefaultComponent);