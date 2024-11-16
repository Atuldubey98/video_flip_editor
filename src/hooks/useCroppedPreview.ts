import { useRef, useState } from "react";
import { CropperStatus, PreviewErrorStatus } from "../types";
import { getCanvasDrawParams } from "../utils";
import useVideoPlayerPropertiesChange from "./useVideoPlayerPropertiesChange";
import { Action } from "./useVideoPlayer";

interface CroppedPreviewProps {
  cropperWidth: number;
  cropX: number;
  cropperStatus: CropperStatus;
  videoPlayerDispatch: React.Dispatch<Action>;
}

export default function useCroppedPreview({
  cropperWidth,
  cropX,
  cropperStatus,
  videoPlayerDispatch,
}: CroppedPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  useVideoPlayerPropertiesChange({ video, videoPlayerDispatch });
  const [previewStatus, setPreviewStatus] = useState(
    PreviewErrorStatus.CROPPER_REMOVED
  );
  const onReadyVideoPlayer = (video: HTMLVideoElement) => {
    setVideo(video);
  };
  const animationFrame = useRef<number | null>(null);

  const onPlayVideoPlayerPaint = () => {
    if (!canvasRef.current) {
      setPreviewStatus(PreviewErrorStatus.CANVAS_ERROR);
      return;
    }
    if (!video) {
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
    const canvas = canvasRef.current;
    const { sx, sy, sWidth, sHeight, dWidth, dHeight } = getCanvasDrawParams(
      video,
      canvas,
      cropX,
      cropperWidth
    );
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

  const onEndAnimationFrame = () =>
    animationFrame.current && cancelAnimationFrame(animationFrame.current);

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
