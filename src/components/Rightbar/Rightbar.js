import ImplicitHeader from "./ImplicitHeader";
import ActivityDuration from "./ActivityDuration";
import ExplicitHeader from "./ExplicitHeader";
import ExplicitTotalHours from "./ExplicitTotalHours";
import RotatingLogo from "./RotatingLogo";
// import OperationClients from "./OperationClients";
export default function Rightbar({
  displayStatus,
  showStatuses,
  activeStatus,
  time,
  savedTime,
  setSavedTime,
  formatTimes,
  formatTimer,
  timers,
  startTimer,
  stopTimer,
  elapsedTimes,
  activityTimes,
}) {
  return (
    <div className="w-full bg-green-500 p-4 md:-m-3">
      <RotatingLogo />

      <ImplicitHeader />
      <ActivityDuration
        displayStatus={displayStatus}
        activeStatus={activeStatus}
        time={time}
        savedTime={savedTime}
        setSavedTime={setSavedTime}
        formatTimes={formatTimes}
        formatTimer={formatTimer}
        showStatuses={showStatuses}
        timers={timers}
        startTimer={startTimer}
        stopTimer={stopTimer}
        elapsedTimes={elapsedTimes}
      />
      <div className="space-y-4">
        <ExplicitHeader />
        <ExplicitTotalHours
          showStatuses={showStatuses}
          elapsedTimes={elapsedTimes}
          formatTimes={formatTimes}
        />
      </div>
    </div>
  );
}
