import "./App.css";
import { getCropperWidth } from "./constants";
import CroppingOperations from "./features/croppingOperations";
import CanvasPreview from "./features/canvasPreview";
import VideoPlayer from "./features/videoPlayer";
import {
  useCroppedPreview,
  useCropper,
  useCropperPosition,
  useVideoPlayer,
} from "./hooks";

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
  const canvasProps = {
    canvasRef,
    previewStatus,
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
          <CanvasPreview {...canvasProps} />
        </div>
      </main>
      <footer>
        <CroppingOperations cropper={cropper} />
      </footer>
    </>
  );
}
