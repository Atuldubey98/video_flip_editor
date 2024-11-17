import { ChangeEventHandler } from "react";
import "./ControlSelect.css";
type ControlSelectProps = {
  name: string;
  value: number | string;
  options: {
    value: string | number;
    label: string;
  }[];
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

export default function ControlSelect({
  name,
  value,
  label,
  options,
  onChange,
}: ControlSelectProps) {
  return (
    <div className="control__select">
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
