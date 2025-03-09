import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function StartTimer({ initialTime }) {
    const timeInmin = initialTime;
    const [time, setTime] = useState(timeInmin);
    const [isRunning, setIsRunning] = useState(false);
    const [start, setStart] = useState(true);

    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup the timer on unmount or state change
    }, [isRunning, time]);

    const startHandler = () => {
        setIsRunning(true);
        setStart(false);
    };

    const pauseHandler = () => {
        setIsRunning(false);
        setStart(true)
    };
    if(time == 0){
        toast.warning("timeout bro")
    }
    console.log(time)
    return (
        <div className='border border-3 border-black p-1 mr-2 rounded-xl overflow-hidden'>
            <h1>Time Left: {time}s</h1>

            {
                isRunning ?
                    (<button onClick={pauseHandler} disabled={!isRunning}>Pause</button>)
                    :
                    (<button onClick={startHandler} disabled={isRunning || time <= 0}>Start</button>)

            }

            <div
                className="h-2 bg-yellow-500 rounded items-center justify-center border overflow-hidden"
                style={{ width: `${((timeInmin - time) / timeInmin) * 100}%` }}
            ></div>


        </div>
    );
}

export default StartTimer;
