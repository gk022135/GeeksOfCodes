import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import Logout from "./Logout";
import LogoutButton from "../Google Auth/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeSelector from "../themectrl";
import ProfileIcon from "../ui/profileicon";

import { House, Plus, LayoutGrid, Mail, Bell, Search } from 'lucide-react';


const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setLogged] = useState(false)

  useEffect(() => {
    const localData = localStorage.getItem("UserData");
    let data = localData ? JSON.parse(localData) : {}; // Ensure `data` is an object
    console.log("data.success", data.success)
    // Ensure `data.success` is always a boolean
    if (typeof data.success === "boolean" && data.success) {
      console.log("data.success", data.success)
      setLogged(true);
    }
  }, []);


  return (
    <nav className="sticky top-0 z-10 bg-base-100 backdrop-blur-lg text-black font-medium">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="bg-gradient-to-tl from-yellow-500 to-red-600 bg-clip-text text-transparent text-3xl opacity-80 font-bold font-mono hover:shadow-xl hover:shadow-emerald-300/50
 p-2 rounded-2xl">Uniator</span>



          <div className="hidden md:flex space-x-5 bg-gradient-to-br from-yellow-500 to-red-600 bg-clip-text text-transparent text-lg font-bold">
            <NavLink to="/" className="hover:text-white hover:opacity-100 hover:scale-120 hover:border-b-2 hover:font-bold hover:border-blue-400">Home</NavLink>

            <NavLink to="/user-home" className="hover:text-white hover:opacity-100 hover:scale-120 hover:border-b-2 hover:font-bold hover:border-blue-400">User-Access</NavLink>


            <NavLink to="/login" className="hover:text-white hover:opacity-100 hover:scale-120 hover:border-b-2 hover:font-bold hover:border-blue-400">{isLogged ? <LogoutButton /> : "Login"}</NavLink>


            <NavLink to="/Contact" className="hover:text-white hover:opacity-100 hover:scale-120 hover:border-b-2 hover:font-bold hover:border-blue-400">Contact</NavLink>

            <NavLink to="/discussion" className="hover:text-white hover:opacity-100 hover:scale-120 hover:border-b-2 hover:font-bold hover:border-blue-400">Community</NavLink>
          </div>
          <div className="">
            <ThemeSelector />
          </div>
          <div className="right-0 top-0"><ProfileIcon /></div>



          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>


      {isOpen && (
        <div className=" left-0 top-18 navbar flex-col gap-3 bg-base-100 backdrop-blur-xl fixed z-20  w-1/2 h-auto border border-gray-200/50 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 ">


                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-start border-gray-500 group relative text-white'>
                    <button onClick={(e) => setToggle("home")}
                        className='cursor-pointer flex-row'><House color='gray' size={38} strokeWidth="1.5px" />Home</button>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente ease-in border-gray-500 group relative'>
                    <button onClick={(e) => { setToggle(toggle == "categories" ? null : "categories") }}
                        className='cursor-pointer'><LayoutGrid color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Categories
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente border-gray-500 group relative'>
                    <button
                        onClick={() => setToggle(toggle === "message" ? null : "message")}
                        className='cursor-pointer'><Mail color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Messages
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-center border-gray-500 group relative'>
                    <button className='cursor-pointer'
                        onClick={() => setToggle(toggle === "search" ? null : "search")}

                    ><Search color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Search
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente border-gray-500 group relative'>
                    <button className='cursor-pointer'><Bell color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Notifications
                    </span>
                </div>

                <div className='bg-amber-500 rounded-2xl p-2 content-center justify-center items-center border-gray-500 group relative'>
                    <button onClick={(e) => { setToggle(toggle == "add new" ? null : "add new") }}
                        className='cursor-pointer'><Plus color='white' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add New
                    </span>
                </div>

            </div>
      )}
    </nav>
  );
};

export default Navbar;
