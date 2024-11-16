import "./App.css";
import { getCropperWidth } from "./constants";
import CroppingOperations from "./features/croppingOperations";
import Preview from "./features/preview";
import VideoPlayer from "./features/videoPlayer";
import useCroppedPreview from "./hooks/useCroppedPreview";
import useCropper from "./hooks/useCropper";
import useCropperPosition from "./hooks/useCropperPosition";
import useVideoPlayer from "./hooks/useVideoPlayer";

export default function App() {
  const videoPlayer = useVideoPlayer();
  const cropperWidth = getCropperWidth(videoPlayer.state.aspectRatio);
  const cropperPosition = useCropperPosition({ cropperWidth });
  const { onAddChunkToCropperGenerator } = useCropper();
  const { canvasRef, ...videoPlayerControls } = useCroppedPreview({
    cropperWidth,
    cropX: cropperPosition.cropX,
  });
  
  return (
    <>
      <header>
        <div className="header">
          <h1>Cropper</h1>
        </div>
      </header>
      <main>
        <div>
          <VideoPlayer
            videoPlayer={videoPlayer}
            onAddChunkToCropperGenerator={onAddChunkToCropperGenerator}
            cropperPosition={cropperPosition}
            {...videoPlayerControls}
          />
        </div>
        <Preview canvasRef={canvasRef} />
      </main>
      <footer>
        <CroppingOperations />
      </footer>
    </>
  );
}
