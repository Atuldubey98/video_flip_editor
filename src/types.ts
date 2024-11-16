export enum CropperStatus {
  IDLE = "idle",
  CROPPING = "cropping",
  REMOVED = "removed",
}

export type CropperChunk = {
  timeStamp: number;
  volume: number;
  playbackRate: number;
};

export enum PreviewErrorStatus {
  CANVAS_ERROR = "canvas_error",
  VIDEO_ERROR = "video_error",
  CROPPER_REMOVED = "cropper_removed",
  PREVIEWING = "previewing",
}
