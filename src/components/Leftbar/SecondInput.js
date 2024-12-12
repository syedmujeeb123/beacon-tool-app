import React from "react";
import DatePicker from "react-datepicker";

export default function ThirdBtns({
  selectedDate,
  setSelectedDate,
  comment,
  handleCommentChange,
}) {
  return (
    <div className="relative flex gap-4 md:ml-16 p-6">
      <label htmlFor="commentBox" className=" text-white font-semibold">
        Select Shift-Date
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="w-[100px] pl-3 py-1 border border-gray-300 rounded-md text-black focus:outline-none"
            customInput={<InputWithIcon />}
          />
        </div>
      </label>

      <div>
        <label
          htmlFor="stretchableTextarea"
          className=" text-white font-semibold"
        >
          Leave a Comment:
        </label>
        <textarea
          style={{ resize: "both" }}
          id="commentBox"
          value={comment}
          onChange={handleCommentChange}
          placeholder="You can add comments here..."
          className="w-full md:w-[200px] font-semibold p-3 h-22 border border-gray-300 rounded-md focus:outline-none  text-black resize-none"
        ></textarea>
      </div>
    </div>
  );
}

const InputWithIcon = ({ value, onClick }) => (
  <div
    className="relative flex items-center md:w-[200px] w-[142px] border border-gray-300 rounded-md"
    onClick={onClick}
  >
    <input
      type="text"
      value={value || ""}
      readOnly
      className="md:w-full w-[140px] md:pl-3 pl-2 pr-10 py-1 text-black focus:outline-none"
      placeholder="Select a date"
    />
    <button
      type="button"
      className="absolute md:right-3 right-1 text-gray-500"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9V7.5a2.25 2.25 0 014.5 0V9m-4.5 0h4.5m-4.5 0A2.25 2.25 0 006 11.25v6a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25v-6A2.25 2.25 0 0015.75 9h-7.5z"
        />
      </svg>
    </button>
  </div>
);
