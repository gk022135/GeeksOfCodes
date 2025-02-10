import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { AppContext } from "../ContextApi/FisrtContext";

 function Login() {
    const [showpass, SetShowpass] = useState(false)
    const {loading, setLoading, SendDataSignLogin,}  = useContext(AppContext);

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
    const submitHandler = (e) => {
        e.preventDefault();
        const response =  SendDataSignLogin('login',NormaluserData);
        console.log("login form send succes",response);
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
        </div>
    );
}

export default Login;
