import { useState } from "react";
import { OnProgressProps } from "react-player/base";
import { CropperChunk } from "../types";

export default function useCropperChunks({
  playbackRate,
  volume,
  coordinates,
}: {
  playbackRate?: number;
  volume?: number;
  coordinates?: number[];
}) {
  const [cropperChunks, setCropperChunks] = useState<CropperChunk[]>([]);
  const discardChunks = () => setCropperChunks([]);
  const onAddChunkToCropperGenerator = (playerProgress: OnProgressProps) => {
    if (!playbackRate || !volume || !coordinates) return;
    setCropperChunks([
      ...cropperChunks,
      {
        timeStamp: playerProgress.playedSeconds,
        playbackRate,
        volume,
        coordinates,
      },
    ]);
  };
  const onSetChunks = (chunks: CropperChunk[]): void =>
    setCropperChunks(chunks);
  return {
    onSetChunks,
    onAddChunkToCropperGenerator,
    discardChunks,
    cropperChunks,
  };
}
