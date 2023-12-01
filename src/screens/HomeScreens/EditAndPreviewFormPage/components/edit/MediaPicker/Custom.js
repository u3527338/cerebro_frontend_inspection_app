import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Badge, Center, Icon, Pressable, Text } from "native-base";
import LoadingComponent from "../../../../../../components/common/LoadingComponent";

export const CustomLoading = ({ loading, error, deleting }) => (
  <Center
    mt={3}
    h={100}
    w={100}
    borderRadius="md"
    borderWidth={1}
    borderColor="baseColor.200"
    backgroundColor="gray.100"
  >
    <LoadingComponent
      noSpinner={!loading}
      noText={loading}
      text={error ? "Upload Error" : deleting ? "Deleting" : ""}
      textFontSize="xs"
    />
  </Center>
);

export const PdfLogo = ({ style = null, color = "red.500" }) => {
  return (
    <Center {...style}>
      <Icon
        as={<MaterialIcons name="picture-as-pdf" />}
        size={16}
        color={color}
      />
    </Center>
  );
};

export const DeleteBadge = ({ handleDeleteFile, disabled }) => {
  return (
    <Pressable
      mb={-3}
      mr={-3}
      zIndex={1}
      onPress={handleDeleteFile}
      disabled={disabled}
      _disabled={{ opacity: 0.5 }}
    >
      <Badge
        colorScheme="danger"
        rounded={8}
        variant="solid"
        alignSelf="flex-end"
      >
        <Icon
          pl={0.5}
          as={<FontAwesome name="trash-o" />}
          color="white"
          size={4}
        />
      </Badge>
    </Pressable>
  );
};

export const CustomButton = ({ onPress, disabled, label }) => {
  return (
    <Pressable
      onPress={onPress}
      _disabled={{ opacity: 0.5 }}
      _pressed={{ bgColor: "primary.700" }}
      disabled={disabled}
      bgColor="primary.400"
      borderRadius="md"
      px={3}
      py={2}
    >
      <Text>{label}</Text>
    </Pressable>
  );
};
