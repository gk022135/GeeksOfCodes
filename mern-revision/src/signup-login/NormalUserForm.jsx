import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from 'react-spinners/HashLoader'
import { ToastContainer, toast } from 'react-toastify'
import { NavLink, useNavigate } from "react-router-dom";

import LoginButton from "../Google Auth/Login";
import { useAuth0 } from "@auth0/auth0-react";
// import Loader from "../UiComponents/Loader";



function Normaluser() {
    const navigate = useNavigate();
    const googleAuth = useAuth0();

    // console.log("google data frontend per ", googleAuth);

    const [showpass, SetShowpass] = useState(false)
    const [confshowpass, SetconfShowpass] = useState(false)
    const [IsPassMatch, SetMatch] = useState(true);

    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext);



    const [NormaluserData, setNormalUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpass: "",
        contact: "",
        gender: "",
        role: "normal-user",
    });


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        SetMatch(true);
    };

    const SignUpData = {
        username: NormaluserData.username,
        email: NormaluserData.email,
        password: NormaluserData.password,
        role: NormaluserData.role
    }

    if (NormaluserData && NormaluserData.email) {
        localStorage.setItem("useremail", NormaluserData.email);
        // console.log("New object stored in localStorage:", NormaluserData.email);
    } else {
        console.log("Error: Email is missing in NormaluserData");
    }


    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        if (NormaluserData.password === NormaluserData.confirmpass) {

            const signupresponse = await SendDataSignLogin('signup', SignUpData)

            if (signupresponse.error) {
                toast.error(signupresponse.error)
            }
            else if(signupresponse.success) {
                toast.success(signupresponse.message)
                setTimeout(() => {
                    navigate("/otpvarification");
                }, 1000);
            }
            else if(signupresponse.message === "User already exists, please login")
            {
                toast.warn(signupresponse.message)
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        }
        else {
            SetMatch(!IsPassMatch);
            toast.warning("password not match")
            console.log("password not match")
        }

    };
    console.log("your ", IsPassMatch)

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
       {loading ? (<Loader />) : 
        <form
            className="bg-green-950 shadow-md rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-md"
            onSubmit={submitHandler}
        >
            <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>

            {/* Name Field */}
            <label htmlFor="name" className="block text-white font-medium">Student Name</label>
            <input
                type="text"
                id="name"
                name="username"
                value={NormaluserData.username}
                onChange={changeHandler}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />

            {/* Email Field */}
            <label htmlFor="email" className="block text-white font-medium">Student Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={NormaluserData.email}
                onChange={changeHandler}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />

            {/* Password Field */}
            <label htmlFor="pass" className="block text-white font-medium flex justify-between">
                Password
                <span onClick={() => SetShowpass(!showpass)} className="cursor-pointer text-blue-600">
                    {showpass ? <FaRegEye /> : <FaEyeSlash />}
                </span>
            </label>
            <input
                type={showpass ? "text" : "password"}
                id="pass"
                name="password"
                value={NormaluserData.password}
                onChange={changeHandler}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />

            {/* Confirm Password Field */}
            <label htmlFor="con-pass" className="block text-white font-medium flex justify-between">
                Confirm Password
                <span onClick={() => SetconfShowpass(!confshowpass)} className="cursor-pointer text-blue-600">
                    {confshowpass ? <FaRegEye /> : <FaEyeSlash />}
                </span>
            </label>
            <input
                type={confshowpass ? "text" : "password"}
                id="con-pass"
                name="confirmpass"
                value={NormaluserData.confirmpass}
                onChange={changeHandler}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 
                ${!IsPassMatch && "border-red-500 bg-red-100 animate-shake"}`}
            />

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4">
                Sign Up
            </button>

            {/* Already Have an Account? */}
            <p className="text-center mt-3 text-white/50">
                Already have an account?{" "}
                <NavLink to="/login" className="text-green-600 font-semibold hover:underline">
                    Login
                </NavLink>
            </p>

            {/* Google Signup */}
            <div className="flex items-center justify-center mt-4">
                <span className="flex flex-row gap-2 border-2 border-blue-700 rounded-md px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer">
                    <FcGoogle size={24} /> <LoginButton />
                </span>
            </div>
        </form>
  }
        <ToastContainer />
    </div>

    );
}

export default Normaluser;