import { CropperChunk, CropperStatus } from "../../types";
import Button from "../common/Button";
import "./CroppingOperations.css";
type Cropper = {
  status: CropperStatus;
  onSetStatus: (status: CropperStatus) => void;
  discardChunks: () => void;
  cropperChunks: CropperChunk[];
};

type CropperOperationsProps = {
  cropper: Cropper;
};

export default function CroppingOperations({
  cropper,
}: CropperOperationsProps) {
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
        disabled={
          cropper.status === CropperStatus.IDLE || !cropper.cropperChunks.length
        }
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
          cropper.discardChunks();
        }}
      >
        Generate Cropper
      </Button>
    </div>
  );
}
