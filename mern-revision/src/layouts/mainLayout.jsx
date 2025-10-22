import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudentAuthorise from "../Authorization/StudentAuthorise";

export default function HomeLayout() {
    return (

        <div className="flex h-screen bg-base-100 text-gray-200 overflow-hidden">
            <div className='fixed top-0 z-20 w-full'>
                <Navbar />
            </div>
            <main className="flex-1 h-full overflow-y-auto px-8 py-6">
                <Outlet /> {/* Protected content will render here */}
            </main>
        </div>
    );
}
