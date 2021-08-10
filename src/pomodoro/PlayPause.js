import React from "react";
import classNames from "../utils/class-names";
import {minutesToDuration, secondsToDuration} from "../utils/duration";
import Pomodoro from "./Pomodoro.js";


function PlayPause({
isTimerRunning,
handleStop,
disableButton,
breakDuration,
focusSessionActive,
focusDuration,
sessionCountdown,
handlePlayPauseClick,
ariaValue
}) {

return(
<div>
<div className="row">
<div className="col">
  <div
    className="btn-group btn-group-lg mb-2"
    role="group"
    aria-label="Timer controls"
  >
    <button
      type="button"
      className="btn btn-primary"
      data-testid="play-pause"
      title="Start or pause timer"
      onClick={handlePlayPauseClick}
    >
      <span
        className={classNames({
          oi: true,
          "oi-media-play": !isTimerRunning,
          "oi-media-pause": isTimerRunning,
        })}
      />
    </button>
    {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
    {/* TODO: Disable the stop button when there is no active session */}
    <button
      type="button"
      className="btn btn-secondary"
      data-testid="stop"
      title="Stop the session"
      onClick={handleStop}
      disabled={disableButton}
    >
      <span className="oi oi-media-stop" />
    </button>
  </div>
</div>
</div>


<div>
{/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
<div className="row mb-2">
  <div className="col">
    {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
    <h2 data-testid="session-title">
        {focusSessionActive ? "Focusing" : "On Break"} for
        {focusSessionActive
          ? `${minutesToDuration(focusDuration)}`
          : `${minutesToDuration(breakDuration)}`}
      minutes
    </h2>
    {/* TODO: Update message below correctly format the time remaining in the current session */}
    <p className="lead" data-testid="session-sub-title">
        {focusSessionActive ? `${secondsToDuration(focusDuration * 60 - sessionCountdown)}` : `${secondsToDuration(breakDuration * 60 - sessionCountdown)}`}{" "}
      remaining
    </p>
  </div>
</div>
<div className="row mb-2">
  <div className="col">
        <div className="progress" style={{ height: "20px" }}>
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={ariaValue}  // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: ariaValue }} // Completed: Increase width % as elapsed time increases
            />
        </div>
  </div>
</div>
</div>
</div>

);
}
export default PlayPause;
