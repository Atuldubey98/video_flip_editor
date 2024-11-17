import React from "react";
import Preview from "./Preview";
import { PreviewErrorStatus } from "../../types";
import ErrorPreview from "./ErrorPreview";
import "./CanvasPreview.css";

type CanvasPreviewProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  previewStatus: PreviewErrorStatus;
};
export default function CanvasPreview(props: CanvasPreviewProps) {
  return (
    <div className="canvas__preview">
      <h3 className="preview__heading">Preview</h3>
      <div>
        <Preview
          canvasRef={props.canvasRef}
          previewStatus={props.previewStatus}
        />
        {props.previewStatus === PreviewErrorStatus.PREVIEWING ? null : (
          <ErrorPreview statusError={props.previewStatus} />
        )}
      </div>
    </div>
  );
}
