import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Adminuser() {
  

  const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext)
  const navigate = useNavigate();


  const [NormaluserData, setNormalUserData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    role: "Admin-user", 
  });

 
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setNormalUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const NewObject = {
    username : NormaluserData.username,
    email : NormaluserData.email,
    password : NormaluserData.password,
    role : NormaluserData.role,
  }


  //saving email to local storage then delete imediately after varification
  localStorage.setItem("useremail",NormaluserData.email);

  // Handling form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await SendDataSignLogin("signup", NewObject);
    setTimeout( ()=>{
      navigate('/otpvarification')
    },1000)
    toast.success(response.message)

    // console.log("response for admin: ",response);
    // console.log("Your form data saved successfully", NormaluserData);
  };


  //hello nie


  return (
    <div>
      <form className="Admin-form" onSubmit={submitHandler}>
        <label htmlFor="name">Admin Name</label>
        <input
          type="text"
          id="name"
          name="username"
          value={NormaluserData.username}
          onChange={changeHandler}
          required
        />

        <label htmlFor="email">Amdin Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={NormaluserData.email}
          onChange={changeHandler}
          required
        />

        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="password"
          value={NormaluserData.password}
          onChange={changeHandler}
          required
        />

        <label htmlFor="con-pass">Confirm Password</label>
        <input
          type="password"
          id="con-pass"
          name="confirmpass"
          value={NormaluserData.confirmpass}
          onChange={changeHandler}
          required
        />

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

export default Adminuser;
