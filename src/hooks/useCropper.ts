import { useState } from "react";
import { CropperChunk, CropperStatus } from "../types";
import { OnProgressProps } from "react-player/base";
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
  const [cropperChunks, setCropperChunks] = useState<CropperChunk[]>([]);

  const onSetStatus = (status: CropperStatus) => {
    setStatus(status);
  };
  const onAddChunkToCropperGenerator = (playerProgress: OnProgressProps) =>
    setCropperChunks(
      status === CropperStatus.CROPPING
        ? [
            ...cropperChunks,
            {
              timeStamp: playerProgress.playedSeconds,
              playbackRate,
              volume,
              coordinates,
            },
          ]
        : cropperChunks
    );
  const discardChunks = () => setCropperChunks([]);
  return {
    status,
    onSetStatus,
    onAddChunkToCropperGenerator,
    discardChunks,
    cropperChunks,
  };
}
