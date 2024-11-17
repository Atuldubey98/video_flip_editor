import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { ActionType } from "../../hooks/useVideoPlayer";
import {
    CropperChunk,
    PreviewErrorStatus,
    VideoPlayerControl,
    VideoPlayerStatus,
} from "../../types";
import Preview from "../canvasPreview/Preview";

type SessionPlayerProps = {
  onReady: (player: ReactPlayer) => void;
  onProgress: ({ playedSeconds }: OnProgressProps) => void;
  config: CropperChunk;
  videoPlayer: VideoPlayerControl;
  canvasProps: {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    clearCanvas: () => void;
    onEndAnimationFrame: () => void;
    previewStatus: PreviewErrorStatus;
  };
};
export default function SessionPlayer({
  videoPlayer,
  config,
  onReady,
  onProgress,
  canvasProps,
}: SessionPlayerProps) {
  const { dispatch, state } = videoPlayer;

  return (
    <div className="player">
      <ReactPlayer
        playing={state.status === VideoPlayerStatus.PLAYING}
        onPlay={() =>
          dispatch({
            type: ActionType.CHANGE_STATUS,
            value: VideoPlayerStatus.PLAYING,
          })
        }
        onPause={() => {
          dispatch({
            type: ActionType.CHANGE_STATUS,
            value: VideoPlayerStatus.PAUSED,
          });
        }}
        volume={config.volume}
        playbackRate={config.playbackRate}
        onReady={onReady}
        style={{
          display: "none",
        }}
        url={"/video.mp4"}
        controls
        onProgress={onProgress}
      />
      <Preview {...canvasProps} />
    </div>
  );
}
