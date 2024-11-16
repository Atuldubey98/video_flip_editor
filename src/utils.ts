import { dimensionVideoPlayer } from "./constants";

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
