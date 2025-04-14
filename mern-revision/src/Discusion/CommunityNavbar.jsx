import { MdOutlineSearch } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { BiSolidNotification } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { TfiMenuAlt } from "react-icons/tfi";
import { useState } from "react";

import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";
import { PiLessThanLight } from "react-icons/pi";



function CommunityNavbar({ fun }) {
    const [isOpen, setIsOpen] = useState(false);

    function clickHandler(params) {
        console.log("helo ",params)
        fun(params);
    }

    const menuItems = [
        { label: "All Posts", value: "all-posts" },
        { label: "Last Hours", value: "last-hours" },
        { label: "Your Posts", value: "Your-all-posts" },
        { label: "Make A Post", value: "make-posts" },
    ];

    return (
        <div className="relative flex flex-col  bg-base-100 90 text-white">
            {/* Left Most div */}
            <div className=" flex w-1/1 justify-between border-b border-gray-400">
                <div className="relative flex justify-center items-center gap-1 m-2 p-1 text-2xl">
                    Uniator
                </div>

                {/* Middle div  Search */}
                <div className="relative flex justify-center items-center gap-1 bg-gray-800 text-white rounded-2xl m-2 p-1">
                    <MdOutlineSearch size={30} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-white bg-gray-800 p-1 sm:w-auto w-2"
                    />
                </div>

                {/* Right Most Div */}
                <div className="flex w-auto sm:w-1/4 justify-evenly items-center text-white rounded-2xl m-2 p-1 gap-3">
                    {/* Message section */}
                    <div className="relative inline-block group">
                        <span className="z-2 absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                            Message
                        </span>
                        <LuMessagesSquare size={30} color="white" />
                    </div>

                    {/* Add Post Section */}
                    <div className="relative inline-block group hover:cursor-pointer">
                    <a href="/discussion/makepost"><GrAddCircle size={30} color="white" /> </a>
                        <span className="z-20 absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                          Add Post
                        </span>
                        
                    </div>

                    {/* Notification Section */}
                    <div className="relative inline-block group">
                        <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            23
                        </p>
                        <span className="z-20 absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                            Notification
                        </span>
                        <BiSolidNotification size={30} color="white" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CommunityNavbar;
