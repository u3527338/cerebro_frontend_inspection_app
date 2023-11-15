import { memo } from "react";
import MediaPicker from "../edit/MediaPicker";

const MediaPreview = ({ detail, control, imageOnly }) => {
  return (
    <MediaPicker
      control={control}
      detail={detail}
      editable={false}
      imageOnly={imageOnly}
    />
  );
};

export default memo(MediaPreview);
