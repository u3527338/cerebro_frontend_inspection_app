import {HStack, Pressable, Text, VStack} from "native-base";

const FormCard = ({detail, callback}) => {

  return (
    <Pressable onPress={() => callback(detail)}>
      {({isPressed}) => {
        return <VStack bg={"primary.400"} opacity={isPressed ? 0.7 : 1}
                       p={2} rounded={"md"} shadow={2}
                       transform={[{
                         scale: isPressed ? 0.96 : 1
                       }]}
        >
          <HStack justifyContent={"space-between"} paddingBottom={1}>
            <Text color={"baseColor.500"} fontSize={"xl"}>{detail.project.project_code} - {detail.project.title}</Text>
            {detail.admin ? <Text>Admin</Text> : null}
          </HStack>
          <Text color={"baseColor.500"}>{detail.project.description}</Text>
        </VStack>
      }}
    </Pressable>
  )
}

export default FormCard;