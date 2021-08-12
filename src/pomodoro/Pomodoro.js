import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import PlayPause from "./PlayPause";


  const initialStates = {
    focusDuration: 25,
    breakDuration: 5,
    isTimerRunning: false,
    sessionCountdown: 0,
    focusSessionActive: false,
    sessionActive: false,
    ariaValue: 0,
  };

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [sessionCountdown, setSessionCountdown] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [ariaValue, setAriaValue] = useState(0);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [focusSessionActive, setFocusSessionActive] = useState(false);

  //disable and enable stop button
  const [stopButton, setStopButton] = useState(true)
  const [disableButton, setDisableButton] = useState(false)



  const handleIncrementClick = ({ target }) => {
    if (
      target.name === "increase-focus" ||
      target.parentNode.name === "increase-focus"
    ) {
      setFocusDuration((currentFocusDuration) => Math.min(currentFocusDuration + 5, 60));
    } else if (
      target.name === "decrease-focus" ||
      target.parentNode.name === "decrease-focus"
    ) {
      setFocusDuration((currentFocusDuration) => Math.max(currentFocusDuration - 5, 5));
    } else if (
      target.name === "increase-break" ||
      target.parentNode.name === "increase-break"
    ) {
      setBreakDuration((currentFocusDuration) => Math.min(currentFocusDuration + 1, 15));
    } else if (
      target.name === "decrease-break" ||
      target.parentNode.name === "decrease-break"
    ) {
      setBreakDuration((currentFocusDuration) => Math.max(currentFocusDuration - 1, 1));
    }
  };


function handleStop(){
  setIsTimerRunning(false)
  setStopButton(true)
  setSession(null)
  setDisableButton(false)
}

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
function handlePlayPauseClick() {
     setIsTimerRunning((prevState) => {
       const nextState = !prevState;
       if (nextState) {
         setSession((prevStateSession) => {
           // If the timer is starting and the previous session is null,
           // start a focusing session.
           if (prevStateSession === null) {
             return {
               label: "Focusing",
               timeRemaining: focusDuration * 60,
             };
           }
           return prevStateSession;
         });
      }
    return nextState;
    });
  }

  return (
    <div className="pomodoro">

       <Break
        breakDuration={breakDuration}
        handleIncrementClick={handleIncrementClick}
      />
      <Focus
      focusDuration={focusDuration}
      handleIncrementClick={handleIncrementClick}
      />
      <PlayPause
        isTimerRunning={isTimerRunning}
        handleStop={handleStop}
        disableButton={disableButton}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        focusSessionActive={focusSessionActive}
        focusDuration={focusDuration}
        sessionCountdown={sessionCountdown}
        handlePlayPauseClick={handlePlayPauseClick}
        ariaValue={ariaValue}
      />
    </div>
  )
}

export default Pomodoro;
