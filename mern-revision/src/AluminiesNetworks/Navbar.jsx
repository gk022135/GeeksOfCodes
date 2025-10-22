import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Calendar,
  Bell,
  Menu,
  X,
  PlusCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [active, setActive] = useState("aluminies");
  const navigate = useNavigate();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "network", icon: Users, label: "Connections", path: "/network" },
    { id: "jobs", icon: Briefcase, label: "Jobs", path: "/jobs" },
    { id: "events", icon: Calendar, label: "Events", path: "/aluminies" },
    { id: "messages", icon: MessageSquare, label: "Messages", path: "/messages" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  const handleNavClick = (id, path) => {
    setActive(id);
    setIsDrawerOpen(false);
    navigate(path);
  };

  const NavButton = ({ item, showLabel = false }) => (
    <button
      onClick={() => handleNavClick(item.id, item.path)}
      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors ${
        active === item.id
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-gray-800"
      }`}
    >
      <item.icon size={22} strokeWidth={1.5} />
      {showLabel && <span className="text-white text-lg font-medium">{item.label}</span>}
    </button>
  );

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden sm:flex fixed top-0 left-0 h-full w-64 bg-[#0e0f12] border-r border-gray-800 flex-col z-30">
        <div className="p-5 flex items-center gap-3 border-b border-gray-800">
          <span className="text-blue-500 text-2xl">🎓</span>
          <h1 className="text-xl font-semibold text-white">Alumni Network</h1>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.id} item={item} showLabel={true} />
          ))}
        </nav>

        <div className="px-3 pb-6">
          <button
            onClick={() => handleNavClick("create-post", "/create-post")}
            className="bg-blue-600 w-full py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
          >
            <PlusCircle size={18} /> Post Update
          </button>
        </div>
      </aside>

      {/* --- Mobile Menu Button --- */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-black/90 backdrop-blur-lg p-3 rounded-2xl border border-gray-200/20 shadow-lg"
      >
        {isDrawerOpen ? (
          <X color="white" size={26} strokeWidth={1.5} />
        ) : (
          <Menu color="white" size={26} strokeWidth={1.5} />
        )}
      </button>

      {/* --- Mobile Drawer Overlay --- */}
      {isDrawerOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* --- Mobile Drawer --- */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-72 bg-[#0e0f12] border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-bold">Menu</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X color="white" size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavButton key={item.id} item={item} showLabel={true} />
            ))}

            <div className="bg-blue-600 rounded-2xl p-3 mt-4 hover:bg-blue-500 transition-colors cursor-pointer">
              <button
                onClick={() => handleNavClick("create-post", "/create-post")}
                className="flex items-center gap-3 w-full"
              >
                <PlusCircle color="white" size={24} strokeWidth={1.5} />
                <span className="text-white text-lg font-semibold">Post Update</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Fixed Right Sidebar --- */}
      <aside className="hidden xl:flex fixed top-0 right-0 h-full w-80 p-6 space-y-6 bg-[#0e0f12] border-l border-gray-800 z-20 overflow-y-auto">
        <div>
          <h2 className="font-semibold mb-3 text-lg text-white">Upcoming Events</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <p>🎤 Alumni Talk: Tech in 2030</p>
            <p>🎓 Reunion Meetup — Class of 2015</p>
            <p>🏢 Career Fair: Global Startups</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3 text-lg text-white">Trending Jobs</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <p>💼 Software Engineer — Google</p>
            <p>🌐 Product Manager — Meta</p>
            <p>📈 Data Analyst — Stripe</p>
          </div>
        </div>
      </aside>
    </>
  );
}
