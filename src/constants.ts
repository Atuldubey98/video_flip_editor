import { PreviewErrorStatus, VideoPlayerStatus } from "./types";

export const playBackRateOptions = [
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
];
export const aspectRatioOptions = [
  { value: "9:16", label: "9:16" },
  { value: "9:18", label: "9:18" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
  { value: "1:1", label: "1:1" },
  { value: "4:5", label: "4:5" },
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

export const buttonVideoPlayerStateLabels: Map<
  VideoPlayerStatus,
  { label: string; iconSrc: string }
> = new Map([
  [VideoPlayerStatus.PAUSED, { label: "Play", iconSrc: "/playIcon.svg" }],
  [VideoPlayerStatus.PLAYING, { label: "Pause", iconSrc: "/pause.svg" }],
]);
