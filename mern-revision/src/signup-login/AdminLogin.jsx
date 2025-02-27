import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";


import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


 function AdminLogin() {
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


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin('admin-login',NormaluserData);
        console.log("login response for frtend ",response);


        localStorage.setItem("UserData",JSON.stringify(response));

        if(!response.success){
            toast.error(response.message);
        }
        else if(response.success){
            toast.success(response.message)
            if(response.role === 'Admin-user'){
                setTimeout(() => {
                    navigate("/admin-dashboard");
                  }, 1000);
            }
        }
    };
    return (
        <div>
            <form className="form " onSubmit={submitHandler}>
                <label htmlFor="name">Admin Name</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={NormaluserData.username}
                    onChange={changeHandler}
                    required
                />

                <label htmlFor="email">Admin Email</label>
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
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AdminLogin;
