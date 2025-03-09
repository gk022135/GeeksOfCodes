import { useState, useEffect } from "react";

function PopComponent({ ispopState }) {
    const [isPopup, setPopup] = useState(ispopState);

    // Sync `isPopup` with `ispopState` when prop changes
    useEffect(() => {
        setPopup(ispopState);
    }, [ispopState]);

    function closePopHandler() {
        setPopup(false);
    }

    // Automatically close after 10 sec when opened
    useEffect(() => {
        if (isPopup) {
            const timer = setTimeout(() => {
                setPopup(false);
            }, 10000);
            return () => clearTimeout(timer); // Cleanup to prevent memory leaks
        }
    }, [isPopup]);

    return (
        <div>
            {isPopup && (
                <div className="flex flex-col relative 
                bg-gradient-to-tl from-blue-700 to-green-600 to-yellow-500 sm:w-2/5 z-20 shadow-black m-2 shadow-2xl left-40 border-2 rounded-2xl p-2 justify-center content-center">
                    <button onClick={closePopHandler} className="flex right-0 top-0 bg-red-500 w-1/6 p-1 text-amber-50 rounded-xl">
                        Close
                    </button>
                    <div className="flex flex-col w-3/4 m-2 justify-center content-center relative left-10 gap-1">
                        <h1 className="text-black font-bold text-2xl">Type of PopUp</h1>
                        <p className="text-black/70 text-sm">Pop description</p>

                        <p className="text-black text-sm font-bold">
                            Date: {new Date().toLocaleDateString()}
                        </p>

                        <p className="text-black text-sm font-bold">Course Code: </p>
                        <p className="text-black text-sm font-bold">Teacher: </p>
                        <p className="text-black text-sm font-bold">Student: </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopComponent;
