import React, { forwardRef } from "react";
import "./Preview.css";
import { dimensionVideoPlayer } from "../../constants";

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Preview = forwardRef<HTMLCanvasElement, PreviewProps>(
  ({ canvasRef }: PreviewProps, ref) => {
    return (
      <div className="preview">
        <h3>Preview</h3>
        <canvas ref={canvasRef || ref} {...dimensionVideoPlayer} />
      </div>
    );
  }
);

export default Preview;
