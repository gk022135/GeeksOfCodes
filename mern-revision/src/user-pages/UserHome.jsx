import LeftDivComp from "./Left_div_Comp";
import RightDivComp from "./Right_div_Comp";
import Middle_upper from "./Middle_upper";
import MiddlemiddleComp from "./Middle_middle_comp";
// import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "../ContextApi/FisrtContext";
import { useContext } from "react";
import { useEffect } from "react";

function UserHome() {
    const { SendDataSignLogin } = useContext(AppContext);
    const G_user = localStorage.getItem("userGdata");

    useEffect(() => {
        const sendUserData = async () => {
           
            if (G_user) {
                const parsedUser = JSON.parse(G_user);
                const userUpdatedData = {
                    username: parsedUser.name,
                    email: parsedUser.email,
                    image: parsedUser.picture,
                    nickname: parsedUser.nickname,
                    user_verified: parsedUser.email_verified,
                    role: "normal-user",
                };

                try {
                    const G_user_res =  SendDataSignLogin("google-login-data", userUpdatedData);
                    console.log("Response from backend:", G_user_res);
                    console.log("Updated user data:", userUpdatedData);
                } catch (error) {
                    console.error("Error sending user data:", error);
                }
            } else {
                console.log("No user data found in localStorage.");
            }
        };

        sendUserData(); // Call the async function inside useEffect
    }, []);


    const dataFromLocalStorage = localStorage.getItem("userData");
    let userInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
    let G_User2 = G_user ? JSON.parse(G_user) : null

     
    if(userInfo == null && G_User2 != null){
        userInfo = G_User2
    }

    if(G_User2 == null && userInfo != null){
        
    }

    if (userInfo == null || G_User2 == null) {
        userInfo = {
            name: "",
            email: "",
            role: "",
        }
    }
    console.log(userInfo)

    // which data to be displayed 
    

    const middleUper = {
        name: "Gaurav  kumar",
        url: "#",
        color: "blue"
    }



    return (
        <div className="main flex flex-row bg-black relative h-screen mt-[80px] gap-4">


            <div className="left-div bg-emerald-700/20 border-2 border-b-blue-800 h-full w-1/5 p-4 mt-4 rounded-2xl relative">

                <LeftDivComp props={userInfo} />
                <LeftDivComp props={userInfo} />
                <LeftDivComp props={userInfo} />
            </div>

            <div className="middle-div flex flex-col items-center justify-center bg-blue-400/20 h-full w-3/5 p-4 rounded-2xl relative">
                <div className="middle flex justify-center items-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/4 w-1/1">
                    <Middle_upper props={middleUper} color={"#13180f"} />
                    <Middle_upper props={middleUper} color={"#13180f"} />
                    <Middle_upper props={middleUper} color={"#13180f"} />

                </div>
                <div className="middle flex justify-center items-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/2 w-1/1">
                    <MiddlemiddleComp />
                    <MiddlemiddleComp />
                </div>
                <div className="middle flex justify-center  border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/4 w-1/1">
                    <h1>your recent activties </h1>
                </div>
            </div>

            <div className="right-div bg-emerald-500/30 h-full w-1/5 p-4 mt-4 rounded-2xl relative">
                <RightDivComp props={userInfo} />
                <RightDivComp props={userInfo} />
                <RightDivComp props={userInfo} />

            </div>
        </div>

    )
}
export default UserHome;