import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";

function SUlogin() {
  const [showpass, SetShowpass] = useState(false);
  const { loading, SendDataSignLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const [NormaluserData, setNormalUserData] = useState({
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
    const response = await SendDataSignLogin("adminstrator-login", NormaluserData);
    localStorage.setItem("UserData", JSON.stringify(response));

    if (!response.success) {
      toast.error(response.message);
    } else if (response.success && response.data.role === "Administrator") {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/administrator");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-white space-y-6">
        <h1 className="text-3xl font-bold text-center border-b border-gray-500 pb-2">
          Super User Login
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-3 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-300"
              placeholder="Enter your email"
              value={NormaluserData.email}
              onChange={changeHandler}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="pass-login" className="text-sm font-semibold">
              Password
            </label>
            <input
              type={showpass ? "text" : "password"}
              id="pass-login"
              name="password"
              className="p-3 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-300"
              placeholder="Enter your password"
              value={NormaluserData.password}
              onChange={changeHandler}
              required
            />
            <span
              className="absolute right-3 top-11 cursor-pointer text-gray-300"
              onClick={() => SetShowpass(!showpass)}
            >
              {showpass ? <FaRegEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              type="submit"
              className="bg-cyan-400 text-black font-semibold py-2 rounded-xl hover:bg-cyan-300 transition-all"
            >
              Login
            </button>

            <div className="flex items-center justify-center gap-3 border border-gray-400 p-2 rounded-xl hover:bg-white/20 cursor-pointer transition-all">
              <FcGoogle size={24} />
              <LoginButton />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SUlogin;
