import {Text, VStack, Select, CheckIcon} from "native-base";
import {Controller} from "react-hook-form";
import {useState} from "react";

const FormSelect = ({control, name}) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [service, setService] = useState("");

  return (
    <Controller name={name}
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <VStack space={0.5} p={2} w={"100%"}>
                    <Text color={"baseColor.500"} px={1}>Session</Text>

                    <Select selectedValue={value}
                            mt={1} w={"auto"}
                            size={"xl"} color={"baseColor.500"}
                            accessibilityLabel="Choose Service"
                            placeholder="Choose Service"
                            _selectedItem={{
                              bg: "primary.500",
                              // endIcon: <CheckIcon size="lg"/>
                            }} onValueChange={itemValue => onChange(itemValue)}>
                      <Select.Item label="UX Research" value="UX Research"/>
                      <Select.Item label="Web Development" value="Web Development"/>
                      <Select.Item label="Cross Platform Development" value="Cross Platform Development"/>
                      <Select.Item label="UI Designing" value="UI Designing"/>
                      <Select.Item label="Backend Development" value="Backend Development"/>
                    </Select>

                    <Text color={"baseColor.500"} px={1}>Caption</Text>
                  </VStack>
                )}
    />
  )
}

export default FormSelect;