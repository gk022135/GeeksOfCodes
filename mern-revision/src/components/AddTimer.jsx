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
        <div className="flex flex-row justify-evenly gap-2 items-center relative">
            <div className="flex flex-col w-1/2 p-2 gap-1  border-1 items-center rounded-xl relative">
                <input
                    className="w-1/1 h-1/3 p-1 rounded-xl  bg-opacity-40 border"
                    type="number"
                    name="time"
                    value={timer.time}
                    onChange={timeHandler}
                    placeholder="time in min"
                />
                <button 
                className="text-black border-1 p-1 rounded bg-blue-700 font-bold hover:bg-green-600 m-1"
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
