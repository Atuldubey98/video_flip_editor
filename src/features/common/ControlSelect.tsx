import { ChangeEventHandler } from "react";
import "./ControlSelect.css";
export default function ControlSelect({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: number | string;
  options: { value: string | number; label: string }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="control__select">
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
