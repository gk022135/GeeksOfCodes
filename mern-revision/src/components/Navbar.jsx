import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 
import {NavLink} from "react-router-dom"
import Logout from "./Logout";
import LogoutButton from "../Google Auth/Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {isAuthenticated} = useAuth0();
  console.log("ky a maal hai isme", useAuth0());
  
  const [isOpen, setIsOpen] = useState(false);

  const localData = localStorage.getItem("userData");
  console.log(localData)
  let data = localData ? JSON.parse(localData) : {}; // Ensure `data` is an object
  
  // Ensure `data.success` is always a boolean
  if (typeof data.success !== "boolean") {
    data.success = false;
  }
  console.log("hi ", data.success)
  

 


  return (
    <nav className="sticky top-0 z-10 bg-black/50 backdrop-blur-lg text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="text-2xl font-semibold opacity-80">Logo</span>

        
          <div className="hidden md:flex space-x-5">
            <NavLink to="/"  className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">Home</NavLink>
            <NavLink to="/user-home" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">About</NavLink>
            <NavLink to="/login" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">{data.success|| isAuthenticated ? <LogoutButton /> : "Login"}</NavLink>
            <NavLink to="/Contact" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">Contact</NavLink>
          </div>

         
          <button 
            className="md:hidden text-white text-2xl focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-black/5 flex flex-col items-center space-y-4 py-4">
          <a href="#" className="opacity-70 hover:opacity-100 hover:text-lg hover:font-bold">Dashboard</a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:text-lg hover:font-bold">About</a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:text-lg hover:font-bold">Projects</a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:text-lg hover:font-bold">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
