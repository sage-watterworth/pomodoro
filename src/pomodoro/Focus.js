import React from "react";
import classNames from "../utils/class-names";
import { minutesToDuration} from "../utils/duration";
import Pomodoro from "./Pomodoro.js";

function Focus({
    focusDuration
    }) {


//focus durations
return (
<div className="pomodoro">
    <div className="row">
        <div className="col">
            <div className="input-group input-group-lg mb-2">
                <span className="input-group-text" data-testid="duration-focus">
                {/* TODO: Update this text to display the current focus session duration */}
                Focus Duration: {minutesToDuration(focusDuration)}
                </span>
                <div className="input-group-append">
                {/* TODO: Implement decreasing focus duration and disable during a focus or break session
                added event listener and name="decrease-focus"*/}

                <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid="decrease-focus"
                    name="decrease-focus"
                    on-click="handleIncrementClick"
                >
                    <span className="oi oi-minus" />
                </button>
                </div>
            </div>
        </div>
    </div>
</div>
  );
 }
export default Focus;
