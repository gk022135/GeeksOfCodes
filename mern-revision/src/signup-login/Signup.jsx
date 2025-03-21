import { useContext, useState } from "react";
import Design from "./Design";
import Normaluser from "./NormalUserForm";
import Adminuser from "./AdminSignup";

import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from "react-spinners/HashLoader";

function Signup() {


  //   const [active, setactive] = useState(true);
  const [isTrue, setIsTrue] = useState(true);

  const { loading, setLoading } = useContext(AppContext);

  //   function isAdmin() {
  //     setTrue(!istrue);
  //   }

  return (
    <div className="flex justify-center w-full p-4 relative">
      {loading ? (
        <HashLoader />
      ) : (
        <div className="relative flex flex-col rounded-2xl justify-center items-center p-4 m-3 w-1/1 md:w-2/7 border-2 bg-black text-blue-50 gap-4">
          {/* Buttons with active state styling */}
          <div className="flex w-3/5 rounded-2xl border-2 justify-center">
            <button
              className={`px-4 py-2 rounded-md h-10 m-2 transition-all 
            ${isTrue
                  ? "bg-green-400 text-black font-bold border-2 border-white"
                  : "bg-amber-700/90"
                }`}
              onClick={() => setIsTrue(true)}
            >
              Teacher
            </button>

            <button
              className={`px-4 py-2 rounded-md h-10 m-2 transition-all 
            ${!isTrue
                  ? "bg-green-400 border-2 border-white text-black font-bold"
                  : "bg-amber-700/90"
                }`}
              onClick={() => setIsTrue(false)}
            >
              Student
            </button>
          </div>

          {/* Apply effect on this div when button is clicked */}
          <div
            className={`relative p-4 w-1/1 rounded-lg h-auto text-center
          ${isTrue ? "text-white" : "text-gray-200"}`}
          >
            {isTrue ? <Adminuser /> : <Normaluser />}
          </div>
        </div>
      )}
    </div>

  );
}


export default Signup;
