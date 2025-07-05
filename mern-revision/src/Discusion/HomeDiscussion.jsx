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
import Makepost from "./MakePost"

import Mainnav from "../components/navbar/mainnav";

function HomeDiscussion() {
    const [selectedParam, setSelectedParam] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function handleSelection(param) {
        setSelectedParam(param);
    }

    return (
        <div className="relative flex flex-col h-auto">
            {/* Navbar */}
            <div>
                <CommunityNavbar fun={handleSelection} />
            </div>

            <Mainnav FetchAllPost = {FetchAllPost} Explore={Explore} Makepost={Makepost}/>
        </div>
    );
}

export default HomeDiscussion;
