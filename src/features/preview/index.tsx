import React, { forwardRef } from "react";
import "./Preview.css";
import { dimensionVideoPlayer } from "../../constants";
import { PreviewErrorStatus } from "../../types";

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  previewStatus: PreviewErrorStatus;
}

const Preview = forwardRef<HTMLCanvasElement, PreviewProps>(
  ({ canvasRef, previewStatus }: PreviewProps, ref) => {
    const canvasDimentions =
      previewStatus === PreviewErrorStatus.PREVIEWING
        ? dimensionVideoPlayer
        : { width: 0, height: 0 };
    return (
      <div className="preview">
        <h3>Preview</h3>
        <canvas ref={canvasRef || ref} {...canvasDimentions} />
      </div>
    );
  }
);

export default Preview;
