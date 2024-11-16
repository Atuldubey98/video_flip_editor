import { useEffect } from "react";
import { Action, ActionType } from "./useVideoPlayer";

export default function useVideoPlayerPropertiesChange({
  video,
  videoPlayerDispatch,
}: {
  video: HTMLVideoElement | null;
  videoPlayerDispatch: React.Dispatch<Action>;
}) {
  useEffect(() => {
    if (!video) return;
    video.onvolumechange = () => {
      videoPlayerDispatch({
        type: ActionType.CHANGE_VOLUME,
        value: video.volume,
      });
    };
  }, [video]);
}
