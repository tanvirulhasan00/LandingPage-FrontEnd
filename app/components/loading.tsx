import React from "react";
// import { Skeleton } from "./ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border-none p-4">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-full rounded ">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
