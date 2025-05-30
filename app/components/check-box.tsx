import React from "react";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  checkDescrptions: string;
}

const CheckBox = ({
  checkDescrptions,
  className,
  label,
  ...rest
}: CheckBoxProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            id={label.toLowerCase()}
            name={label.toLowerCase()}
            type="checkbox"
            aria-describedby={`${label.toLowerCase()}-description`}
            className={`${className} cursor-pointer col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto`}
            {...rest}
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-checked:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-indeterminate:opacity-100"
            />
          </svg>
        </div>
      </div>
      <div className="text-sm/6">
        <label
          htmlFor={label.toLowerCase()}
          className="font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <p
          id={`${label.toLowerCase()}-description`}
          className="text-gray-500 dark:text-gray-400 "
        >
          {checkDescrptions}
        </p>
      </div>
    </div>
  );
};

export default CheckBox;
