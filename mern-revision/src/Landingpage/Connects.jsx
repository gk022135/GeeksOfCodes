import X from '../assets/X.png';
import Git from '../assets/Github.png'
import Linked from '../assets/InkedIn.png';
import Insta from '../assets/Instagram.jpeg';


function Connects() {


    return (
        <div className="flex flex-col bg-black text-white h-full justify-center content-center items-center mt-10">
            <h1 className="p-5 text-2xl text-gray-300 md:text-5xl antialiased">
                Connect With Me Community !!
            </h1>
            <div className="relative grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1 w-3/4">


                <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                    <img src={X} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                    <h1>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </h1>
                </div>


                <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                    <img src={Git} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                    <h1>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                    <img src={Linked} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                    <h1>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center w-full aspect-square bg-white/10 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:border-2 hover:border-white">
                    <img src={Insta} alt="Description" className="w-1/4 h-1/4 rounded-2xl" />
                    <h1>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </h1>
                </div>

            </div>


        </div>
    )
}

export default Connects