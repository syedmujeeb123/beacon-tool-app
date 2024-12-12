import React, { useEffect } from "react";
export default function FifthDisplayCurrentStatus({
  displayStatus,
  setActiveStatus,
  time,
  setTime,
  title,
  isRunning,
  setIsRunning,
  formatTimes,
  savedTime,
  setSavedTime,
  startTimer,
  stopTimer,
}) {
  const totalBreakTime = 3600;

  const remainingBreakTime = Math.max(totalBreakTime - time, 0);
  const percentageTaken = Math.min((time / totalBreakTime) * 100, 100);

  //This is for Break Status:
  // Restore timer state from localStorage on load
  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");

    if (storedStartTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(storedStartTime)) / 1000
      );
      if (elapsedTime < 86400) {
        setTime(elapsedTime);
        setIsRunning(true);
      } else {
        localStorage.removeItem("startTime");
        setTime(0);
      }
    }
  }, [setIsRunning, setTime]);

  const getBackgroundColor = () => {
    if (percentageTaken >= 100) {
      return "bg-dark-blue";
    } else if (percentageTaken >= 50) {
      return "bg-light-red";
    }
    return "bg-green-500";
  };
  const formatRemainingTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    if (hours > 0) {
      return `${hours} hrs ${minutes} mins`;
    }
    return `${minutes} mins ${seconds} secs`;
  };

  useEffect(() => {
    if (time > 0) {
      localStorage.setItem("time", time.toString());
      setSavedTime(time);
    }
  }, [setSavedTime, time]);

  useEffect(() => {
    if (displayStatus) {
      localStorage.setItem("displayStatus", displayStatus);
    }
  }, [displayStatus]);

  useEffect(() => {
    // Check title and manage timer start/stop
    if (title === "Lunch" || title === "Short Break") {
      startTimer();
    } else {
      stopTimer();
    }
  }, [startTimer, stopTimer, title]); // Re-run when title changes

  return (
    <div className="flex md:ml-14 mb-2">
      <div>
        <div className="bg-[rgb(10,10,30)] md:w-[200px] px-12 w-[150px] h-[10em] mt-8 ml-6 rounded-md flex justify-center items-start">
          {displayStatus && (
            <button className="mt-4 bg-lime-500 md:px-6 px-1 py-1 rounded-md whitespace-nowrap">
              {displayStatus || "No Status"}
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="bg-[rgb(10,10,30)] md:w-[200px] w-[150px] h-[10em] mt-8 ml-3 rounded-md flex justify-center items-start text-center">
          <div className="flex flex-col text-start">
            <div className="mt-4 bg-white md:px-24 px-2 rounded-full py-4 flex flex-col relative">
              <div
                className={`absolute top-0 left-0 px-2 py-4 h-full rounded-full ${getBackgroundColor()}`}
                style={{ width: `${percentageTaken}%` }}
              ></div>
            </div>
            <p className="ml-2 text-white font-semibold">
              <span className="mr-1">*</span>Total Break Taken:
              {formatTimes(savedTime)} hrs out of 1:00:00 hr.
            </p>
            <p className="text-lightYellow ml-2 mb-12 text-sm">
              <span className="mr-1">*</span>Break Status:{" "}
              {formatRemainingTime(remainingBreakTime)} Break Pending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
