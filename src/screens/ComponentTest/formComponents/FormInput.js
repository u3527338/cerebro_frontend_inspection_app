import {Box, Text, VStack, Input} from "native-base";
import {Controller} from "react-hook-form";
import {useState} from "react";

const FormInput = ({control, name}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <Controller name={name}
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <VStack space={1} p={2}>
                    <Text color={"baseColor.500"} px={1}>Session</Text>
                    {/*<Box borderRadius={"8%"} borderWidth={1} borderColor={isFocus ? "primary.500" : "baseColor.300"}*/}
                    {/*     p={2}*/}
                    {/*>*/}

                    {/*  <TextInput placeholder={"Text Here"}*/}
                    {/*             onFocus={() => setIsFocus(true)}*/}
                    {/*             onBlur={() => setIsFocus(false)}*/}
                    {/*             disable={isDisabled}*/}
                    {/*  />*/}

                    {/*</Box>*/}
                    <Input color={"baseColor.500"} size={"xl"} py={4} value={value} onChangeText={onChange}/>
                    <Text color={"baseColor.500"} px={1}>Caption</Text>
                  </VStack>
                )}
    />
  )
}

export default FormInput;