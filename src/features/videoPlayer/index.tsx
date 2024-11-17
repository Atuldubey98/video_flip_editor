import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { dimensionVideoPlayer } from "../../constants";
import { ActionType } from "../../hooks/useVideoPlayer";
import {
  CropperStatus,
  VideoPlayerControl,
  VideoPlayerStatus,
} from "../../types";
import Controls from "./Controls";
import Cropper from "./Cropper";
import "./VideoPlayer.css";
type CropperPosition = {
  handleCropDrag: (newCropX: number) => void;
  cropX: number;
};

type VideoPlayerProps = {
  videoPlayer: VideoPlayerControl;
  cropperPosition: CropperPosition;
  cropperStatus: CropperStatus;
  onReadyVideoPlayer: (video: HTMLVideoElement) => void;
  onEndAnimationFrame: () => void;
  clearCanvas: () => void;
  discardChunks: () => void;
  onAddChunkToCropperGenerator: (videoPlayerProgress: OnProgressProps) => void;
};

export default function VideoPlayer({
  videoPlayer,
  cropperPosition,
  cropperStatus,
  onReadyVideoPlayer,
  onEndAnimationFrame,
  discardChunks,
  onAddChunkToCropperGenerator,
  clearCanvas,
}: VideoPlayerProps) {
  const { state: videoPlayerState } = videoPlayer;

  const onReady = (player: ReactPlayer): void =>
    onReadyVideoPlayer(player.getInternalPlayer() as HTMLVideoElement);

  const onPlay = () => {
    clearCanvas();
    videoPlayer.dispatch({
      type: ActionType.CHANGE_STATUS,
      value: VideoPlayerStatus.PLAYING,
    });
  };
  return (
    <div className="video__player">
      <div
        style={{
          position: "relative",
        }}
        className="video__playerContainer"
      >
        <ReactPlayer
          url={"/video.mp4"}
          controls
          style={{
            objectFit: "contain",
            borderRadius: 20,
            ...dimensionVideoPlayer,
          }}
          {...dimensionVideoPlayer}
          onReady={onReady}
          volume={videoPlayerState.volume}
          playbackRate={videoPlayerState.playbackRate}
          onPlay={onPlay}
          onPause={() => {
            videoPlayer.dispatch({
              type: ActionType.CHANGE_STATUS,
              value: VideoPlayerStatus.PAUSED,
            });
          }}
          onStart={discardChunks}
          onEnded={onEndAnimationFrame}
          onProgress={onAddChunkToCropperGenerator}
        />

        {cropperStatus === CropperStatus.CROPPING ? (
          <Cropper
            aspectRatio={videoPlayerState.aspectRatio}
            cropX={cropperPosition.cropX}
            onDrag={cropperPosition.handleCropDrag}
          />
        ) : null}
      </div>
      <Controls
        videoPlayer={videoPlayer}
        handleCropDrag={cropperPosition.handleCropDrag}
      />
    </div>
  );
}
