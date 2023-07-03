import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input = (props: InputProps) => {
  const { width, ...rest } = props;
  return (
    <input
      style={{ width: width || "100%" }}
      {...rest}
    />
  );
};

export default Input;
