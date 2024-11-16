import { useState } from "react";
import { dimensionVideoPlayer } from "../constants";

export default function useCropperPosition({
  cropperWidth,
}: {
  cropperWidth: number;
}) {
  const [cropX, setCropX] = useState(0);

  const handleCropDrag = (newCropX: number) => {
    const maxCropX = dimensionVideoPlayer.width - cropperWidth;
    setCropX(Math.max(0, Math.min(newCropX, maxCropX)));
  };
  const sx = dimensionVideoPlayer.width - (cropX + cropperWidth);  
  return {
    handleCropDrag,
    cropX,
    sx,
  };
}
