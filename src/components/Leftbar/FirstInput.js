import React from "react";
export default function FirstInput({
  value,
  setValue,
  selectedOption,
  handleChange,
}) {
  return (
    <div className="flex p-6 gap-4 md:ml-16">
      <label className=" text-white font-semibold">
        Mail ID:
        <input
          className="flex flex-col md:w-[200px] w-full pl-3 py-[2px] rounded-md text-black border border-gray-300 focus:outline-none"
          type="text"
          name="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="abc@gmail.com..."
        />
      </label>
      <label htmlFor="dropdown" className=" text-white font-semibold">
        Working Mode:
        <div className="relative">
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            className="md:w-[200px] w-full pl-4 pr-16 text-black py-1 text-sm border border-gray-300 rounded focus:outline-none appearance-none"
          >
            <option value="">Select...</option>
            <option value="option1">Work From Home</option>
            <option value="option2">Work From Office</option>
            <option value="option3">Leave</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </label>
    </div>
  );
}
