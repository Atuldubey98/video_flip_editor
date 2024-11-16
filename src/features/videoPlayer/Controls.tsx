import React from "react";
import { playBackRateOptions, aspectRatioOptions } from "../../constants";
import { Action, ActionType, State } from "../../hooks/useVideoPlayer";
import ControlSelect from "../common/ControlSelect";
import './Controls.css';
export default function Controls({
  videoPlayer,
  handleCropDrag,
}: {
  videoPlayer: {
    state: State;
    dispatch: React.Dispatch<Action>;
  };
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
