import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";
import { useAuth0 } from "@auth0/auth0-react";
// import Loader from "../UiComponents/Loader";

function Normaluser() {
    const navigate = useNavigate();
    const googleAuth = useAuth0();

    const [showpass, setShowPass] = useState(false);
    const [confshowpass, setConfShowPass] = useState(false);
    const [isPassMatch, setMatch] = useState(true);
    const { loading, SendDataSignLogin } = useContext(AppContext);

    const [NormaluserData, setNormalUserData] = useState({
        username: "", email: "", password: "", confirmpass: "", role: "normal-user",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData(prev => ({ ...prev, [name]: value }));
        setMatch(true);
    };

    const SignUpData = {
        username: NormaluserData.username,
        email: NormaluserData.email,
        password: NormaluserData.password,
        role: NormaluserData.role
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (NormaluserData.password !== NormaluserData.confirmpass) {
            setMatch(false);
            toast.warning("Passwords do not match");
            return;
        }

        const response = await SendDataSignLogin('signup', SignUpData);

        if (response.error) toast.error(response.error);
        else if (response.success) {
            toast.success(response.message);
            setTimeout(() => navigate("/otpvarification"), 1000);
        } else if (response.message === "User already exists, please login") {
            toast.warn(response.message);
            setTimeout(() => navigate("/login"), 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4">
            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={submitHandler} className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-8 space-y-6 border border-white/10 text-white">
                    <h2 className="text-2xl font-bold text-center text-white mb-2">Create Your Account</h2>

                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={NormaluserData.username}
                            onChange={changeHandler}
                            required
                            className="w-full px-4 py-2 mt-1 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={NormaluserData.email}
                            onChange={changeHandler}
                            required
                            className="w-full px-4 py-2 mt-1 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium flex justify-between items-center">
                            Password
                            <span onClick={() => setShowPass(!showpass)} className="cursor-pointer text-blue-300">
                                {showpass ? <FaRegEye /> : <FaEyeSlash />}
                            </span>
                        </label>
                        <input
                            type={showpass ? "text" : "password"}
                            name="password"
                            value={NormaluserData.password}
                            onChange={changeHandler}
                            required
                            className="w-full px-4 py-2 mt-1 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium flex justify-between items-center">
                            Confirm Password
                            <span onClick={() => setConfShowPass(!confshowpass)} className="cursor-pointer text-blue-300">
                                {confshowpass ? <FaRegEye /> : <FaEyeSlash />}
                            </span>
                        </label>
                        <input
                            type={confshowpass ? "text" : "password"}
                            name="confirmpass"
                            value={NormaluserData.confirmpass}
                            onChange={changeHandler}
                            required
                            className={`w-full px-4 py-2 mt-1 rounded bg-white/10 border ${!isPassMatch ? "border-red-500 bg-red-100 text-black animate-shake" : "border-white/20"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-700 hover:from-violet-700 hover:to-blue-600 py-2 rounded-md font-semibold shadow-md transition-all duration-200"
                    >
                        Sign Up
                    </button>

                    <div className="text-center text-sm text-white/70">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-300 hover:underline font-medium">
                            Login
                        </NavLink>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 border border-blue-600 rounded-md hover:bg-blue-600 transition-colors cursor-pointer text-blue-300 hover:text-white">
                            <FcGoogle size={20} />
                            <LoginButton />
                        </div>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}

export default Normaluser;
