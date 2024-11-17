import { useState } from "react";
import { CropperStatus } from "../types";
import useCropperChunks from "./useCropperChunks";
import { State } from "./useVideoPlayer";

type CropperHookProps = {
  videoPlayerState: State;
  coordinates: number[];
};

export default function useCropper({
  videoPlayerState,
  coordinates,
}: CropperHookProps) {
  const { playbackRate, volume } = videoPlayerState;
  const { onAddChunkToCropperGenerator, discardChunks, cropperChunks } =
    useCropperChunks({
      playbackRate,
      volume,
      coordinates,
    });
  const [status, setStatus] = useState(CropperStatus.IDLE);

  const onSetStatus = (status: CropperStatus) => {
    setStatus(status);
  };

  return {
    status,
    onSetStatus,
    onAddChunkToCropperGenerator,
    discardChunks,
    cropperChunks,
  };
}
