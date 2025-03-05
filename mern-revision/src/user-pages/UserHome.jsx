import LeftDivComp from "./Left_div_Comp";
import RightDivComp from "./Right_div_Comp";
import Middle_upper from "./Middle_upper";
import MiddlemiddleComp from "./Middle_middle_comp";
// import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "../ContextApi/FisrtContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import UserProfile from "./User_Profile";
import Todo_Page from "./Todo_redir";
import CommunityForum from "./Community_chat";

function UserHome() {
    const { SendDataSignLogin } = useContext(AppContext);
    const G_user = localStorage.getItem("userGdata");



    const [clickType, setClickType] = useState(null);
    useEffect(() => {
        const buttonType = localStorage.getItem("buttonClickType");
        if (buttonType) {
            setClickType(buttonType);
        }
    }, []);
    
    const clickHandler = (props) => {
        setClickType((prevType) => {
            const newType = prevType === props ? null : props; // Toggle logic
            if (newType) {
                localStorage.setItem("buttonClickType", newType);
            } else {
                localStorage.removeItem("buttonClickType");
            }
            return newType;
        });
    };



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
                    const G_user_res = SendDataSignLogin("google-login-data", userUpdatedData);
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


    const dataFromLocalStorage = localStorage.getItem("UserData");
    let userInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
    let G_User2 = G_user ? JSON.parse(G_user) : null

    if (userInfo == null && G_User2 != null) {
        userInfo = G_User2
    }

    if (G_User2 == null && userInfo != null) {

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
    const leftEditor = {
        url: "/all-classes-student",
        head: "Monaic code",
        para: "vs-code code editor try to use for real time collbroation in code",
        name: "Go To All"
    }
    const logout = {
        url: '/logout',
        head: 'Logout',
        para: "want to logout ?",
        name: "logout"
    }


    const AvailableClasses = {
        url: "/all-classes",
        head: "All Available",
        para: "Here is All Classes that are held",
        name: "Go To All"
    }
    const attendance = {
        url: "/all-classes-student",
        head: "Mark Your Attendance",
        para: "now you can mark your attendance subject wise",
        name: "Mark Attendance"
    }

    const QRComponent = {
        url: "/qrscanner",
        head: "G1/G2 Entries",
        para: "scan Qr for making entries from university gate",
        name: "Scan Qr"
    }



    return (
        <div className="main flex flex-col md:flex-row bg-black relative min-h-screen mt-[64px] gap-4">

            {/* Left Sidebar */}
            <div className="left-div flex flex-col w-full bg-emerald-700/20 border-2 border-b-blue-800 md:w-1/5 p-4 mt-4 rounded-2xl relative">
                <UserProfile props={userInfo} />
                <LeftDivComp props={leftEditor} />


                <div className="middle-upper-1 flex flex-col relative bg-black border-amber-300 border-2 justify-center items-center p-1 overflow-hidden ml-1 mr-1 md:w-3/3 rounded-2xl h-auto gap-2 m-2 content-center hover:bg-emerald-400 bg-gradient-to-r  from-green-400 to-blue-900 ">
                    <button
                        onClick={() => clickHandler("Search")}
                    >Search Attendance by Sub</button>
                </div>

                <LeftDivComp props={userInfo} />
                <LeftDivComp props={logout} />

            </div>

            {/* Middle Section */}
            <div className="middle-div flex flex-col items-center justify-center bg-blue-400/20 md:h-full md:w-3/5 p-4 rounded-2xl relative gap-4">

                {/* Upper Section */}
                <div className="middle flex flex-col md:flex-row justify-center items-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative md:w-full gap-4 h-1/4">
                    <Middle_upper props={QRComponent} color={"#13180f"} />
                    <Middle_upper props={attendance} color={"#13180f"} />
                    <Middle_upper props={AvailableClasses} color={"#13180f"} />
                </div>

                {/* Middle Section */}
                <div className="middle flex justify-center items-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/2 w-full">
                    <MiddlemiddleComp />
                    <MiddlemiddleComp />
                    {clickType === "Search" ? (<h1 className="bg-red-400 h-20">hello working fine ji</h1>) : ("")}
                </div>

                {/* Bottom Section */}
                <div className="middle flex justify-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/4 w-full">
                    <h1>Your Recent Activities</h1>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="right-div bg-emerald-500/30 h-full md:w-1/5 p-4 mt-4 rounded-2xl relative">
                <Todo_Page />
                <CommunityForum />
                <RightDivComp props={userInfo} />
            </div>

        </div>

    )
}
export default UserHome;

