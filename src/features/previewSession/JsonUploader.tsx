import { FileUploader } from "react-drag-drop-files";
import "./JsonUploader.css";
export default function JsonUploader<T>({
  onSetChunks,
}: {
  onSetChunks: (chunks: T[]) => void;
}) {
  const onLoadJson = async (file: Blob) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error();
    const chunks = (await response.json()) as T[];
    onSetChunks(chunks);
  };
  return (
    <div className="json__uploader">
      <FileUploader types={["JSON"]} handleChange={onLoadJson}>
        <div className="uploader">
          <img src="/json-file.svg" width={50} />
          <h3>Click or drag a json file here to upload</h3>
        </div>
      </FileUploader>
    </div>
  );
}
