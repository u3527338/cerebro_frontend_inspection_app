import { HStack, Spinner, Text } from "native-base";

const LoadingComponent = ({
  spinnerColor = "baseColor.200",
  spinnerSize = "lg",
  textColor = "baseColor.200",
  textFontSize = "md",
  noSpinner = false,
  noText = false,
  text = "Loading ..",
  ...rest
}) => {
  return (
    <>
      <HStack alignItems={"center"} space={3} {...rest}>
        {!noSpinner && <Spinner color={spinnerColor} size={spinnerSize} />}
        {!noText && (
          <Text color={textColor} fontSize={textFontSize}>
            {text}
          </Text>
        )}
      </HStack>
    </>
  );
};

export default LoadingComponent;
