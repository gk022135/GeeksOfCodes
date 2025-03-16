import { TfiMenuAlt } from "react-icons/tfi";


function ToggleNoti() {

    return (
        <div className="h-screen w-48 bg-gray-900 text-white flex flex-col p-4 space-y-4">
            <h2 className="text-xl font-bold">Dashboard</h2>

            <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Home</li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Profile</li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Settings</li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Logout</li>
            </ul>
        </div>
    )
}
export default ToggleNoti;


//it is just a navigation bar 