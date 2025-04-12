import { useContext, useState } from "react";
import Normaluser from "./NormalUserForm";
import Adminuser from "./AdminSignup";
import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from "react-spinners/HashLoader";

function Signup() {
  const [isTrue, setIsTrue] = useState(true);
  const { loading } = useContext(AppContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <div className="w-full max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center space-y-6 transition-all duration-300">
          {/* Toggle Buttons */}
          <div className="flex space-x-6">
            <button
              onClick={() => setIsTrue(true)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-semibold text-sm shadow-md 
                ${isTrue
                  ? "bg-gradient-to-r from-green-400 to-lime-500 text-black"
                  : "bg-white/10 hover:bg-white/20"
                }`}
            >
              Teacher
            </button>

            <button
              onClick={() => setIsTrue(false)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-semibold text-sm shadow-md 
                ${!isTrue
                  ? "bg-gradient-to-r from-green-400 to-lime-500 text-black"
                  : "bg-white/10 hover:bg-white/20"
                }`}
            >
              Student
            </button>
          </div>

          {/* Form Display */}
          <div className="w-full">
            {isTrue ? <Adminuser /> : <Normaluser />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
