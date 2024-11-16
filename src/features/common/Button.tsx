import { ReactNode } from "react";
import "./Button.css";
type ButtonProps = {
  variant?: string;
  children: ReactNode;
};

export default function Button({ variant = "primary", children }: ButtonProps) {
  return <button className={`btn ${variant}`}>{children}</button>;
}
