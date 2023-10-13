import {Button, Center, HStack, Text, VStack} from "native-base";
import {useNavigation, useRoute} from "@react-navigation/native";

const RequestErrorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <Center flex={1} bg={"rgba(33, 33, 33, 0)"}>
        <Center bg={"coolGray.900"} px={5} py={7} rounded={"xl"}>

          <VStack space={4} minWidth={"95%"} maxWidth={"95%"}>
            <Text fontSize={"lg"} bold>{route.params && route.params.title}</Text>

            {route.params && route.params.errorCode ?
              <HStack alignItems={"flex-end"} space={4}>
                <Text fontSize={"xs"}>ErrorCode:</Text>
                <Text fontSize={"md"} bold>{route.params.errorCode}</Text>
              </HStack> : null}

            {route.params && route.params.errorMessage ?
              <VStack>
                <Text fontSize={"xs"}>ErrorMessage:</Text>
                <Text fontSize={"md"} bold>{route.params.errorMessage}</Text>
              </VStack> : null}

            <Button colorScheme={"primary"} onPress={() => navigation.goBack()}>
              <Text bold>OK</Text>
            </Button>
          </VStack>

        </Center>
      </Center>
    </>
  )
}

export default RequestErrorScreen;