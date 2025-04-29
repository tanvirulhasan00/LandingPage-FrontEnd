import React from "react";

interface DividerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={`w-full h-[1px] bg-gray-300 dark:bg-gray-500 ${className}`}
    ></div>
  );
};

export default Divider;
