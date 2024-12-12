// import { useState } from "react";

export default function ExplicitTotalHours({
  showStatuses,
  elapsedTimes,
  formatTimes,
}) {
  return (
    <div>
      <div className="bg-white w-full mt-2 overflow-hidden rounded-md">
        <div className="grid grid-cols-3 md:px-32 items-center p-1 bg-dark-green-forest justify-items-center">
          <div>Shift Date</div>
          <div>AUX</div>
          <div className="flex flex-col text-center">Overall Duration</div>
        </div>
        <div className="overflow-y-auto h-52 md:px-32">
          {showStatuses.length > 0 ? (
            showStatuses.map((title, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 md:justify-between justify-items-center md:gap-5"
              >
                <div>{new Date().toLocaleDateString()}</div>
                <div>{title}</div>
                <div className="bg-green-500 p-2">
                  {elapsedTimes[title]
                    ? formatTimes(elapsedTimes[title])
                    : "00:00:00"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-14">No Activity Yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
