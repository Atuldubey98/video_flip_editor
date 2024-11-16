import Button from "../common/Button";
import "./CroppingOperations.css";
export default function CroppingOperations({

}) {
  return (
    <div className="cropper__btnGroup">
      <Button>Start Cropper</Button>
      <Button>Remove Cropper</Button>
      <Button>Generate Cropper</Button>
    </div>
  );
}
