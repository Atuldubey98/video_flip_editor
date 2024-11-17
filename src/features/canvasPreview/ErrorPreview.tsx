import { croperErrortStatusMessages } from "../../constants";
import { PreviewErrorStatus } from "../../types";
import "./ErrorPreview.css";
export default function ErrorPreview({
  statusError,
}: {
  statusError: PreviewErrorStatus;
}) {
  const messageSplits = (
    croperErrortStatusMessages.get(statusError) || ""
  )?.split("\n");
  return (
    <div className="error__preview">
      <img src="/play.svg" />
      <p>Preview not available</p>
      {messageSplits.map((message: string, index) => (
        <p key={index} className="error__previewMessage">
          {message}
        </p>
      ))}
    </div>
  );
}
