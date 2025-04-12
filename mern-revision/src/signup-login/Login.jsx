import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";


function Login() {
    const [showpass, SetShowpass] = useState(false)
    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext);
    const navigate = useNavigate();

    const [NormaluserData, setNormalUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        SetMatch(true);
    };

    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin('login', NormaluserData);
        // console.log("login form send succes", response);

        //local storage mein save kr rha hu

        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response.success) {
            toast.error(response.message);
        }
        else if (response.success) {
            toast.success(response.message)
            if (response.role === 'Admin') {
                //rediredt to admin page 
                <NavLink to={'/admin-dashboard'} />
            }
            if (response.role === "normal-user") {

                setTimeout(() => {
                    navigate("/user-home");
                }, 1000);
            }
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
    <div className="w-full max-w-lg bg-gray-800/50 backdrop-blur-lg shadow-lg rounded-lg p-6 md:p-8">
        <form className="flex flex-col" onSubmit={submitHandler}>
            {/* Title */}
            <h1 className="text-2xl font-semibold text-cyan-400 border-b-2 pb-2 text-center">
                User Login
            </h1>

            {/* Name Field */}
            <label htmlFor="name" className="mt-4 text-gray-300">User Name</label>
            <input
                type="text"
                id="name"
                name="username"
                value={NormaluserData.username}
                onChange={changeHandler}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            {/* Email Field */}
            <label htmlFor="email" className="mt-4 text-gray-300">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={NormaluserData.email}
                onChange={changeHandler}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            {/* Password Field */}
            <label htmlFor="pass-login" className="mt-4 text-gray-300 flex justify-between items-center">
                Password
                <span 
                    onClick={() => { SetShowpass(!showpass) }} 
                    className="cursor-pointer text-gray-400 hover:text-white"
                >
                    {showpass ? <FaRegEye /> : <FaEyeSlash />}
                </span>
            </label>
            <input
                type={showpass ? "text" : "password"}
                id="pass-login"
                name="password"
                value={NormaluserData.password}
                onChange={changeHandler}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
            />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
                {/* Login Button */}
                <button 
                    type="submit" 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md font-semibold transition-all hover:scale-105"
                >
                    Login
                </button>

                {/* Google Login */}
                <span 
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md cursor-pointer transition-all hover:scale-105"
                >
                    <FcGoogle size={24} /> <h2>{<LoginButton />}</h2>
                </span>
            </div>
        </form>
    </div>

    <ToastContainer />
</div>

    );
}

export default Login;