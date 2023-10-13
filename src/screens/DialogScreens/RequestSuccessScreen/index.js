import {Button, Center, Text, VStack} from "native-base";
import {useNavigation, useRoute} from "@react-navigation/native";

const RequestSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <Center flex={1} bg={"rgba(20,20,20,0.5)"}>
        <Center bg={"white"} borderRadius={3} p={7}>

          <VStack space={3} minWidth={"80%"} maxWidth={"90%"}>
            <Text color={"baseColor.500"} fontSize={"md"}>{route.params && route.params.title}</Text>

            {route.params && route.params.message ? <VStack>
              <Text color={"baseColor.500"} fontSize={12}>Message:</Text>
              <Text color={"baseColor.500"} fontSize={"md"}
                    fontWeight={"bold"}>{route.params.message}</Text>
            </VStack> : null}

            <Button colorScheme={"primary"} onPress={() => navigation.goBack()}><Text fontWeight={"bold"}>OK</Text></Button>
          </VStack>

        </Center>
      </Center>
    </>
  )
}

export default RequestSuccessScreen;