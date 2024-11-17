import { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import {
  buttonVideoPlayerStateLabels,
  dimensionVideoPlayer,
} from "../../constants";
import { useCroppedPreview, useVideoPlayer } from "../../hooks";
import useCropperChunks from "../../hooks/useCropperChunks";
import { ActionType } from "../../hooks/useVideoPlayer";
import { CropperChunk, CropperStatus, VideoPlayerStatus } from "../../types";
import { findNearestConfiguration } from "../../utils";
import Preview from "../canvasPreview/Preview";
import JsonFetcher from "./JsonFetcher";
import "./PreviewSession.css";
import SessionFooterButtons from "./SessionFooterButtons";

export default function PreviewSession() {
  const { onSetChunks, cropperChunks, discardChunks } = useCropperChunks({});
  const TOTAL_CHUNKS_TO_SHOW = 100;
  const left = cropperChunks.length - TOTAL_CHUNKS_TO_SHOW;
  const chunksStr = `${JSON.stringify(
    cropperChunks.slice(0, TOTAL_CHUNKS_TO_SHOW),
    null,
    2
  )}${left > 0 ? `...${left} more chunks` : ""}`;
  const videoPlayer = useVideoPlayer();
  const { state, dispatch } = videoPlayer;

  const defaultConfig = {
    timeStamp: 0,
    coordinates: [0, dimensionVideoPlayer.width],
    playbackRate: 1,
    volume: 1,
  };
  const [config, setConfig] = useState<CropperChunk>(defaultConfig);
  const [cropX, cropperWidth] = config.coordinates;
  const onReady = (player: ReactPlayer): void =>
    onReadyVideoPlayer(player.getInternalPlayer() as HTMLVideoElement);
  const { canvasRef, onReadyVideoPlayer, previewStatus, video } =
    useCroppedPreview({
      cropperStatus: CropperStatus.CROPPING,
      cropperWidth: cropperWidth,
      cropX,
      videoPlayer,
    });

  const onToggleVideoPlayerStatus = () =>
    dispatch({
      type: ActionType.CHANGE_STATUS,
      value:
        state.status === VideoPlayerStatus.PLAYING
          ? VideoPlayerStatus.PAUSED
          : VideoPlayerStatus.PLAYING,
    });
  const onProgress = ({ playedSeconds }: OnProgressProps) => {
    const config = findNearestConfiguration(
      playedSeconds,
      cropperChunks,
      defaultConfig
    );
    if (config) setConfig(config);
  };
  const onStartOver = () => {
    if (!video) return;
    video.fastSeek(0);
  };
  const buttonVideoPlayerStatus = buttonVideoPlayerStateLabels.get(
    videoPlayer.state.status
  );
  return (
    <>
      <main>
        <JsonFetcher
          onSetChunks={onSetChunks}
          length={cropperChunks.length}
          chunksStr={chunksStr}
        />
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
          <Preview canvasRef={canvasRef} previewStatus={previewStatus} />
        </div>
      </main>
      <footer>
        {cropperChunks.length ? (
          <SessionFooterButtons
            onToggleVideoPlayerStatus={onToggleVideoPlayerStatus}
            onStartOver={onStartOver}
            onCancelSession={() => {
              discardChunks();
              if (!video) return;
              video.fastSeek(0);
            }}
            buttonVideoPlayerStatus={buttonVideoPlayerStatus}
          />
        ) : null}
      </footer>
    </>
  );
}
