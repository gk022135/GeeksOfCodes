import Signup from "../signup-login/Signup";

import Uniator from '../assets/image1.png'
import Connects from "./Connects";
import GridCards from "./GridLayout";


function LandingPage() {


    return (
        <div className="relative flex flex-col bg-black content-center justify-center items-center h-auto">
            <div className="flex flex-col justify-between items-center content-center">
                <h1 className="text-white antialiased text-3xl md:text-6xl p-10">
                    <span className="text-red-500 font-bold">Welcome !</span> to <span className="text-yellow-400 antialiased font-bold">Uniator</span>
                </h1>
                <h1 className="text-gray-400 text-xl antialiased  text-center md:ml-50 md:mr-50 ml-10 mr-10">A versatile web platform integrating <span className="text-yellow-300">real-time code collaboration</span>, a secure gate pass system with QR scanning, an <span className="text-pink-600">attendance tracker</span>, an <span className="text-green-500">advanced to-do</span> list with backend support, and a <span className="text-teal-300">community discussion</span> forum. It streamlines workflow, enhances security, boosts productivity, and fosters collaboration, making it an all-in-one solution for developers, students, and organizations.</h1>
            </div>

            <div className="mt-20 border border-gray-400 rounded-xl p-4 flex flex-col sm:flex-row relative w-11/12 sm:w-3/4 h-auto sm:h-[130px] justify-center sm:justify-evenly text-white text-sm antialiased bg-white/10">
                {/* Image Container */}
                <div className="relative h-20 sm:h-3/4 w-20 sm:w-1/8 m-2 text-white rounded-xl flex justify-center">
                    <img src={Uniator} className="w-full h-full rounded-2xl" alt="Uniator" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h1 className="text-lg sm:text-xl font-bold mt-3 sm:mt-5">
                        Elevate Your Learning Journey and Entry-exit Smooth
                    </h1>
                    <p className="text-gray-300 text-xs sm:text-sm">
                        Curated learning, approach-wise solutions, personalized roadmaps, expert doubt assistance, and more!
                    </p>
                </div>

                {/* Button */}
                <div className="relative flex justify-center items-center mt-4 sm:mt-0">
                    <a className="bg-pink-800 p-2 rounded-xl w-[120px] text-center" href="#">
                        Explore Us
                    </a>
                </div>
            </div>
            
            <h1 className="text-white text-5xl mt-20 font-bold antialiased">Feature's At This Application</h1>
            <GridCards />
            <Connects />



            <Signup />
        </div>
    )
}

export default LandingPage;