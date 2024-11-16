import ReactPlayer from "react-player";
import { dimensionVideoPlayer } from "../../constants";
import { Action, State } from "../../hooks/useVideoPlayer";
import Controls from "./Controls";
import Cropper from "./Cropper";
import "./VideoPlayer.css";
import { CropperChunk } from "../../types";
export default function VideoPlayer({
  videoPlayer,
  cropperPosition,
  onReadyVideoPlayer,
  onPlayVideoPlayerPaint,
  onEndAnimationFrame,
  clearCanvas,
  onAddChunkToCropperGenerator,
}: {
  videoPlayer: {
    state: State;
    dispatch: React.Dispatch<Action>;
  };
  cropperPosition: {
    handleCropDrag: (newCropX: number) => void;
    cropX: number;
  };
  onReadyVideoPlayer: (video: HTMLVideoElement) => void;
  onPlayVideoPlayerPaint: () => void;
  onEndAnimationFrame: () => void;
  clearCanvas: () => void;
  onAddChunkToCropperGenerator: (chunk: CropperChunk) => void;
}) {
  const { state: videoPlayerState } = videoPlayer;

  return (
    <div className="video__player">
      <div
        style={{
          position: "relative",
        }}
        className="video__playerContainer"
      >
        <ReactPlayer
          url={"/1080.mp4"}
          controls
          style={{
            objectFit: "contain",
            ...dimensionVideoPlayer,
          }}
          {...dimensionVideoPlayer}
          onReady={(player) =>
            onReadyVideoPlayer(player.getInternalPlayer() as HTMLVideoElement)
          }
          playbackRate={videoPlayerState.playbackRate}
          onPlay={() => {
            clearCanvas();
            onPlayVideoPlayerPaint();
          }}
          onEnded={onEndAnimationFrame}
          onProgress={(progress) => {
            onAddChunkToCropperGenerator({
              playbackRate: videoPlayer.state.playbackRate,
              timeStamp: progress.playedSeconds,
              volume: 1,
            });
          }}
        />

        <Cropper
          aspectRatio={videoPlayerState.aspectRatio}
          cropX={cropperPosition.cropX}
          onDrag={cropperPosition.handleCropDrag}
        />
      </div>
      <Controls
        videoPlayer={videoPlayer}
        handleCropDrag={cropperPosition.handleCropDrag}
      />
    </div>
  );
}
