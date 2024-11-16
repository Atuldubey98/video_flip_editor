import { useState } from "react";
import { CropperChunk, CropperStatus } from "../types";

export default function useCropper() {
  const [status, setStatus] = useState(CropperStatus.IDLE);
  const [cropperChunks, setCropperChunks] = useState<CropperChunk[]>([]);

  const onSetStatus = (status: CropperStatus) => {
    setStatus(status);
  };
  const onAddChunkToCropperGenerator = (cropperChunk: CropperChunk) =>
    setCropperChunks([...cropperChunks, cropperChunk]);
  return { status, onSetStatus, onAddChunkToCropperGenerator };
}
