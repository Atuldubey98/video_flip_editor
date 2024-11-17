import "./JsonDisplay.css";
export default function JsonDisplay(props: { str: string }) {
  return (
    <div className="json__display">
      <pre>{props.str}</pre>
    </div>
  );
}
