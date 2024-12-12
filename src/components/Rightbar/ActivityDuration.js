// import { useState, useEffect } from "react";
// import { useButtons } from "./ButtonsContext";

export default function ActivityDuration({
  displayStatus,
  time,
  timers,
  formatTimes,
  showStatuses,
  elapsedTimes,
  activeStatus,
}) {
  // const buttons = useButtons();

  const totalBreakTime = 3600;

  const getBackgroundColor = (percentage) => {
    if (percentage >= 100) {
      return "bg-red-500";
    } else if (percentage >= 50) {
      return "bg-blue-500";
    }
    return "bg-blue-500";
  };

  return (
    <div className="bg-white h-52 w-full mt-4 overflow-hidden rounded-md">
      <div className="text-center mt-2">
        Actively Duration in Hours (hh:mm:ss)
      </div>
      <div className="space-y-2 mt-6 overflow-y-auto h-36">
        {showStatuses.length > 0 ? (
          showStatuses.map((title, index) => {
            const elapsedTime = elapsedTimes[title] || 0;
            const percentageTaken = Math.min(
              (elapsedTime / totalBreakTime) * 100,
              100
            );

            return (
              <div className="flex" key={index}>
                <div
                  className={`ml-10 truncate whitespace-nowrap ${
                    title === "Login" || title === activeStatus
                      ? "text-yellow-500 font-medium"
                      : ""
                  }`}
                >
                  {title} {formatTimes(elapsedTimes[title] || 0)}
                </div>

                <div
                  className={`ml-3 truncate whitespace-nowrap rounded-r-sm
               ${getBackgroundColor(percentageTaken)}`}
                  style={{ width: `${percentageTaken}%` }}
                ></div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="text-center">No Activity Yet</div>

            <div className="text-center mt-6 font-bold">
              You have been logged out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
