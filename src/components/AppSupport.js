import React, { useState, useEffect } from "react";

import { ButtonsProvider } from "./Leftbar/ButtonsContext";
import Leftbar from "./Leftbar/Leftbar";
import Rightbar from "./Rightbar/Rightbar";
import Marquee from "./Downbar/Marquee";

export default function AppSupport() {
  const [displayStatus, setDisplayStatus] = useState("");
  const [time, setTime] = useState(0);
  const [timers, setTimers] = useState({});
  const [elapsedTimes, setElapsedTimes] = useState({});
  const [logoutTriggered, setLogoutTriggered] = useState(false); // Step 1: Add state

  const [isRunning, setIsRunning] = useState(false);
  const [showStatuses, setShowStatuses] = useState([]);
  const [savedTime, setSavedTime] = useState(() => {
    const storedTime = localStorage.getItem("time");
    return storedTime ? parseInt(storedTime, 10) : 0;
  });

  const [activeStatus, setActiveStatus] = useState(() => {
    return localStorage.getItem("activeStatus");
  });

  //Format time to hh:mm:ss
  const formatTimes = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Start the timer for a specific button
  const startTimerForButton = (title) => {
    if (title === "Login") {
      if (!timers["Login"]) {
        const loginTimer = setInterval(() => {
          setElapsedTimes((prevTimes) => ({
            ...prevTimes,
            [title]: (prevTimes[title] || 0) + 1,
          }));
        }, 1000);
        setTimers((prevTimers) => ({ ...prevTimers, [title]: loginTimer }));
      }
    } else {
      // Stop all existing timers
      Object.keys(timers).forEach((key) => {
        if (key !== "Login") clearInterval(timers[key]);
      });

      setTimers((prevTimers) => ({
        Login: prevTimers["Login"],
      }));

      // Start a new timer for the clicked button
      const timer = setInterval(() => {
        setElapsedTimes((prevTimes) => ({
          ...prevTimes,
          [title]: (prevTimes[title] || 0) + 1,
        }));
      }, 1000);

      setTimers((prevTimers) => ({
        ...prevTimers,
        [title]: timer,
      }));
    }
  };

  // Stop all timers
  const stopAllTimers = () => {
    Object.keys(timers).forEach((key) => clearInterval(timers[key]));
    setTimers({}); // Clear all timer intervals
  };

  //This is for Total Taken Break: continoulsly track and increment
  // Timer logic with persistence and auto-reset after 24 hours
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime === 86400) {
            localStorage.removeItem("startTime");
            setTime(0);
            setIsRunning(false); // Stop the timer after 24 hours
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, setIsRunning]);

  //To handle the buttons click increament for rightbar activity duratin comp.

  const handleClick = (title) => {
    setDisplayStatus(title);
    setActiveStatus(title);
    localStorage.setItem("activeStatus", title);

    setShowStatuses((prevStatuses) => {
      // Avoid duplicates by checking if the status already exists
      if (!prevStatuses.includes(title)) {
        return [...prevStatuses, title];
      }
      return prevStatuses;
    });

    startTimerForButton(title); // Start the timer for the clicked button
  };

  // Logout logic
  const handleLogout = () => {
    // Save elapsedTimes to localStorage before logout
    // localStorage.setItem("elapsedTime", JSON.stringify(elapsedTimes));

    Object.keys(timers).forEach((key) => clearInterval(timers[key]));
    setTimers({});
    stopAllTimers(); // Stop all active timers
    setElapsedTimes({}); // Reset elapsed times for all buttons
    setActiveStatus(null); // Clear the active button status
    setDisplayStatus("Logout Completed"); // Update display status
    localStorage.clear(); // Clear any stored state
    alert("You have been logged out."); // Provide feedback
    window.location.reload();
  };

  const handleLogoutTrigger = () => {
    setLogoutTriggered(true); // Update logout state to trigger background color change
  };

  const startTimer = () => {
    if (!isRunning) {
      localStorage.setItem("startTime", Date.now().toString());
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  //////////////////////////////

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

  return (
    <ButtonsProvider>
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Leftbar
            displayStatus={displayStatus}
            setDisplayStatus={setDisplayStatus}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            handleClick={handleClick}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            startTimer={startTimer}
            stopTimer={stopTimer}
            time={time}
            setTime={setTime}
            formatTimes={formatTimes}
            savedTime={savedTime}
            setSavedTime={setSavedTime}
            title={displayStatus}
            handleLogout={handleLogout}
            logoutTriggered={logoutTriggered}
            handleLogoutTrigger={handleLogoutTrigger}
          />
          <Rightbar
            displayStatus={displayStatus}
            showStatuses={showStatuses}
            time={time}
            formatTimes={formatTimes}
            savedTime={savedTime}
            setSavedTime={setSavedTime}
            timers={timers}
            stopTimer={stopTimer}
            startTimer={startTimer}
            elapsedTimes={elapsedTimes}
            activeStatus={activeStatus}
          />
        </div>

        <div className="text-center">
          <Marquee />
        </div>
      </div>
    </ButtonsProvider>
  );
}
