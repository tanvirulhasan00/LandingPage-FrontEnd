// import { useState, useEffect } from "react";

// const STORAGE_KEY = "timerCard_endTime";

// function TimerCard() {
//   const defaultDuration = 3600 * 4; // 2 hours in seconds
//   const [timeLeft, setTimeLeft] = useState<number>(0);

//   useEffect(() => {
//     let storedEndTime = localStorage.getItem(STORAGE_KEY);
//     let endTime: number;

//     if (storedEndTime) {
//       endTime = parseInt(storedEndTime, 10);
//     } else {
//       endTime = Math.floor(Date.now() / 1000) + defaultDuration;
//       localStorage.setItem(STORAGE_KEY, endTime.toString());
//     }

//     const updateTimeLeft = () => {
//       const now = Math.floor(Date.now() / 1000);
//       const remaining = Math.max(endTime - now, 0);
//       setTimeLeft(remaining);
//     };

//     updateTimeLeft(); // Set initial time left

//     const interval = setInterval(() => {
//       updateTimeLeft();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTimeParts = (sec: number) => {
//     const days = Math.floor(sec / 86400);
//     const hours = Math.floor((sec % 86400) / 3600);
//     const minutes = Math.floor((sec % 3600) / 60);
//     const seconds = sec % 60;
//     return { days, hours, minutes, seconds };
//   };

//   const { days, hours, minutes, seconds } = formatTimeParts(timeLeft);

//   const timeParts = [
//     { label: "Days", value: days },
//     { label: "Hours", value: hours },
//     { label: "Minutes", value: minutes },
//     { label: "Seconds", value: seconds },
//   ];

//   return (
//     <div className="mt-4 bg-yellow-300 w-full rounded-xl shadow-lg p-6 space-y-4">
//       <h1 className="text-2xl font-bold text-blue-900">Discount Time Left</h1>
//       <p className="text-red-600 font-medium">Order before time runs out!</p>

//       <div className="flex justify-center items-end space-x-2 text-blue-900">
//         {timeParts.map((item, index) => (
//           <div key={item.label} className="flex items-start space-x-2">
//             <div className="text-center">
//               <div className="text-4xl font-mono leading-none">
//                 {String(item.value).padStart(2, "0")}
//               </div>
//               <div className="text-sm font-semibold">{item.label}</div>
//             </div>
//             {index < timeParts.length - 1 && (
//               <div className="text-4xl font-mono leading-none text-blue-800 flex items-end">
//                 :
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TimerCard;

import { useState, useEffect } from "react";

function TimerCard() {
  // Set your universal fixed end time (e.g., May 7, 2025, at 5:00 PM UTC)
  const fixedEndTime = Math.floor(
    new Date("2025-05-07T01:00:00Z").getTime() / 1000
  );
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(fixedEndTime - now, 0);
      setTimeLeft(remaining);
    };

    updateTimeLeft(); // Set initial time

    const interval = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeParts = (sec: number) => {
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTimeParts(timeLeft);

  const timeParts = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="mt-4 bg-yellow-300 w-full rounded-xl shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-900">Discount Time Left</h1>
      <p className="text-red-600 font-medium">Order before time runs out!</p>

      <div className="flex justify-center items-end space-x-2 text-blue-900">
        {timeParts.map((item, index) => (
          <div key={item.label} className="flex items-start space-x-2">
            <div className="text-center">
              <div className="text-4xl font-mono leading-none">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-sm font-semibold">{item.label}</div>
            </div>
            {index < timeParts.length - 1 && (
              <div className="text-4xl font-mono leading-none text-blue-800 flex items-end">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimerCard;
