import { aspectRatioOptions, playBackRateOptions } from "../../constants";
import { ActionType } from "../../hooks/useVideoPlayer";
import { VideoPlayerControl } from "../../types";
import ControlSelect from "../common/ControlSelect";
import "./Controls.css";
export default function Controls({
  videoPlayer,
  handleCropDrag,
}: {
  videoPlayer: VideoPlayerControl;
  handleCropDrag: (x: number) => void;
}) {
  const { dispatch: videoPlayerOperations, state: videoPlayerState } =
    videoPlayer;

  return (
    <div className="controls">
      <ControlSelect
        name="playbackRate"
        onChange={(e) => {
          videoPlayerOperations({
            type: ActionType.CHANGE_PLAYBACK_RATE,
            value: Number(e.currentTarget.value),
          });
        }}
        options={playBackRateOptions}
        value={videoPlayerState.playbackRate}
      />
      <ControlSelect
        name="aspectRatio"
        onChange={(e) => {
          videoPlayerOperations({
            type: ActionType.CHANGE_CROPPER_ASPECT_RATIO,
            value: e.currentTarget.value,
          });
          handleCropDrag(0);
        }}
        options={aspectRatioOptions}
        value={videoPlayerState.aspectRatio}
      />
    </div>
  );
}
