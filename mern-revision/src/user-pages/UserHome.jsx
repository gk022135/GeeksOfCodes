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

import X from '../assets/X.png';
import Git from '../assets/Github.png'
import Linked from '../assets/InkedIn.png';
import Insta from '../assets/Instagram.jpeg';

function UserHome() {
    console.log("user auth home per hai")
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
        <div className="flex flex-col">

            <div className="flex flex-col relative bg-black items-center justify-center md:p-5 p-10 text-white">
                <h1 className=" text-3xl text-white font-bold"> <span className="text-3xl text-red-500 font-bold">Hello !</span>
                    <span className="text-3xl text-yellow-300 font-bold"> Student </span>
                    How's Your class going</h1>
                <br></br>
                <h1 className="text-2xl text-white font-bold">
                    Your <span className="text-2xl text-red-500 font-bold">Ultimate</span> Utilty Hub!
                </h1>
                <div className="flex items-center md:ml-50 md:mr-50">
                    <p className="text-gray-400 p-10 items-center">Welcome to <span className="text-2xl text-yellow-300">Uniator</span>, A versatile web platform integrating real-time code collaboration, a secure gate pass system with QR scanning, an attendance tracker, an advanced to-do list with backend support, and a community discussion forum. making it an all-in-one students, and organizations.</p>
                </div>
            </div>




            <div className="main flex flex-col md:flex-row bg-black relative min-h-screen gap-4 content-center items-center md:items-start p-2">

                {/* Left Sidebar */}
                <div className="left-div flex flex-col w-3/4 bg-white/10 border-2 md:w-1/5 p-4 rounded-2xl relative md:gap-5 md:h-screen">
                    <UserProfile props={userInfo} />
                    <LeftDivComp props={leftEditor} />

                    <LeftDivComp props={userInfo} />
                    <LeftDivComp props={logout} />

                </div>

                {/* Middle Section */}
                <div className="middle-div flex flex-col items-center justify-center bg-white/10 md:h-screen md:w-3/5 p-4 rounded-2xl relative gap-4 content-center w-3/4">

                    {/* Upper Section */}
                    <div className="middle flex flex-col md:flex-row justify-center items-center border-0 rounded-2xl border-b-emerald-600  text-white mt-2 mb-2 relative md:w- md:h-[200px] gap-4 h-1/4">
                        <Middle_upper props={QRComponent} color={"#13180f"} />
                        <Middle_upper props={attendance} color={"#13180f"} />
                        <Middle_upper props={AvailableClasses} color={"#13180f"} />
                    </div>

                    {/* Middle Section */}
                    <div className="middle flex justify-center items-center rounded-2xl  text-white mt-2 mb-2 relative h-1/2 w-3/4 md:w- md:h-[200px] md:gap-5">
                        <MiddlemiddleComp />
                        <MiddlemiddleComp />
                        {/* {clickType === "Search" ? (<h1 className="bg-red-400 h-20">hello working fine ji</h1>) : ("")} */}
                    </div>

                    {/* Bottom Section */}
                    <div className="middle flex justify-center border-0 rounded-2xl border-b-emerald-600 bg-black text-white mt-2 mb-2 relative h-1/4 w-full">
                        <h1>Your Recent Activities</h1>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="right-div bg-white/10 h-full md:w-1/5 p-4 rounded-2xl relative md:h-screen">
                    <Todo_Page />
                    <CommunityForum />
                    <RightDivComp props={userInfo} />
                </div>

            </div>



            <div className="flex flex-col bg-black text-white h-full justify-center content-center items-center">
                <h1 className="p-5 text-2xl md:text-7xl antialiased">
                    Connect With Our Community !!
                </h1>
                <div className="relative grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1 w-3/4">


                    <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                        <img src={X} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                        <h1>
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </h1>
                    </div>


                    <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                        <img src={Git} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                        <h1>
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </h1>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                        <img src={Linked} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                        <h1>
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </h1>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                        <img src={Insta} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                        <h1>
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </h1>
                    </div>

                </div>


            </div>

        </div>

    )
}
export default UserHome;

