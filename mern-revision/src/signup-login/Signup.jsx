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
        <div className="bg-amber-900">
            <Design />
            {
                loading ? (<HashLoader />) : 
                (
                    <div className="flex flex-col justify-center content-center items-center p-1 m-3 w-[400px] bg-blue-600/75 text-blue-50 gap-2">

                <button className="border-2 rounded-md bg-amber-700/90 h-10 m-2 " onClick={isAdmin}>Admin-user</button>


                <button className="border-2 rounded-md bg-amber-700/90 h-10 m-2" onClick={() => setTrue(false)}>Normal-user</button>

                <div className= "w-auto bg-black text-white justify-center content-center items-center h-auto">
                {istrue ? <Adminuser /> : <Normaluser />}
            </div>
            </div >
                )
}
            
            
        </div >
    );
}

export default Signup;
