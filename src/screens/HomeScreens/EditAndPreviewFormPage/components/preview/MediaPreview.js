import { memo } from "react";
import MediaPicker from "../edit/MediaPicker";

const MediaPreview = ({ detail, control }) => {
  return <MediaPicker control={control} detail={detail} editable={false} />;
};

export default memo(MediaPreview);
