import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function SignupTeacher() {


    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext)
    const navigate = useNavigate();


    const [NormaluserData, setNormalUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "Admin-user",
        FuckltyOf: "",

    });


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const NewObject = {
        name: NormaluserData.username,
        email: NormaluserData.email,
        password: NormaluserData.password,
        role: NormaluserData.role,
        FuckltyOf: NormaluserData.FuckltyOf
    }


    if (NormaluserData && NormaluserData.email) {
        localStorage.setItem("useremail", NormaluserData.email);
        // console.log("New object stored in localStorage:", NormaluserData.email);
    } else {
        console.log("Error: Email is missing in NormaluserData");
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin("admin-sign-up", NewObject);
        if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
                navigate('/admin-login')
            }, 1000)
        }
        if (!response.success) toast.error(response.message)

        // console.log("response for admin: ", response);
        // console.log("Your form data saved successfully", NormaluserData);
    };



    return (
        <div className="flex m-10 shadow-white drop-shadow-2xl border border-white/30 rounded-4xl justify-center items-center content-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden gap-3 h-auto min-h-screen ">
            {/* LEFT: Admin Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6  rounded-2xl relative">
                <div className="w-full max-w-md relative z-10">
                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                        </div>
                    ) : (
                        <div className="relative z-10 w-full max-w-md">
                            {/* Enhanced Glassmorphism container */}
                            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 relative overflow-hidden">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>

                                {/* Enhanced header */}
                                <div className="text-center mb-8 relative z-10">
                                    <div className="relative">
                                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                                            Admin Registration
                                        </h1>
                                        <p className="text-white/70 text-sm font-medium">Create your admin account for faculty management</p>
                                        <div className="mt-3 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                                    </div>
                                </div>

                                <form className="space-y-6 relative z-10" onSubmit={submitHandler}>
                                    {/* Teacher Name Field */}
                                    <div className="space-y-3 group">
                                        <label htmlFor="name" className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Teacher Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="username"
                                                value={NormaluserData.username}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Enter teacher's full name"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Teacher Email Field */}
                                    <div className="space-y-3 group">
                                        <label htmlFor="email" className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Teacher Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={NormaluserData.email}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Enter teacher's email address"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Faculty Dropdown */}
                                    <div className="space-y-3 group">
                                        <label htmlFor="FuckltyOf" className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Faculty Of
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="FuckltyOf"
                                                name="FuckltyOf"
                                                value={NormaluserData.FuckltyOf}
                                                onChange={changeHandler}
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                            >
                                                <option value="" className="bg-gray-800">Select An Option</option>
                                                <option value="CSE" className="bg-gray-800">Computer Science & Engineering</option>
                                                <option value="ECE" className="bg-gray-800">Electronic Communication & Engineering</option>
                                                <option value="EE" className="bg-gray-800">Electrical Engineering</option>
                                                <option value="CE" className="bg-gray-800">Civil Engineering</option>
                                                <option value="MEC" className="bg-gray-800">Mechanical Engineering</option>
                                                <option value="BIOTECH" className="bg-gray-800">Biotechnology and Engineering</option>
                                                <option value="BBA" className="bg-gray-800">Bachelors of Business Administration</option>
                                                <option value="MBA" className="bg-gray-800">Masters in Business Administration</option>
                                            </select>
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-3 group">
                                        <label htmlFor="pass" className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="pass"
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

                                    {/* Confirm Password Field */}
                                    <div className="space-y-3 group">
                                        <label htmlFor="con-pass" className="text-sm font-semibold text-white/90 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="con-pass"
                                                name="confirmpass"
                                                value={NormaluserData.confirmpass}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                                placeholder="Confirm your password"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-4 rounded-2xl font-bold text-white shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] group mt-8"
                                    >
                                        <span className="relative z-10 text-lg">Create Admin Account</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Hero Section */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-10  rounded-2xl relative overflow-hidden">
                {/* Background effects */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 rounded-full blur-3xl"></div> */}

                {/* Main hero content */}
                <div className="relative z-10 text-center space-y-8">
                    {/* Admin Dashboard illustration */}
                    <div className="mx-auto w-64 h-64 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            {/* Admin Dashboard Icon */}
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9H21ZM21 10H9V16H10V19H14V16H15V19H19V16H20V10H21ZM8 11V13H6V11H8ZM8 14V16H6V14H8ZM8 17V19H6V17H8Z" />
                                    </svg>
                                </div>
                                {/* Floating elements */}
                                <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-400 rounded-lg flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-purple-400 rounded-lg flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero text */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                            Manage faculty members, courses, and students with our comprehensive admin panel designed for educational institutions.
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 gap-4 mt-12">
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <span className="font-semibold">Faculty Management</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-semibold">Course Administration</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 group">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-semibold">Student Records</span>
                        </div>
                    </div>

                    {/* Department stats */}
                    <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">8</div>
                            <div className="text-white/70 text-sm font-medium">Departments</div>
                        </div>
                    </div>

                    {/* Active admin indicator */}
                    <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-white/80 text-sm font-medium">Admin Portal Active</span>
                        </div>
                    </div>
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

export default SignupTeacher;