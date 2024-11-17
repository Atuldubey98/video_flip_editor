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
      {props.length ? (
        <div className="json__maker">
          <div className="json">
            <JsonDisplay str={props.chunksStr} />
          </div>
        </div>
      ) : (
        <JsonUploader onSetChunks={props.onSetChunks} />
      )}
    </div>
  );
}
