import React from "react";
import { useButtons } from "./ButtonsContext";
export default function FourthBtns({
  handleClick,
  activeStatus,
  startTimer,
  stopTimer,
}) {
  const buttons = useButtons();

  return (
    <div className="grid grid-cols-3 md:max-w-[30em] max-w-[320px] gap-4 mt-8 md:pl-24 pl-6">
      {buttons.map((title) => (
        <button
          key={title}
          onClick={() => {
            handleClick(title);
          }}
          className={`bg-blue-600 rounded-md px-2 md:w-[9em] py-1 whitespace-nowrap text-sm text-white border border-white w-26 ${
            activeStatus === title ? "bg-yellow-400" : "bg-blue-600"
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
