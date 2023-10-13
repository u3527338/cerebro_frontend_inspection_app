import moment from "moment";
import {Text, VStack} from "native-base"
import {Controller} from "react-hook-form";
import {memo} from "react";

const DateTimePreview = ({detail, control}) => {


  return (
    <Controller name={detail.key}
                control={control}
                render={
                  ({field: {onChange, onBlur, value}}) => (
                    <Text color={"baseColor.500"} fontSize={"md"} px={2} bold>
                      {moment(value).format("YYYY-MM-DD HH:mm:ss")}
                    </Text>
                  )}
    />
  )
}

export default memo(DateTimePreview)