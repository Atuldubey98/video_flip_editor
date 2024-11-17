import { ChangeEventHandler } from "react";
import "./JsonUploader.css";
export default function JsonUploader<T>({
  onSetChunks,
}: {
  onSetChunks: (chunks: T[]) => void;
}) {
  const onLoadJson: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.currentTarget.files;
    if (!files?.length) return;
    const fileUrl = URL.createObjectURL(files[0]);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error();
    const chunks = (await response.json()) as T[];
    onSetChunks(chunks);
  };
  return (
    <div className="json__uploader">
      <input type="file" accept="application/json" onChange={onLoadJson} />
    </div>
  );
}
