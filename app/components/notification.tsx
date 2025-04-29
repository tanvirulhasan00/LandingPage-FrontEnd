import React from "react";
import Button from "./button";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface NotificationProps {
  open?: boolean;
  statusCode?: string;
  error?: string;
  handleClick?: () => void;
}

const Notification = ({
  open,
  statusCode,
  error,
  handleClick,
}: NotificationProps) => {
  return (
    <div className="flex justify-end">
      <div
        hidden={open}
        className="bg-red-600 rounded p-2 mt-2 flex justify-between items-center w-[30rem] "
      >
        <div className="">
          <h1>Status: {statusCode}</h1>
          <p>Message: {error}</p>
        </div>
        <div className="">
          <Button
            bg="bg-none"
            className="hover:bg-red-700"
            onClick={handleClick}
          >
            <XMarkIcon className="size-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
