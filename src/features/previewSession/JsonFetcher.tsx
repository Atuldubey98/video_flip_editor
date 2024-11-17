import { CropperChunk } from "../../types";
import JsonDisplay from "./JsonDisplay";
import JsonUploader from "./JsonUploader";

export default function JsonFetcher(props: {
  onSetChunks: (chunks: CropperChunk[]) => void;
  length: number;
  chunksStr: string;
}) {
  return (
    <div className="json__fetcher">
      {props.length ? null : <JsonUploader onSetChunks={props.onSetChunks} />}
      {props.length ? (
        <div className="json">
          <JsonDisplay str={props.chunksStr} />
        </div>
      ) : null}
    </div>
  );
}
