import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from 'react-spinners/HashLoader'
import { ToastContainer, toast } from 'react-toastify'
import { NavLink, useNavigate } from "react-router-dom";

import LoginButton from "../Google Auth/Login";
import { useAuth0 } from "@auth0/auth0-react";



function Normaluser() {
    const navigate = useNavigate();
    const googleAuth = useAuth0();

    console.log("google data frontend per ",googleAuth);

    const [showpass, SetShowpass] = useState(false)
    const [confshowpass, SetconfShowpass] = useState(false)
    const [IsPassMatch, SetMatch] = useState(true);

    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext);



    const [NormaluserData, setNormalUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpass: "",
        contact: "",
        gender: "",
        role: "normal-user",
    });


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        SetMatch(true);
    };

    const SignUpData = {
        username: NormaluserData.username,
        email: NormaluserData.email,
        password: NormaluserData.password,
        role: NormaluserData.role
    }

    if (NormaluserData && NormaluserData.email) {
        localStorage.setItem("useremail", NormaluserData.email);
        console.log("New object stored in localStorage:", NormaluserData.email);
    } else {
        console.log("Error: Email is missing in NormaluserData");
    }


    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        if (NormaluserData.password === NormaluserData.confirmpass) {

            const signupresponse = await SendDataSignLogin('signup', SignUpData)

            if (signupresponse.error) {
                toast.error(signupresponse.error)
            }
            else {
                toast.success(signupresponse.message)
                setTimeout(() => {
                    navigate("/otpvarification");
                }, 1000);
            }
        }
        else {
            SetMatch(!IsPassMatch);
            toast.warning("password not match")
            console.log("password not match")
        }

    };
    console.log("your ", IsPassMatch)

    return (
        <div className="">
            <form className="form " onSubmit={submitHandler}>
                <label htmlFor="name">Student Name</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={NormaluserData.username}
                    onChange={changeHandler}
                    required
                />

                <label htmlFor="email">Student Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={NormaluserData.email}
                    onChange={changeHandler}
                    required
                />

                <label htmlFor="pass">Password
                    <input
                        type={showpass ? ("text") : ("password")}
                        id="pass"
                        name="password"
                        value={NormaluserData.password}
                        onChange={changeHandler}
                        required
                    />
                    <span onClick={() => { SetShowpass(!showpass) }} className="flex items-center justify-center cursor-pointer">
                        {showpass ? <FaRegEye /> : <FaEyeSlash />}
                    </span>
                </label>

                <label htmlFor="con-pass">Confirm Password
                    <input
                        type={confshowpass ? ("text") : ("password")}
                        id="con-pass"
                        name="confirmpass"
                        value={NormaluserData.confirmpass}
                        onChange={changeHandler}
                        required
                        style={IsPassMatch ? {} : { borderColor: "red", animation: "shake 0.5s", backgroundColor: "red" }}

                    />
                    <span onClick={() => { SetconfShowpass(!confshowpass) }} className="flex items-center justify-center cursor-pointer">
                        {confshowpass ? <FaRegEye /> : <FaEyeSlash />}
                    </span>
                </label>

                

                {/* <label htmlFor="con">Contact</label>
                <input
                    type="number"
                    id="con"
                    name="contact"
                    value={NormaluserData.contact}
                    onChange={changeHandler}
                /> */}

                <button type="submit">Sign Up</button>
                <span className="border rounded-md p-2 ml-2 text-red-500">Already Account ?
                    <NavLink
                        to="/login"
                        style={{ color: "aliceblue", border: "2px solid green", padding: "2px", borderRadius: "2px", marginLeft: "4px", background: "green" }}
                    >
                        Login
                    </NavLink>
                </span>

                <span className="flex flex-row gap-2 border-2 border-blue-700 rounded-md justify-center items-center content-center p-1 mt-2 text-white hover:bg-amber-800/50 cursor-pointer w-auto">
                    {<FcGoogle size={30} />} <h2> {<LoginButton />}</h2>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Normaluser;
