import { useState } from "react";


function Otpvarifiacation() {
    const [singleDigit, setCompleteNumber] = useState();
    const number = 0;

    const SubmitHandler = (event) =>{
        const {name,value} = event.target;
        setCompleteNumber({
            [name] : value
        })
        number = number*10 + singleDigit;
        console.log("whole number is", number);
    }

    return (
        <div className="flex border-2 mt-10 justify-center content-center items-center bg-blue-500/50">

            {/* <div className="flex flex-row ">
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
                <input type="text" pattern="[0-9]" maxlength="1" title="Enter a single digit (0-9)" />
            </div> */}


            <div className="flex gap-2 justify-center items-center">
                {[...Array(6)].map((_, index) => (
                    <input
                        name="digit"
                        value={digit}
                        key={index}
                        type="text"
                        pattern="[0-9]"
                        maxLength="1"
                        title="single digit (0-9)"
                        className="w-12 h-12 border-2 border-gray-400 text-center text-xl font-bold 
                 focus:border-blue-500 focus:outline-none rounded-lg 
                 sm:w-14 sm:h-14 md:w-16 md:h-16" // Responsive sizes
                    />
                ))}
            </div>
            <button 
            onClick={SubmitHandler}
            ></button>


        </div>
    )
}
export default Otpvarifiacation;