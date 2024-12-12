import { createContext, useContext } from "react";

const ButtonsContext = createContext();

export const ButtonsProvider = ({ children }) => {
  const buttons = [
    "DownTime",
    "QA Feedbk",
    "Lunch",
    "Short Break",
    "Production",
    "Wellness",
    "Meeting",
    "Coaching",
    "Available",
    "PKT",
    "Training",
    "Extra Activ.",
  ];

  return (
    <ButtonsContext.Provider value={buttons}>
      {children}
    </ButtonsContext.Provider>
  );
};

export const useButtons = () => useContext(ButtonsContext);

// setShowStatuses((prevStatuses) => {
//   if (!prevStatuses.includes(title)) {
//     return [...prevStatuses, title];
//   }
//   return prevStatuses;
// });
// localStorage.setItem("setShowStatuses", time);
// var prevItem = localStorage.getItem("currentState");

// var prevItemValue = localStorage.getItem(prevItem);
// localStorage.setItem(prevItem, duration);

// if (localStorage.getItem(title)) {
//   // SetDuration(parseInt(localStorage.getItem(title)) + 1);
//   SetDuration(localStorage.getItem(time));
//   localStorage.setItem(title, formatTimes);
//   localStorage.setItem(title, time);
// } else {
//   localStorage.setItem(title, "1");
//   SetDuration(1);
// }

// localStorage.setItem("currentState", title);

//  {/* {displayStatus}
//         {formatTimes(time)} */}

//         {/* {buttons.length > 0 ? (
//           showStatuses.map((Status, index) => (
//             <div key={index} className="ml-10 truncate whitespace-nowrap">
//               {Status} {formatTimes(isSeconds)}
//             </div>
//           ))
//         ) : (
//           <div className="text-center">No Activity Yet</div>
//         )} */}
