// import React from "react";
// // import { Skeleton } from "./ui/skeleton";

// const Loading = () => {
//   return (
//     <div className="mx-auto w-full max-w-sm rounded-md border-none p-4">
//       <div className="flex animate-pulse space-x-4">
//         <div className="flex-1 space-y-6 py-1">
//           <div className="h-full rounded ">Loading...</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loading;

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
