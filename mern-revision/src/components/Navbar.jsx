import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-black/50 backdrop-blur-lg text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="text-2xl font-semibold opacity-80">Logo</span>

        
          <div className="hidden md:flex space-x-5">
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">Dashboard</a>
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">About</a>
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">Projects</a>
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-xl hover:font-bold">Contact</a>
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
