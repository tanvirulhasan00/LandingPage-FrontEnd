import React from "react";

interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  className?: string;
}

const Label = ({ htmlFor, className, children }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`pb-1 block text-sm/6 font-medium text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
