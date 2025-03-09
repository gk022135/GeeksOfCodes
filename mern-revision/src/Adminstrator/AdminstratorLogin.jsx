import { useContext, useState } from "react";
import '../signup-login/From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";


function SUlogin() {
    const [showpass, SetShowpass] = useState(false)
    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext);
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
        SetMatch(true);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin('adminstrator-login', NormaluserData);
        console.log("login form send succes", response);


        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response.success) {
            toast.error(response.message);
        }
        else if (response.success && response.data.role === "Administrator") {
            console.log("helloooo")
            toast.success(response.message)
            setTimeout(() => {
                navigate("/administrator");
            }, 1000);
            
        }
    };
    return (
        <div className="flex justify-center h-screen items-center content-center align-bottom">
            <div>
                <form className="form " onSubmit={submitHandler}>
                    <h1 className="text-2xl text-cyan-500 border-b-2">Super User Login</h1>
            

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={NormaluserData.email}
                        onChange={changeHandler}
                        required
                    />

                    <label htmlFor="pass-login">Password
                        <input
                            type={showpass ? ("text") : ("password")}
                            id="pass-login"
                            name="password"
                            value={NormaluserData.password}
                            onChange={changeHandler}
                            required
                        />
                        <span onClick={() => { SetShowpass(!showpass) }}>
                            {showpass ? <FaRegEye /> : <FaEyeSlash />}
                        </span>
                    </label>

                    <div className="flex flex-row gap-5 p-2 rounded-xl">
                        <button type="submit">Login</button>

                        <span className="flex flex-row gap-2 border-2 rounded-md justify-center items-center p-1 text-white hover:bg-amber-800/50 cursor-pointer">
                            {<FcGoogle size={30} />} <h2>{<LoginButton />}</h2>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SUlogin;
