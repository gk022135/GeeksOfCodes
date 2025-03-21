// import { useEffect, useState } from "react";
import LeafImage from '../assets/Leaf_multi.jpg';
import bellflower from '../assets/bellflower.jpg';
import flower_dune from '../assets/flower_dune.jpg';


const Design = () => {

    // useEffect(() =>{
    //    AOS.init()
    // },[])
    return (
        <>
            <div className="flex-row scroll-m-1.5">
                <div className="relative w-full h-screen">
                    {/* Background Image */}
                    

                    {/* Content Over Image */}
                    <div>
                        
                    <a href = "#sign-up" className="z-10 bg-blue-100/35  h-10 p-2 text-black font-bold m-2 fixed insert-0 right-10  bottom-0 rounded-md"
                   >For More Register Please !!</a>
                </div>
               
            </div>

            <div className="flex flex-row w-full h-screen relative">
                {/* Left Half */}

            </div>


           <div id = "sign-up" className="">

           </div>

        </div>
        </>
    )

}

export default Design;