import { useState } from "react";
import { dimensionVideoPlayer } from "../constants";

type CropperPositionProps = {
  cropperWidth: number;

};

export default function useCropperPosition({
  cropperWidth,
}: CropperPositionProps) {
  const [cropX, setCropX] = useState(0);

  const handleCropDrag = (newCropX: number) => {
    const maxCropX = dimensionVideoPlayer.width - cropperWidth;
    setCropX(Math.max(0, Math.min(newCropX, maxCropX)));
  };
  return {
    handleCropDrag,
    cropX,
  };
}
