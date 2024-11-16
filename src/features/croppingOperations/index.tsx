import { CropperChunk, CropperStatus } from "../../types";
import Button from "../common/Button";
import "./CroppingOperations.css";
export default function CroppingOperations({
  cropper,
}: {
  cropper: {
    status: CropperStatus;
    onSetStatus: (status: CropperStatus) => void;
    discardChunks: () => void;
    cropperChunks: CropperChunk[];
  };
}) {
  return (
    <div className="cropper__btnGroup">
      <Button
        disabled={cropper.status === CropperStatus.CROPPING}
        onClick={() => {
          cropper.onSetStatus(CropperStatus.CROPPING);
        }}
      >
        Start Cropper
      </Button>
      <Button
        disabled={cropper.status !== CropperStatus.CROPPING}
        onClick={() => {
          cropper.onSetStatus(CropperStatus.REMOVED);
        }}
      >
        Remove Cropper
      </Button>
      <Button
        disabled={cropper.status === CropperStatus.IDLE}
        onClick={() => {
          cropper.onSetStatus(CropperStatus.IDLE);
          const blob = new Blob([JSON.stringify(cropper.cropperChunks)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${new Date().toUTCString()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Generate Cropper
      </Button>
    </div>
  );
}
