import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";
type ButtonProps = {
  variant?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`btn ${variant}`} {...props}>
      {children}
    </button>
  );
}
