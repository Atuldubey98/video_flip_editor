import { useState } from "react";
import { CropperStatus } from "../types";
import { makeCoordinates } from "../utils";
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
  const [status, setStatus] = useState(CropperStatus.IDLE);

  const onSetStatus = (status: CropperStatus) => {
    setStatus(status);
  };
  const { onAddChunkToCropperGenerator, discardChunks, cropperChunks } =
    useCropperChunks({
      playbackRate,
      volume,
      coordinates: makeCoordinates(status, coordinates),
    });

  return {
    status,
    onSetStatus,
    onAddChunkToCropperGenerator,
    discardChunks,
    cropperChunks,
  };
}
