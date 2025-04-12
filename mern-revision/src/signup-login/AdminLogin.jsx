import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";


import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AdminLogin() {
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
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log("NormaluserData")
        const response = await SendDataSignLogin('admin-login', NormaluserData);
        // console.log("login response for frtend ", response);


        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response.success) {
            toast.error(response.message);
        }
        else if (response.success) {
            toast.success(response.message)
            if (response.role === 'Admin-user') {
                setTimeout(() => {
                    navigate("/admin-dashboard");
                }, 1000);
            }
        }
    };
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg shadow-lg rounded-lg p-6 md:p-8">
            <form className="flex flex-col" onSubmit={submitHandler}>
                {/* Title */}
                <h1 className="text-2xl font-semibold text-blue-400 border-b-2 pb-2 text-center">
                    Teacher Login
                </h1>
    
                {/* Name Field */}
                <label htmlFor="name" className="mt-4 text-gray-300">Teacher Name</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={NormaluserData.username}
                    onChange={changeHandler}
                    required
                    className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
    
                {/* Email Field */}
                <label htmlFor="email" className="mt-4 text-gray-300">Teacher Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={NormaluserData.email}
                    onChange={changeHandler}
                    required
                    className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
    
                {/* Password Field */}
                <label htmlFor="pass-login" className="mt-4 text-gray-300 flex justify-between">
                    Password
                    <span onClick={() => SetShowpass(!showpass)} className="cursor-pointer text-blue-400">
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
                    className="w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
    
                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-6 font-semibold transition-all hover:scale-105"
                >
                    Login
                </button>
            </form>
        </div>
    
        <ToastContainer />
    </div>
    
    );
}

export default AdminLogin;