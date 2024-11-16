import React from "react";
import { getCropperWidth } from "../../constants";

interface CropperProps {
  cropX: number;
  onDrag: (newCropX: number) => void;
  aspectRatio: string;
}

export default function Cropper({ cropX, onDrag, aspectRatio }: CropperProps) {
  const cropperWidth = getCropperWidth(aspectRatio);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      onDrag(cropX + deltaX);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: cropX,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: cropperWidth,
        height: "100%",
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            style={{
              border: "0.5px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
    </div>
  );
}
