import "./App.css";
import { getCropperWidth } from "./constants";
import CroppingOperations from "./features/croppingOperations";
import Preview from "./features/preview";
import ErrorPreview from "./features/preview/ErrorPreview";
import VideoPlayer from "./features/videoPlayer";
import useCroppedPreview from "./hooks/useCroppedPreview";
import useCropper from "./hooks/useCropper";
import useCropperPosition from "./hooks/useCropperPosition";
import useVideoPlayer from "./hooks/useVideoPlayer";
import { PreviewErrorStatus } from "./types";

export default function App() {
  const videoPlayer = useVideoPlayer();
  const cropperWidth = getCropperWidth(videoPlayer.state.aspectRatio);
  const cropperPosition = useCropperPosition({ cropperWidth });

  const { onAddChunkToCropperGenerator, ...cropper } = useCropper({
    playbackRate: videoPlayer.state.playbackRate,
  });
  const { canvasRef, previewStatus, ...videoPlayerControls } =
    useCroppedPreview({
      cropperWidth,
      cropX: cropperPosition.cropX,
      cropperStatus: cropper.status,
    });
  const playerProps = {
    cropperStatus: cropper.status,
    videoPlayer,
    onAddChunkToCropperGenerator,
    cropperPosition,
    ...videoPlayerControls,
  };
  return (
    <>
      <header>
        <div className="header">
          <h1>Cropper</h1>
        </div>
      </header>
      <main>
        <div>
          <VideoPlayer {...playerProps} />
        </div>
        <div>
          <Preview canvasRef={canvasRef} previewStatus={previewStatus} />
          {previewStatus === PreviewErrorStatus.PREVIEWING ? null : (
            <ErrorPreview statusError={previewStatus} />
          )}
        </div>
      </main>
      <footer>
        <CroppingOperations cropper={cropper} />
      </footer>
    </>
  );
}
