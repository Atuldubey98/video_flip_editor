import { PreviewErrorStatus } from "./types";

export const playBackRateOptions = [
  { value: 0.5, label: "Playback Speed 0.5x" },
  { value: 1, label: "Playback Speed 1x" },
  { value: 1.5, label: "Playback Speed 1.5x" },
  { value: 2, label: "Playback Speed 2x" },
];
export const aspectRatioOptions = [
  { value: "9:16", label: "Aspect Ratio 9:16" },
  { value: "9:18", label: "Aspect Ratio 9:18" },
  { value: "4:3", label: "Aspect Ratio 4:3" },
  { value: "3:4", label: "Aspect Ratio 3:4" },
  { value: "1:1", label: "Aspect Ratio 1:1" },
  { value: "4:5", label: "Aspect Ratio 4:5" },
];
export const dimensionVideoPlayer = {
  width: 650,
  height: 365,
};

export const croperErrortStatusMessages: Map<PreviewErrorStatus, string> =
  new Map([
    [PreviewErrorStatus.CANVAS_ERROR, "Some error occured in canvas"],
    [
      PreviewErrorStatus.CROPPER_REMOVED,
      "Please click on “Start Cropper” \n and then play video",
    ],
    [PreviewErrorStatus.VIDEO_ERROR, "Some error in video"],
    [PreviewErrorStatus.PREVIEWING, ""],
  ]);

