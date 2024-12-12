import React from "react";

export default function LoginLogout({
  setDisplayStatus,
  setActiveStatus,
  stopTimer,
  startTimer,
  handleClick,
  handleLogout,
  title,
  handleLogoutTrigger,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col md:pl-20 pl-6">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-[rgb(10,10,30)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          <label className="text-white font-semibold text-sm ml-2">
            Mark Attendance
          </label>
        </div>
        <button
          onClick={() => {
            setDisplayStatus("Login completed");
            setActiveStatus("Login");
            handleClick("Login");
            startTimer();
          }}
          className="border bg-[rgb(10,10,30)] text-white border-white rounded-md md:w-[210px] w-[150px] py-1"
        >
          Login
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-red-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>

          <label className="text-white font-semibold ml-2">LogOut</label>
        </div>
        <button
          onClick={(e) => {
            setDisplayStatus("Logout Completed");
            setActiveStatus("Logout");
            handleClick("Logout");
            handleLogout();
            stopTimer();
            handleLogoutTrigger();
          }}
          className="border bg-red-800 text-white border-white rounded-md md:w-[200px] w-[135px] py-1"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
