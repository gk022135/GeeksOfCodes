import { useContext, useState } from "react";
import './From.css'
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

import { AppContext } from "../ContextApi/FisrtContext";
import HashLoader from 'react-spinners/HashLoader'
import { ToastContainer, toast } from 'react-toastify'



function Normaluser() {
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

    console.log("new object", SignUpData);
    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        if (NormaluserData.password === NormaluserData.confirmpass) {

            const signupresponse = await SendDataSignLogin('signup', SignUpData)

            if(signupresponse.error){
                toast.error(signupresponse.error)
            }
             else toast.success(signupresponse.message)
        }
        else {
            SetMatch(!IsPassMatch);
            toast.warning("password not match")
            console.log("password not match")
        }

    };
    console.log("your ", IsPassMatch)

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

                <label htmlFor="gen">Gender</label>
                <input
                    type="text"
                    id="gen"
                    name="gender"
                    value={NormaluserData.gender}
                    onChange={changeHandler}
                />

                <label htmlFor="con">Contact</label>
                <input
                    type="number"
                    id="con"
                    name="contact"
                    value={NormaluserData.contact}
                    onChange={changeHandler}
                />

                <button type="submit">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Normaluser;
