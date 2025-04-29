import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  bg?: string;
}

const Button = ({
  className,
  bg = "bg-indigo-600",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`${className} cursor-pointer rounded-md ${bg} px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
