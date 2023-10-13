import {useForm} from "react-hook-form";
import {Button, Center, Container, ScrollView, Text, VStack} from "native-base";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import MyTextInput from "../../../components/MyTextInput";


const ActionButtonArea = ({handleSubmit, name}) => {


  return (
    <Button shadow={3} onPress={handleSubmit}>{name}</Button>
  )
}


const FormBase = () => {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
    }
  });

  const onSubmitHandler = (data) => {
    console.log(data)
  }

  return (
    <VStack p={4} space={3}>

      <ScrollView py={2} shadow={1} bg={"#fff"} borderRadius={8} h={"75%"}>
        <FormSelect control={control} name={"test"}/>
        <FormInput control={control} name={"in1"}/>
        <FormInput control={control} name={"in2"}/>
        <FormInput control={control} name={"in3"}/>
        <FormInput control={control} name={"in4"}/>
        <FormInput control={control} name={"in5"}/>
        <FormInput control={control} name={"in6"}/>
        <FormInput control={control} name={"in7"}/>
        <FormInput control={control} name={"in8"}/>
        <FormInput control={control} name={"in9"}/>
      </ScrollView>


      <VStack space={1}>
        <Text color={"baseColor.300"} shadow={1}>Some text HERE for dummy</Text>
        <ScrollView horizontal w={"100%"} p={1}>
          <ActionButtonArea handleSubmit={handleSubmit(onSubmitHandler)} name={"Submit"}/>
        </ScrollView>
      </VStack>

    </VStack>
  )
}

export default FormBase;