import useCropperChunks from "../../hooks/useCropperChunks";
import useSessionPlayer from "../../hooks/useSessionPlayer";
import JsonFetcher from "./JsonFetcher";
import "./PreviewSession.css";
import SessionFooterButtons from "./SessionFooterButtons";
import SessionPlayer from "./SessionPlayer";

export default function PreviewSession() {
  const { onSetChunks, cropperChunks, discardChunks } = useCropperChunks({});
  const TOTAL_CHUNKS_TO_SHOW = 100;
  const left = cropperChunks.length - TOTAL_CHUNKS_TO_SHOW;
  const chunksStr = `${JSON.stringify(
    cropperChunks.slice(0, TOTAL_CHUNKS_TO_SHOW),
    null,
    2
  )}${left > 0 ? `...${left} more chunks` : ""}`;
  const {
    buttonVideoPlayerStatus,
    onStartOver,
    onToggleVideoPlayerStatus,
    video,
    ...sessionPlayerProps
  } = useSessionPlayer({ cropperChunks });

  return (
    <>
      <main>
        <JsonFetcher
          onSetChunks={onSetChunks}
          length={cropperChunks.length}
          chunksStr={chunksStr}
        />
        <SessionPlayer {...sessionPlayerProps} />
      </main>
      <footer>
        {cropperChunks.length ? (
          <SessionFooterButtons
            onToggleVideoPlayerStatus={onToggleVideoPlayerStatus}
            onStartOver={onStartOver}
            onCancelSession={() => {
              discardChunks();
              if (!video) return;
              video.fastSeek(0);
            }}
            buttonVideoPlayerStatus={buttonVideoPlayerStatus}
          />
        ) : null}
      </footer>
    </>
  );
}
