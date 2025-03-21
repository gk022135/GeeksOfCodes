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
    FuckltyOf :NormaluserData.FuckltyOf
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

    console.log("response for admin: ", response);
    console.log("Your form data saved successfully", NormaluserData);
  };



  return (
    <div className="relative flex justify-center">
      <form className="Admin-form" onSubmit={submitHandler}>
        <label htmlFor="name">Teacher Name</label>
        <input
          type="text"
          id="name"
          name="username"
          value={NormaluserData.username}
          onChange={changeHandler}
          required
        />

        <label htmlFor="email">Teacher Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={NormaluserData.email}
          onChange={changeHandler}
          required
        />

        <div>
          <label htmlFor="facultyof">Faculty Of </label>
          <select
          id="facultyof"
          name="FuckltyOf"
          value={NormaluserData.FuckltyOf}
          onChange={changeHandler}
          className="text-white border rounded h-10 bg-black"
          >
            <option value= "">Select An Option</option>
            <option value= "CSE">Computer Science & Engineering</option>
            <option value= "ECE">Electronic Communication & Engineering</option>
            <option value= "EE">Electrical Engineering</option>
            <option value= "CE">Civil Engineering</option>
            <option value= "MEC">Mechinical Engineering</option>
            <option value= "BIOTECH">Biotechnology and Engineering</option>
            <option value= "BBA">Bachelors of Bussiness Adminstrative</option>
            <option value= "MBA">Masters In Bussiness Adminstrative</option>
          </select>
        </div>


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
