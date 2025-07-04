import { Search } from "lucide-react"

export default function SearchFunction() {
    return (
        <div className=" h-screen w-screen items-center content-center justify-items-center">
            <div className="fixed top-20 left-1/4 bg-center z-10 justify-items-center h-3/4 w-2/4 border-2 border-gray-500 hover:border-blue-700 rounded-2xl p-6
            bg-black">

                <div className="relative w-1/1 flex items-center space-x-3 border-b-1 border-white/40">
                    <Search color="gray" size={30} strokeWidth="2.5px" />
                    <input
                        type="text"
                        placeholder="Search, Posts, Class or Topics"
                        className="w-full p-2 rounded-md outline-none focus:border-blue-500 text-white antialiased"
                    />
                </div>


            </div>
        </div>
    )
}
