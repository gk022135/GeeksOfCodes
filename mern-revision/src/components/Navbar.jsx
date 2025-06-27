import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import Logout from "./Logout";
import LogoutButton from "../Google Auth/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeSelector from "../themectrl";
import ProfileIcon from "../ui/profileicon";

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
      <div className="md:hidden bg-base-100 5 flex flex-col items-center space-y-4 py-4">
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
