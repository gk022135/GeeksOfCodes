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
    <div className="bg-amber-900">
      <Design />
      {loading ? (
        <HashLoader />
      ) : (
        <div className="flex flex-col rounded-2xl justify-center content-center items-center p-1 m-3 w-[400px] bg-black text-blue-50 gap-2">
          {/* Buttons with active state styling */}
          <div>
            <button
              className={` px-2 rounded-md h-10 m-2 transition-all 
              ${
                isTrue ? "bg-green-400 text-black font-bold border-2 border-white" : "bg-amber-700/90"
              }`}
              onClick={() => setIsTrue(true)}
            >
              Admin-user
            </button>

            <button
              className={` px-2 rounded-md h-10 m-2 transition-all 
              ${
                !isTrue
                  ? "bg-green-400 border-2 border-white  text-black font-bold"
                  : "bg-amber-700/90"
              }`}
              onClick={() => setIsTrue(false)}
            >
              Normal-user
            </button>
          </div>

          {/* Apply effect on this div when button is clicked */}
          <div
            className={`w-auto justify-center content-center items-center h-auto 
              ${isTrue ? "bg-black text-white" : "bg-gray-900 text-gray-200"}`}
          >
            {isTrue ? <Adminuser /> : <Normaluser />}
          </div>
        </div>
      )}
    </div>
  );
}

   
export default Signup;
