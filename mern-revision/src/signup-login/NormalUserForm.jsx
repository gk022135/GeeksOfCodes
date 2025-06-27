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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>
            
            {loading ? (
                <Loader />
            ) : (
                <div className="relative z-10 w-full max-w-md">
                    {/* Glassmorphism container with enhanced styling */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/25">
                        {/* Floating header with glow effect */}
                        <div className="text-center mb-8 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-30 animate-pulse"></div>
                            <h2 className="relative text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-fade-in">
                                Create Your Account
                            </h2>
                            <p className="relative text-white/60 text-sm">Join us and start your journey</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Enhanced input fields */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        value={NormaluserData.username}
                                        onChange={changeHandler}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                        placeholder="Enter your full name"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={NormaluserData.email}
                                        onChange={changeHandler}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                        placeholder="Enter your email address"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 flex justify-between items-center transition-colors group-focus-within:text-blue-400">
                                    Password
                                    <span 
                                        onClick={() => setShowPass(!showpass)} 
                                        className="cursor-pointer text-blue-300 hover:text-blue-200 transition-all duration-200 transform hover:scale-110 p-1"
                                    >
                                        {showpass ? <FaRegEye className="animate-pulse" /> : <FaEyeSlash />}
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showpass ? "text" : "password"}
                                        name="password"
                                        value={NormaluserData.password}
                                        onChange={changeHandler}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                        placeholder="Create a strong password"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 flex justify-between items-center transition-colors group-focus-within:text-blue-400">
                                    Confirm Password
                                    <span 
                                        onClick={() => setConfShowPass(!confshowpass)} 
                                        className="cursor-pointer text-blue-300 hover:text-blue-200 transition-all duration-200 transform hover:scale-110 p-1"
                                    >
                                        {confshowpass ? <FaRegEye className="animate-pulse" /> : <FaEyeSlash />}
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={confshowpass ? "text" : "password"}
                                        name="confirmpass"
                                        value={NormaluserData.confirmpass}
                                        onChange={changeHandler}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            !isPassMatch 
                                                ? "bg-red-500/20 border-2 border-red-400 focus:ring-red-500/50 animate-pulse" 
                                                : "bg-white/5 border border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/10"
                                        }`}
                                        placeholder="Confirm your password"
                                    />
                                    <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none ${
                                        !isPassMatch 
                                            ? "bg-gradient-to-r from-red-500/20 to-pink-500/20" 
                                            : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                                    }`}></div>
                                </div>
                            </div>

                            {/* Enhanced submit button */}
                            <button
                                type="submit"
                                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] group"
                            >
                                <span className="relative z-10">Sign Up</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </button>
                        </form>

                        {/* Enhanced login link */}
                        <div className="text-center">
                            <p className="text-white/60 text-sm">
                                Already have an account?{" "}
                                <NavLink 
                                    to="/login" 
                                    className="text-blue-400 hover:text-blue-300 font-medium relative inline-flex items-center group transition-all duration-300"
                                >
                                    <span className="relative">
                                        Login
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </NavLink>
                            </p>
                        </div>

                        {/* Enhanced divider */}
                        <div className="relative flex items-center justify-center py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
                                <span className="text-white/40 text-sm">or continue with</span>
                            </div>
                        </div>

                        {/* Enhanced Google login button */}
                        <div className="flex justify-center">
                            <div className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
                                <FcGoogle size={24} className="group-hover:animate-spin transition-transform duration-300" />
                                <LoginButton />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastClassName="backdrop-blur-md bg-white/10 border border-white/20"
            />
        </div>
    );
}

export default Normaluser;