import {HStack, Spinner, Text} from "native-base";

const LoadingComponent = ({
                            spinnerColor = "baseColor.200",
                            spinnerSize = "lg",
                            textColor = "baseColor.200",
                            textFontSize = "md"
                          }) => {

  return (
    <>
      <HStack alignItems={"center"} space={3}>
        <Spinner color={spinnerColor} size={spinnerSize}/>
        <Text color={textColor} fontSize={textFontSize}>Loading ..</Text>
      </HStack>
    </>
  )
}

export default LoadingComponent;