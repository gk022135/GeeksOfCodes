import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Google Auth/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeSelector from "../themectrl";
import ProfileIcon from "../ui/profileicon";
import { House, Plus, LayoutGrid, Mail, Bell, Search } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [toggle, setToggle] = useState(null); // 🔧 Added missing state

  useEffect(() => {
    const localData = localStorage.getItem("UserData");
    const data = localData ? JSON.parse(localData) : {};
    if (typeof data.success === "boolean" && data.success) {
      setLogged(true);
    }
  }, []);

  return (
    <>
      {/* Top Navbar for desktop */}
      <nav className="sticky top-0 z-10 bg-base-100 backdrop-blur-lg text-black font-medium">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <span className="bg-gradient-to-tl from-yellow-500 to-red-600 bg-clip-text text-transparent text-3xl opacity-80 font-bold font-mono hover:shadow-xl p-2 rounded-2xl">
              Uniator
            </span>

            {/* Desktop nav links */}
            <div className="hidden md:flex space-x-5 bg-gradient-to-br from-yellow-500 to-red-600 bg-clip-text text-transparent text-lg font-bold">
              <NavLink to="/" className="hover:text-white hover:border-b-2 border-blue-400">Home</NavLink>
              <NavLink to="/user-home" className="hover:text-white hover:border-b-2 border-blue-400">User-Access</NavLink>
              <NavLink to="/login" className="hover:text-white hover:border-b-2 border-blue-400">
                {isLogged ? <LogoutButton /> : "Login"}
              </NavLink>
              <NavLink to="/Contact" className="hover:text-white hover:border-b-2 border-blue-400">Contact</NavLink>
              <NavLink to="/discussion" className="hover:text-white hover:border-b-2 border-blue-400">Community</NavLink>
            </div>

            <div className="hidden md:block">
              <ThemeSelector />
            </div>
            <div className="hidden md:block">
              <ProfileIcon />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Nav for mobile */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:hidden flex flex-row items-center justify-between bg-base-100 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl px-4 py-2 w-[95%] max-w-3xl">
        {/* Nav Buttons */}
        {[
          { icon: <House color="gray" size={24} />, label: "Home", key: "home" },
          { icon: <LayoutGrid color="gray" size={24} />, label: "Categories", key: "categories" },
          { icon: <Mail color="gray" size={24} />, label: "Messages", key: "message" },
          { icon: <Search color="gray" size={24} />, label: "Search", key: "search" },
          { icon: <Bell color="gray" size={24} />, label: "Notifications", key: "notify" },
          { icon: <Plus color="white" size={24} />, label: "Add New", key: "add", className: "bg-amber-500" },
        ].map(({ icon, label, key, className = "" }) => (
          <div key={key} className={`p-2 group relative hover:rounded-2xl hover:bg-black/30 ${className}`}>
            <button
              onClick={() => setToggle(toggle === key ? null : key)}
              className="cursor-pointer flex items-center justify-center"
            >
              {icon}
            </button>
            <span className="absolute bottom-10 left-1/2 -translate-x-1/2 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
