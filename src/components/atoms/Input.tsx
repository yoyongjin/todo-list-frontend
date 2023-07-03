import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  ref: React.RefObject<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { width, ...rest } = props;

  return (
    <input
      style={{ width: width || "100%" }}
      {...rest}
      ref={ref}
    />
  );
});

export default Input;
