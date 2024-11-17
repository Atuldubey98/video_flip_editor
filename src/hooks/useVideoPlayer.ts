import { useReducer } from "react";
import { VideoPlayerStatus } from "../types";

export type State = {
  playbackRate: number;
  aspectRatio: string;
  volume: number;
  status: VideoPlayerStatus;
};
export enum ActionType {
  CHANGE_PLAYBACK_RATE = "change_playback_rate",
  CHANGE_CROPPER_ASPECT_RATIO = "change_cropper_aspect_ratio",
  CHANGE_VOLUME = "change_volume",
  CHANGE_STATUS = "change_status",
}
export type Action =
  | { type: ActionType.CHANGE_PLAYBACK_RATE; value: number }
  | { type: ActionType.CHANGE_CROPPER_ASPECT_RATIO; value: string }
  | { type: ActionType.CHANGE_VOLUME; value: number }
  | { type: ActionType.CHANGE_STATUS; value: VideoPlayerStatus };
export default function useVideoPlayer() {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ActionType.CHANGE_PLAYBACK_RATE:
        return {
          ...state,
          playbackRate: action.value,
        };
      case ActionType.CHANGE_CROPPER_ASPECT_RATIO:
        return {
          ...state,
          aspectRatio: action.value,
        };
      case ActionType.CHANGE_VOLUME:
        return {
          ...state,
          volume: action.value,
        };
      case ActionType.CHANGE_STATUS:
        return {
          ...state,
          status: action.value,
        };
      default:
        return state;
    }
  };
  const initialState = {
    playbackRate: 1,
    aspectRatio: "9:16",
    volume: 1,
    status: VideoPlayerStatus.PAUSED,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
