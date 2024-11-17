import {
  useCroppedPreview,
  useCropper,
  useCropperPosition,
  useVideoPlayer,
} from "../../hooks";
import { getCropperWidth } from "../../utils";
import CanvasPreview from "../canvasPreview";
import CroppingOperations from "../croppingOperations";
import VideoPlayer from "../videoPlayer";
export default function GenerateSession() {
  const videoPlayer = useVideoPlayer();
  const cropperWidth = getCropperWidth(videoPlayer.state.aspectRatio);
  const cropperPosition = useCropperPosition({ cropperWidth });

  const { onAddChunkToCropperGenerator, ...cropper } = useCropper({
    videoPlayerState: videoPlayer.state,
    coordinates: [cropperPosition.cropX, cropperWidth],
  });
  const { canvasRef, previewStatus, ...videoPlayerControls } =
    useCroppedPreview({
      cropperWidth,
      cropX: cropperPosition.cropX,
      cropperStatus: cropper.status,
      videoPlayer,
    });
  const playerProps = {
    cropperStatus: cropper.status,
    videoPlayer,
    onAddChunkToCropperGenerator,
    cropperPosition,
    discardChunks: cropper.discardChunks,
    ...videoPlayerControls,
  };
  const canvasProps = {
    canvasRef,
    previewStatus,
  };
  return (
    <>
      <main>
        <div className="video__playerWrapper">
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
