import { useContext, useState } from "react";
import Design from "./Design";
import Normaluser from "./NormalUserForm";
import Adminuser from "./AdminSignup";

import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from "react-spinners/HashLoader";

function Signup() {
    const [istrue, setTrue] = useState(false);
    const { loading, setLoading } = useContext(AppContext);

    

  function isAdmin() {
    setTrue(!istrue);
  }
    return (
        <div className="flex flex-col justify-center bg-amber-900 ">
            <Design />
            {
                loading ? (<HashLoader />) :
                    (
                        <div className="flex flex-col justify-center md:ml-[350px] p-1 m-3 w-[410px] bg-blue-600/50 text-blue-50 rounded-2xl gap-2">

                            <div className="flex flex-row justify-center border-2 rounded-2xl">
                                <button className="sigup-button  border-2 rounded-md bg-amber-700/90 h-10 m-2  " onClick={isAdmin}
                                 style={{ backgroundColor: istrue ? "blue" : "#076944" }}
                                >Admin-user</button>
                                <button className="border-2 rounded-md bg-amber-700/90 h-10 m-2" onClick={() => setTrue(false)}
                                style={{ backgroundColor: !istrue ? "blue" : "#076944" }}
                                >Normal-user</button>
                            </div>

                            <div className="w-auto bg-black text-white justify-center content-center items-center h-auto rounded-2xl">
                                {istrue ? <Adminuser /> : <Normaluser />}
                            </div>
                        </div >
                    )
            }


        </div >
    );
}

   
export default Signup;
