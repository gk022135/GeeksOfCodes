import Signup from "../signup-login/Signup";


function LandingPage() {


    return (
        <div className="relative flex flex-col bg-black content-center justify-center items-center h-auto">
            <div className="flex flex-col justify-between items-center content-center">
                <h1 className="text-white antialiased text-3xl md:text-6xl p-10">
                    <span className="text-red-500 font-bold">Welcome !</span> to <span className="text-yellow-400 antialiased font-bold">Uniator</span>
                </h1>
                <h1 className="text-gray-400 text-xl antialiased  text-center md:ml-50 md:mr-50 ml-10 mr-10">A versatile web platform integrating <span className="text-yellow-300">real-time code collaboration</span>, a secure gate pass system with QR scanning, an <span className="text-pink-600">attendance tracker</span>, an <span className="text-green-500">advanced to-do</span> list with backend support, and a <span className="text-teal-300">community discussion</span> forum. It streamlines workflow, enhances security, boosts productivity, and fosters collaboration, making it an all-in-one solution for developers, students, and organizations.</h1>
            </div>
             
             <div>
                
             </div>


            <Signup />
        </div>
    )
}

export default LandingPage;