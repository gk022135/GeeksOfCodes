import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer,toast } from "react-toastify";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";



 function Login() {
    const [showpass, SetShowpass] = useState(false)
    const {loading, setLoading, SendDataSignLogin,}  = useContext(AppContext);
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
        const response = await SendDataSignLogin('login',NormaluserData);
        console.log("login form send succes",response);

        //local storage mein save kr rha hu

        localStorage.setItem("userData",JSON.stringify(response));

        if(!response.success){
            toast.error(response.message);
        }
        else if(response.success){
            toast.success(response.message)
            if(response.role === 'Admin-user'){
                //rediredt to admin page 
                <NavLink to={'/admin-dashboard'} />
            }
            if (response.role === "normal-user") {

                setTimeout(() => {
                  navigate("/user-home"); // ✅ Corrected function usage
                }, 1000);
            }
            //redirect to home page and other page
        }
    };
    return (
        <div>
            <form className="form " onSubmit={submitHandler}>
                <label htmlFor="name">User Name</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={NormaluserData.username}
                    onChange={changeHandler}
                    required
                />

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
                   {<FcGoogle size={30} /> } <h2> login with google </h2>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
