import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  id: string;
  name: string;
}

const RadioButton = ({
  id,
  name,
  label,
  className,
  ...rest
}: RadioButtonProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <input
        {...rest}
        id={id}
        name={name}
        type="radio"
        className={`${className} cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-[#1167b1] checked:bg-[#1167b1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden`}
      />
      <label
        htmlFor={id}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
