import Button from "../common/Button";

export default function SessionFooterButtons(props: {
  onToggleVideoPlayerStatus: VoidFunction;
  buttonVideoPlayerStatus:
    | {
        label: string;
        iconSrc: string;
      }
    | undefined;
  onStartOver: VoidFunction;
  onCancelSession: VoidFunction;
}) {
  return (
    <div className="video__chunksOperation">
      <div className="video__operations">
        <Button onClick={props.onToggleVideoPlayerStatus}>
          <img src={props.buttonVideoPlayerStatus?.iconSrc} width={15} />
          <span>{props.buttonVideoPlayerStatus?.label}</span>
        </Button>
        <Button onClick={props.onStartOver}>
          <img src={"/restart.svg"} width={15} />
          <span>Start Over</span>
        </Button>
      </div>
      <Button onClick={props.onCancelSession} variant="info">
        Cancel
      </Button>
    </div>
  );
}
