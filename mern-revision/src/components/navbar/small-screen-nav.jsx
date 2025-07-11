export default function SmallScreenNav(){
    return (
         <div className=" left-1/4 bottom-5 navbar flex-row gap-3 bg-base-100 backdrop-blur-xl fixed z-20  w-1/2 h-auto border border-gray-200/50 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 ">


                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-start border-gray-500 group relative text-white'>
                    <button onClick={(e) => setToggle("home")}
                        className='cursor-pointer flex-row'><House color='gray' size={38} strokeWidth="1.5px" />Home</button>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente ease-in border-gray-500 group relative'>
                    <button onClick={(e) => { setToggle(toggle == "categories" ? null : "categories") }}
                        className='cursor-pointer'><LayoutGrid color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Categories
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente border-gray-500 group relative'>
                    <button
                        onClick={() => setToggle(toggle === "message" ? null : "message")}
                        className='cursor-pointer'><Mail color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Messages
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-center border-gray-500 group relative'>
                    <button className='cursor-pointer'
                        onClick={() => setToggle(toggle === "search" ? null : "search")}

                    ><Search color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Search
                    </span>
                </div>

                <div className='hover:rounded-2xl hover:bg-black/30 p-2 items-cente border-gray-500 group relative'>
                    <button className='cursor-pointer'><Bell color='gray' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Notifications
                    </span>
                </div>

                <div className='bg-amber-500 rounded-2xl p-2 content-center justify-center items-center border-gray-500 group relative'>
                    <button onClick={(e) => { setToggle(toggle == "add new" ? null : "add new") }}
                        className='cursor-pointer'><Plus color='white' size={38} strokeWidth="1.5px" /></button>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add New
                    </span>
                </div>

            </div>
    )
}