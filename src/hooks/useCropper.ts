import { useState } from "react";
import { CropperChunk, CropperStatus } from "../types";
import { OnProgressProps } from "react-player/base";

export default function useCropper({ playbackRate }: { playbackRate: number }) {
  const [status, setStatus] = useState(CropperStatus.IDLE);
  const [cropperChunks, setCropperChunks] = useState<CropperChunk[]>([]);

  const onSetStatus = (status: CropperStatus) => {
    setStatus(status);
  };
  const onAddChunkToCropperGenerator = (playerProgress: OnProgressProps) => {
    setCropperChunks([
      ...cropperChunks,
      {
        playbackRate,
        timeStamp: playerProgress.playedSeconds,
        volume: 1,
      },
    ]);
  };
  const discardChunks = () => setCropperChunks([]);
  return {
    status,
    onSetStatus,
    onAddChunkToCropperGenerator,
    discardChunks,
    cropperChunks,
  };
}
