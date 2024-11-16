import { croperErrortStatusMessages } from "../../constants";
import { PreviewErrorStatus } from "../../types";
import './ErrorPreview.css';
export default function ErrorPreview({
  statusError,
}: {
  statusError: PreviewErrorStatus;
}) {
  const message = croperErrortStatusMessages.get(statusError);
  return (
    <div className="error__preview">
      <img src="/play.svg" />
      <p>Preview not available</p>
      <p>{message}</p>
    </div>
  );
}
