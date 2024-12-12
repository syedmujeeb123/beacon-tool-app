import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.module.css";
import FirstInput from "./FirstInput";
import SecondInput from "./SecondInput";
import ThirdLoginLogout from "./ThirdLoginLogout";
import FourthBtns from "./FourthBtns";
import FifthDisplayCurrentStatus from "./FifthDisplayCurrentStatus";

export default function Leftbar({
  displayStatus,
  title,
  timers,
  setDisplayStatus,
  activeStatus,
  setActiveStatus,
  handleClick,
  isRunning,
  setIsRunning,
  startTimer,
  stopTimer,
  time,
  setTime,
  formatTimes,
  savedTime,
  setSavedTime,
  handleLogout,
  isLoggingOut,
  logoutTriggered,
  elapsedTime,
  handleLogoutTrigger,
  handleLogin,
}) {
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");

  //Handle change in selected option
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className=" bg-blue-400 md:w-[72em]">
      <FirstInput
        value={value}
        setValue={setValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleChange={handleChange}
      />
      <SecondInput
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        comment={comment}
        setComment={setComment}
        handleCommentChange={handleCommentChange}
      />
      <ThirdLoginLogout
        setDisplayStatus={setDisplayStatus}
        setActiveStatus={setActiveStatus}
        stopTimer={stopTimer}
        startTimer={startTimer}
        displayStatus={displayStatus}
        handleClick={handleClick}
        handleLogout={handleLogout}
        handleLogoutTrigger={handleLogoutTrigger}
        activeStatus={activeStatus}
      />
      <FourthBtns
        handleClick={handleClick}
        setActiveStatus={setActiveStatus}
        activeStatus={activeStatus}
        startTimer={startTimer}
        stopTimer={stopTimer}
        setDisplayStatus={setDisplayStatus}
        timers={timers}
        formatTimes={formatTimes}
        elapsedTime={elapsedTime}
      />
      <FifthDisplayCurrentStatus
        title={displayStatus}
        displayStatus={displayStatus}
        setActiveStatus={setActiveStatus}
        time={time}
        setTime={setTime}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        formatTimes={formatTimes}
        savedTime={savedTime}
        startTimer={startTimer}
        stopTimer={stopTimer}
        setSavedTime={setSavedTime}
        isLoggingOut={isLoggingOut}
        logoutTriggered={logoutTriggered}
      />
    </div>
  );
}
