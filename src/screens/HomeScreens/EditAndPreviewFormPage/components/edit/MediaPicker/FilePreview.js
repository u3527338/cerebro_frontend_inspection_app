import { memo } from "react";
import { Box, Image } from "native-base";
import { WebView } from "react-native-webview";
import { isImage } from "../../../../../../global/function";

const FilePreview = ({ uri, size = { height: "100%", width: "100%" } }) => {
  return isImage(uri) ? (
    <Box
      h={size.height}
      w={size.width}
      bgColor="primary.100"
      rounded="md"
      borderRadius="md"
    >
      <Image
        source={{ uri }}
        flex={1}
        resizeMode="contain"
        alt={"Cannot load image"}
      />
    </Box>
  ) : (
    <WebView originWhitelist={["*"]} source={{ uri }} style={size} />
  );
};

export default memo(FilePreview);
