import { dimensionVideoPlayer } from "./constants";
import { CropperChunk, CropperStatus } from "./types";

export const getCropperWidth = (ratio: string) => {
  const [height, width] = ratio.split(":");
  return dimensionVideoPlayer.height * (Number(height) / Number(width));
};

export function getCanvasDrawParams(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  cropX: number,
  cropperWidth: number
) {
  const scale = video.videoWidth / dimensionVideoPlayer.width;

  const sx = cropX * scale;
  const sy = 0;
  const sWidth = cropperWidth * scale;
  const sHeight = video.videoHeight;

  const dWidth = cropperWidth;
  const dHeight = canvas.height;
  return { sx, sy, sWidth, sHeight, dWidth, dHeight };
}

export function findNearestConfiguration(
  playedSeconds: number,
  cropperChunks: CropperChunk[],
  defaultConfig: CropperChunk
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

  const leftConfig = cropperChunks[left] ? cropperChunks[left] : defaultConfig;
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

export function makeCoordinates(
  status: CropperStatus,
  coordinates: number[]
): number[] {
  return status === CropperStatus.CROPPING
    ? coordinates
    : [0, dimensionVideoPlayer.width];
}
