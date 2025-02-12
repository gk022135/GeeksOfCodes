import { useState } from "react";


function OtpVerification() {
    const [digits, setDigits] = useState(Array(6).fill(""));

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        if (index < 5 && value !== "") {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleSubmit = () => {
        const completeNumber = digits.join("");
        console.log("Whole number is:", completeNumber);

        //otp varification
        
    };

    return (
        <div className="flex border-2 mt-20 justify-center content-center items-center bg-blue-500/90">
            <div className="flex gap-2 justify-center items-center">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="w-12 h-12 border-2 border-b-red-800 text-center text-xl font-bold 
                            focus:border-blue-500 focus:outline-amber-300 rounded-lg 
                            sm:w-14 sm:h-14 md:w-16 md:h-16"
                    />
                ))}
            </div>
            <button 
                onClick={handleSubmit}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Submit
            </button>
        </div>
    );
}

export default OtpVerification;
