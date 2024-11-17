import { useState } from "react";
import ReactPlayer from "react-player";
import { useCroppedPreview, useVideoPlayer } from "../../hooks";
import useCropperChunks from "../../hooks/useCropperChunks";
import { ActionType } from "../../hooks/useVideoPlayer";
import { CropperChunk, CropperStatus, VideoPlayerStatus } from "../../types";
import Preview from "../canvasPreview/Preview";
import Button from "../common/Button";
import JsonFetcher from "./JsonFetcher";
import "./PreviewSession.css";

export default function PreviewSession() {
  const { onSetChunks, cropperChunks } = useCropperChunks({});
  const TOTAL_CHUNKS_TO_SHOW = 100;
  const left = cropperChunks.length - TOTAL_CHUNKS_TO_SHOW;
  const chunksStr = `${JSON.stringify(
    cropperChunks.slice(0, TOTAL_CHUNKS_TO_SHOW),
    null,
    2
  )}${left > 0 ? `...${left} more chunks` : ""}`;
  const videoPlayer = useVideoPlayer();
  const { state, dispatch } = videoPlayer;
  function findNearestConfiguration(
    playedSeconds: number
  ): CropperChunk | null {
    let left = 0;
    let right = cropperChunks.length - 1;

    if (cropperChunks.length === 0) return null;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTimeStamp = cropperChunks[mid].timeStamp;

      if (midTimeStamp === playedSeconds) {
        return cropperChunks[mid];
      } else if (midTimeStamp < playedSeconds) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    const leftConfig = cropperChunks[left]
      ? cropperChunks[left]
      : defaultConfig;
    const rightConfig = cropperChunks[right]
      ? cropperChunks[right]
      : defaultConfig;

    if (
      Math.abs(leftConfig.timeStamp - playedSeconds) <
      Math.abs(rightConfig.timeStamp - playedSeconds)
    ) {
      return leftConfig;
    }
    return rightConfig;
  }
  const defaultConfig = {
    timeStamp: 0,
    coordinates: [0, 0],
    playbackRate: 1,
    volume: 1,
  };
  const [config, setConfig] = useState<CropperChunk>(defaultConfig);
  const [cropX, cropperWidth] = config.coordinates;
  const onReady = (player: ReactPlayer): void =>
    onReadyVideoPlayer(player.getInternalPlayer() as HTMLVideoElement);
  const { canvasRef, onReadyVideoPlayer, previewStatus } = useCroppedPreview({
    cropperStatus: CropperStatus.CROPPING,
    cropperWidth: cropperWidth,
    cropX,
    videoPlayer,
  });
  return (
    <>
      <main>
        <JsonFetcher
          onSetChunks={onSetChunks}
          length={cropperChunks.length}
          chunksStr={chunksStr}
        />
        <div>
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
            onProgress={({ playedSeconds }) => {
              const config = findNearestConfiguration(playedSeconds);
              if (config) setConfig(config);
            }}
          />
          <Preview canvasRef={canvasRef} previewStatus={previewStatus} />
        </div>
      </main>
      <footer>
        {cropperChunks.length ? (
          <div className="video__operations">
            <Button
              onClick={() =>
                dispatch({
                  type: ActionType.CHANGE_STATUS,
                  value:
                    state.status === VideoPlayerStatus.PLAYING
                      ? VideoPlayerStatus.PAUSED
                      : VideoPlayerStatus.PLAYING,
                })
              }
            >
              {state.status === VideoPlayerStatus.PLAYING ? "Pause" : "Play"}
            </Button>
          </div>
        ) : null}
      </footer>
    </>
  );
}
