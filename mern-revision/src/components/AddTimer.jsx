import { useState } from "react";
import StartTimer from "./StartTimer";

function AddTimer() {
    const [timer, setTimer] = useState({ time: '' });
    const [timerCreated, setTimerCreated] = useState(false);

    const timeHandler = (e) => {
        setTimer({ ...timer, [e.target.name]: e.target.value });
    };

    const makeTimer = () => {
        if (timer.time) {
            setTimerCreated(!timerCreated);
            
        }
    };

    return (
        <div className="flex flex-row justify-evenly gap-2 items-center">
            <div className="flex flex-col w-20 p-2 gap-1 bg-teal-900 items-center rounded-xl ">
                <input
                    className="w-14 h-5 p-1 rounded-xl bg-slate-300 bg-opacity-40"
                    type="number"
                    name="time"
                    value={timer.time}
                    onChange={timeHandler}
                    placeholder="time in min"
                />
                <button 
                className="text-white m-1"
                onClick={makeTimer}>
                    {
                     timerCreated ? (<p>Reset</p>) : (<p>Timer</p>)   
                    }
                   </button>
            </div>


            {timerCreated && <StartTimer initialTime={parseInt(timer.time)} />}
        </div>
    );
};

export default AddTimer;
