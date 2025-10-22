import { Outlet } from "react-router-dom";
import Navbar from "../AluminiesNetworks/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#0e0f12] text-gray-200 overflow-hidden">
      <Navbar />

      {/* Scrollable main content */}
      <main
        className="flex-1 h-screen overflow-y-auto px-4 sm:px-8 py-6 relative"
        style={{
          marginLeft: "16rem", // width of left sidebar
          marginRight: "20rem", // width of right sidebar
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
