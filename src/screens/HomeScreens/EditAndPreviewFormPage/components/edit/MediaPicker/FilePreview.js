import { memo } from "react";
import { Box, Center, Image, Text } from "native-base";
import { WebView } from "react-native-webview";
import { isImage } from "../../../../../../global/function";
import { Platform } from "react-native";

const FilePreview = ({
  uri,
  resizeMode = "cover",
  size = { height: "100%", width: "100%" },
}) => {
  return isImage(uri) ? (
    <Box
      h={size.height}
      w={size.width}
      bgColor="baseColor.600"
      borderColor="baseColor.400"
      borderWidth={1}
    >
      <Image
        source={{ uri }}
        flex={1}
        resizeMode={resizeMode}
        alt={"Cannot load image"}
      />
    </Box>
  ) : Platform.OS === "ios" ? (
    <WebView originWhitelist={["*"]} source={{ uri }} style={size} />
  ) : (
    <Center h="100%" bgColor="secondary.100">
      <Text color="black">PDF Preview is only available on IOS</Text>
    </Center>
  );
};

export default memo(FilePreview);
