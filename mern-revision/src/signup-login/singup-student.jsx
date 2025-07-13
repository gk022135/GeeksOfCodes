import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";
import { useAuth0 } from "@auth0/auth0-react";

// import Loader from "../UiComponents/Loader";

function SignupStudent() {
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
        <div className="flex m-10 shadow-white drop-shadow-2xl border border-white/30 rounded-4xl justify-center items-center content-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden gap-3 h-auto min-h-screen">
            {/* LEFT: SignUp Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6  rounded-2xl relative">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-25"></div>
                </div>

                <div className="w-full max-w-md relative">
                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-md">
                            {/* Enhanced Glassmorphism container */}
                            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 relative overflow-hidden">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                                
                                {/* Enhanced floating header */}
                                <div className="text-center mb-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-2xl opacity-20 animate-pulse"></div>
                                    <div className="relative">
                                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-fade-in">
                                            Join Us Today
                                        </h2>
                                        <p className="text-white/70 text-sm font-medium">Create your account and unlock amazing features</p>
                                        <div className="mt-3 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                                    </div>
                                </div>

                                <form onSubmit={submitHandler} className="space-y-6 relative ">
                                    {/* Enhanced input fields with better styling */}
                                    <div className="space-y-3 group">
                                        <label className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                value={NormaluserData.username}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Enter your full name"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 group">
                                        <label className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={NormaluserData.email}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Enter your email address"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 group">
                                        <label className="text-sm font-semibold text-white/90 flex justify-between items-center transition-colors group-focus-within:text-blue-400">
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                                Password
                                            </span>
                                            <span
                                                onClick={() => setShowPass(!showpass)}
                                                className="cursor-pointer text-blue-300 hover:text-blue-200 transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
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
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Create a strong password"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 group">
                                        <label className="text-sm font-semibold text-white/90 flex justify-between items-center transition-colors group-focus-within:text-blue-400">
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                                Confirm Password
                                            </span>
                                            <span
                                                onClick={() => setConfShowPass(!confshowpass)}
                                                className="cursor-pointer text-blue-300 hover:text-blue-200 transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
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
                                                className={`w-full px-5 py-4 rounded-2xl backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 shadow-lg ${!isPassMatch
                                                        ? "bg-red-500/20 border-2 border-red-400 focus:ring-red-500/50 animate-pulse"
                                                        : "bg-white/5 border border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/10"
                                                    }`}
                                                placeholder="Confirm your password"
                                            />
                                            <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none ${!isPassMatch
                                                    ? "bg-gradient-to-r from-red-500/20 to-pink-500/20"
                                                    : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                                                }`}></div>
                                        </div>
                                    </div>

                                    {/* Enhanced submit button */}
                                    <button
                                        type="submit"
                                        className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 py-4 rounded-2xl font-bold text-white shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] group mt-8"
                                    >
                                        <span className="relative   text-lg">Create Account</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </button>
                                </form>

                                {/* Enhanced login link */}
                                <div className="text-center relative  ">
                                    <p className="text-white/70 text-sm">
                                        Already have an account?{" "}
                                        <NavLink
                                            to="/login"
                                            className="text-blue-400 hover:text-blue-300 font-semibold relative inline-flex items-center group transition-all duration-300"
                                        >
                                            <span className="relative">
                                                Sign In
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                        </NavLink>
                                    </p>
                                </div>

                                {/* Enhanced divider */}
                                <div className="relative flex items-center justify-center py-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/20"></div>
                                    </div>
                                    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 rounded-full">
                                        <span className="text-white/50 text-sm font-medium">or continue with</span>
                                    </div>
                                </div>

                                {/* Enhanced Google login button */}
                                <div className="flex justify-center relative  ">
                                    <div className="flex items-center gap-3 px-8 py-4 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
                                        <FcGoogle size={24} className="" />
                                        <LoginButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Hero Section */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-10 relative h-screen overflow-hidden">
                {/* Background effects */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div> */}
                
                {/* Main hero content */}
                <div className="relative   text-center h-full">
                    {/* Hero illustration/icon */}
                    <div className="mx-auto w-64 h-64 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            {/* Rocket/Growth icon */}
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                                    </svg>
                                </div>
                                {/* Floating particles */}
                                <div className="absolute -top-4 -right-4 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                                <div className="absolute top-8 -right-8 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>

                    {/* Hero text */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                            Welcome to the Future
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                            Join thousands of users who trust our platform for amazing experiences and seamless connectivity.
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 gap-4 mt-12">
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">Secure & Encrypted</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">Lightning Fast</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">24/7 Support</span>
                        </div>
                    </div>

                    {/* Floating notification */}
                    {/* <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg animate-bounce">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            <span className="text-white/80 text-sm font-medium">1,234+ Active Users</span>
                        </div>
                    </div> */}
                </div>
            </div>

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

export default SignupStudent;