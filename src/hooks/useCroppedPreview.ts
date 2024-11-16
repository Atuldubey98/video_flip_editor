import { useRef } from "react";
import { dimensionVideoPlayer } from "../constants";

interface CroppedPreviewProps {
  cropperWidth: number;
  cropX: number;
}

export default function useCroppedPreview({
  cropperWidth,
  cropX,
}: CroppedPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const onReadyVideoPlayer = (video: HTMLVideoElement) => {
    videoElementRef.current = video;
  };

  const animationFrame = useRef<number | null>(null);

  const onPlayVideoPlayerPaint = () => {
    if (!canvasRef.current || !videoElementRef.current) return;
    onEndAnimationFrame();
    if (!context.current) context.current = canvasRef.current.getContext("2d");
    clearCanvas();

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
  };
}
