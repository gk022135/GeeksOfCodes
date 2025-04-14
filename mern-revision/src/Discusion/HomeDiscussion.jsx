import { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import Posts_Cards from "./Posts_Cards";
import CommunityNavbar from "./CommunityNavbar";

import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

import { FaGreaterThan } from "react-icons/fa6";
import { PiLessThanLight } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";

import Explore from "./Explore";
import FetchAllPost from "./FetchAllPost";

function HomeDiscussion() {
    const [selectedParam, setSelectedParam] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function handleSelection(param) {
        setSelectedParam(param);
    }

    const menuItems = [
        { label: "All Posts", value: "all-posts" },
        { label: "Explore", value: "explore" },
        { label: "Your Posts", value: "your-all-posts" },
        { label: "Make A Post", value: "make-posts" },
    ];

    return (
        <div className="relative flex flex-col h-auto">
            {/* Navbar */}
            <div>
                <CommunityNavbar fun={handleSelection} />
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex relative transition-all duration-300 ease-in-out">
                {/* Sidebar (Sliding Panel) */}
                <div
                    className={`fixed relative transition-all duration-300 ${
                        isSidebarOpen ? "w-1/4 md:w-90" : "w-0 md:w-16"
                    } bg-base-100 80 text-white h-screen shadow-lg border-r-2 border-gray-400`}
                >
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute top-5 left-5 z-50 bg-base-100 80 text-white p-2 rounded-full shadow-md border "
                    >
                        {isSidebarOpen  ? (<PiLessThanLight size={25} /> ): < CiMenuBurger size={25} color="white"/>}
                    </button>

                    {/* Sidebar Content */}
                    <div className={`h-full overflow-hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                    

                        {/* Menu List */}
                        <ul className="p-6 space-y-4 mt-10">
                            {menuItems.map((item) => (
                                <li key={item.value} className="rounded text-start">
                                    <button
                                        onClick={() => handleSelection(item.value)}
                                        className="block w-full text-start rounded-xl p-2 pl-4 hover:bg-white/20"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Community Sections */}
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="border-t border-gray-400 w-3/4 ml-5 flex flex-col">
                                <h1 className="text-center m-1 font-bold text-gray-400">Create your Community</h1>
                                <button className="flex m-1 gap-2 w-full text-start rounded-xl p-2 pl-4 hover:bg-white/20">
                                    <IoMdAdd size={25} /> Create Community
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content Adjusting Dynamically */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        isSidebarOpen ? "w-3/4 md:w-full" : "ml-0 md:w-full"
                    }`}
                >
                    <div className="bg-base-100 w-full content-center items-center relative h-screen p-2 border rounded-2xl justify-center md:pl-60 overflow-y-scroll">
                        {selectedParam === null && <FetchAllPost />}

                        {selectedParam === "explore" && <Explore />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDiscussion;
