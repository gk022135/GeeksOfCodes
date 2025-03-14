import { MdOutlineSearch } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { BiSolidNotification } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { TfiMenuAlt } from "react-icons/tfi";
import { useState, useEffect } from "react";

function CommunityNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-row justify-between bg-black/90 text-white">

            {/* Left Most div */}
            <div className="relative flex justify-center items-center gap-1 m-2 p-1 text-2xl">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <TfiMenuAlt />
                </button>
                Uniator
            </div>

            {/* Middle div  Search*/}
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
                <div className="relative inline-block group">
                    <span className="z-20 absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                        Add Post
                    </span>
                    <GrAddCircle size={30} color="white" />
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

            {/* Sliding Side Panel */}


            <div
                className={`fixed top-30 left-0 h-full w-1/4 bg-gray-900 text-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <button
                    className="absolute top-4 right-4 text-xl"
                    onClick={() => setIsOpen(false)}
                >
                    ✖
                </button>
                <ul className="p-6 space-y-4 mt-8">
                    <li className="hover:bg-gray-700 p-2 rounded">Profile</li>
                    <li className="hover:bg-gray-700 p-2 rounded">Profile</li>
                    <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
                    <li className="hover:bg-gray-700 p-2 rounded">Logout</li>
                </ul>
            </div>

        </div>
    );
}

export default CommunityNavbar;
