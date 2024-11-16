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
