import { memo } from "react";
import { Image } from "native-base";
import { WebView } from "react-native-webview";
import { isImage } from "../../../../../../global/function";

const FilePreview = ({ uri, size = { height: "100%", width: "100%" } }) => {
  return isImage(uri) ? (
    <Image
      source={{ uri }}
      rounded="md"
      borderRadius="md"
      h={size.height}
      w={size.width}
      alt={"Cannot load image"}
    />
  ) : (
    <WebView originWhitelist={["*"]} source={{ uri }} style={size} />
  );
};

export default memo(FilePreview);
