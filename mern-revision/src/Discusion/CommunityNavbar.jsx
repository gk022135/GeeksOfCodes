import { MdOutlineSearch } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { BiSolidNotification } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";



function CommunityNavbar() {

    return (
        <div className="relative flex flex-row justify-between content-between bg-black/50 text-white">


{/* left Most div */}
            <div className="relative  flex justify-center content-center gap-1 text-white m-2 p-1 text-2xl">Uniator</div>


{/* Middle div */}
            <div className="relative  flex justify-center content-center gap-1 bg-gray-800 text-white rounded-2xl m-2 p-1">
                <MdOutlineSearch size=
                    {30} />
                <input
                    type="text"
                    placeholder="Search"
                    className="text-white bg-gray-800  p-1 sm:w-auto w-2"
                ></input>
            </div>


{/* Right Most Div */}
            <div className="flex w-auto sm:w-1/4 justify-evenly content-center bg-gray-800 text-white rounded-2xl m-2 p-1 gap-3">

            {/* Message section  */}
                <div className="relative inline-block group">
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                        message
                    </span>
                    <LuMessagesSquare size={35} color="white" />
                </div>


            {/* Add Post Section */}
                <div className="relative inline-block group">

                    <span className="absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                        Add Post
                    </span>
                    <GrAddCircle size={35} color="white" />
                </div>

            
            {/* Notification Section */}
                <div className="relative inline-block group">
                    {/* Notification Count */}
                    <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        23
                    </p>

                    {/* Tooltip */}
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition duration-300">
                        Notification
                    </span>

                    {/* Notification Icon */}
                    <div>
                        <BiSolidNotification size={35} color="white" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CommunityNavbar;