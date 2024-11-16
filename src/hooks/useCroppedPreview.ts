import { useRef, useState } from "react";
import { dimensionVideoPlayer } from "../constants";
import { CropperStatus, PreviewErrorStatus } from "../types";

interface CroppedPreviewProps {
  cropperWidth: number;
  cropX: number;
  cropperStatus: CropperStatus;
}

export default function useCroppedPreview({
  cropperWidth,
  cropX,
  cropperStatus,
}: CroppedPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [previewStatus, setPreviewStatus] = useState(
    PreviewErrorStatus.CROPPER_REMOVED
  );
  const onReadyVideoPlayer = (video: HTMLVideoElement) =>
    (videoElementRef.current = video);
  const animationFrame = useRef<number | null>(null);

  const onPlayVideoPlayerPaint = () => {
    if (!canvasRef.current) {
      setPreviewStatus(PreviewErrorStatus.CANVAS_ERROR);
      return;
    }
    if (!videoElementRef.current) {
      setPreviewStatus(PreviewErrorStatus.VIDEO_ERROR);
      return;
    }
    if ([CropperStatus.IDLE, CropperStatus.REMOVED].includes(cropperStatus)) {
      setPreviewStatus(PreviewErrorStatus.CROPPER_REMOVED);
      return;
    }
    onEndAnimationFrame();
    if (!context.current) context.current = canvasRef.current.getContext("2d");
    clearCanvas();
    setPreviewStatus(PreviewErrorStatus.PREVIEWING);

    const video = videoElementRef.current;
    const canvas = canvasRef.current;

    const scale = video.videoWidth / dimensionVideoPlayer.width;

    const sx = cropX * scale;
    const sy = 0;
    const sWidth = cropperWidth * scale;
    const sHeight = video.videoHeight;

    const dWidth = cropperWidth;
    const dHeight = canvas.height;

    context.current?.drawImage(
      video,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      dWidth,
      dHeight
    );

    animationFrame.current = requestAnimationFrame(onPlayVideoPlayerPaint);
  };

  const onEndAnimationFrame = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !context.current) return;
    context.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return {
    onPlayVideoPlayerPaint,
    onReadyVideoPlayer,
    canvasRef,
    clearCanvas,
    onEndAnimationFrame,
    previewStatus,
  };
}
