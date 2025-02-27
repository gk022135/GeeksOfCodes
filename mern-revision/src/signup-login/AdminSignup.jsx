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
    name: NormaluserData.username,
    email: NormaluserData.email,
    password: NormaluserData.password,
    role: NormaluserData.role,
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
    if(!response.success)toast.error(response.message)

    console.log("response for admin: ", response);
    console.log("Your form data saved successfully", NormaluserData);
  };



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

        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Adminuser;
