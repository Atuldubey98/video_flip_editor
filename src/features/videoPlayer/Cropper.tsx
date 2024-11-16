import React from "react";
import { getCropperWidth } from "../../utils";

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
        border: "1px solid #ccc",
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
              borderBottomStyle: [0, 1, 2, 3, 4, 5].includes(index)
                ? "dotted"
                : undefined,
              borderRightStyle: [0, 1, 3, 4, 6, 7].includes(index)
                ? "dotted"
                : undefined,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          />
        ))}
    </div>
  );
}
