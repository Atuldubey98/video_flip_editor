import ReactPlayer from "react-player";
import { dimensionVideoPlayer } from "../../constants";
import { Action, State } from "../../hooks/useVideoPlayer";
import Controls from "./Controls";
import Cropper from "./Cropper";
import "./VideoPlayer.css";
import { OnProgressProps } from "react-player/base";
import { CropperStatus } from "../../types";
type VideoPlayerProps = {
  videoPlayer: {
    state: State;
    dispatch: React.Dispatch<Action>;
  };
  cropperPosition: {
    handleCropDrag: (newCropX: number) => void;
    cropX: number;
  };
  cropperStatus: CropperStatus;
  onReadyVideoPlayer: (video: HTMLVideoElement) => void;
  onPlayVideoPlayerPaint: () => void;
  onEndAnimationFrame: () => void;
  clearCanvas: () => void;
  onAddChunkToCropperGenerator: (videoPlayerProgress: OnProgressProps) => void;
};

export default function VideoPlayer({
  videoPlayer,
  cropperPosition,
  cropperStatus,
  onReadyVideoPlayer,
  onPlayVideoPlayerPaint,
  onEndAnimationFrame,
  onAddChunkToCropperGenerator,
  clearCanvas,
}: VideoPlayerProps) {
  const { state: videoPlayerState } = videoPlayer;

  const onReady = (player: ReactPlayer): void =>
    onReadyVideoPlayer(player.getInternalPlayer() as HTMLVideoElement);

  const onPlay = () => {
    clearCanvas();
    onPlayVideoPlayerPaint();
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
          playbackRate={videoPlayerState.playbackRate}
          onPlay={onPlay}
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
