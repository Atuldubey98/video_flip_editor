import { useReducer } from "react";

export type State = {
  playbackRate: number;
  aspectRatio: string;
};
export enum ActionType {
  CHANGE_PLAYBACK_RATE = "change_playback_rate",
  CHANGE_CROPPER_ASPECT_RATIO = "change_cropper_aspect_ratio",
}
export type Action =
  | { type: ActionType.CHANGE_PLAYBACK_RATE; value: number }
  | { type: ActionType.CHANGE_CROPPER_ASPECT_RATIO; value: string };
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
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    playbackRate: 1,
    aspectRatio: "9:16",
  });
  return { state, dispatch };
}
