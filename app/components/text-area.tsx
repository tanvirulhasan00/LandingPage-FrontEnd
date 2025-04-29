import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  className?: string;
}

const TextArea = ({ name, className, ...rest }: TextAreaProps) => {
  return (
    <textarea
      id={name}
      name={name}
      rows={3}
      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
      {...rest}
    />
  );
};

export default TextArea;
