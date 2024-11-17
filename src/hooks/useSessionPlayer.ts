import { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import {
  buttonVideoPlayerStateLabels,
  dimensionVideoPlayer,
} from "../constants";
import { CropperChunk, CropperStatus, VideoPlayerStatus } from "../types";
import { findNearestConfiguration } from "../utils";
import useCroppedPreview from "./useCroppedPreview";
import useVideoPlayer, { ActionType } from "./useVideoPlayer";

export default function useSessionPlayer({
  cropperChunks,
}: {
  cropperChunks: CropperChunk[];
}) {
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
  const { onReadyVideoPlayer, video, ...canvasProps } = useCroppedPreview({
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
  return {
    onReady,
    onProgress,
    buttonVideoPlayerStatus,
    onStartOver,
    onToggleVideoPlayerStatus,
    canvasProps,
    config,
    videoPlayer,
    video,
  };
}
