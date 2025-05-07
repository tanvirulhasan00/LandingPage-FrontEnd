import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  inputClassName?: string;
}

const Input = ({
  name,
  type = "text",
  placeholder,
  wrapperClassName = "",
  inputClassName = "",
  ...rest
}: InputProps) => {
  return (
    <div
      className={`flex items-center rounded-md bg-white outline-1 -outline-offset-1  outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#1167b1] ${wrapperClassName}`}
    >
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${inputClassName}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
