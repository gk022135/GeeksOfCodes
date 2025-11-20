import {
  House,
  Plus,
  LayoutGrid,
  Mail,
  Bell,
  Search,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import SearchFunction from "./search";
import { useState } from "react";
import CollaborativeEditorLanding from "../../Landingpage/part2";
import CategoryCards from "./categories";
import MakePosts from "../make-post";
import FetchAllPost from "../../Discusion/FetchAllPost";
import FetchUserNameEmail from "../../chat/user-sidebar";

export default function Mainnav({ FetchAllPost2, Explore, Makepost }) {
  const [toggle, setToggle] = useState("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { id: "home", icon: House, label: "Home" },
    { id: "categories", icon: LayoutGrid, label: "Categories" },
    { id: "message", icon: Mail, label: "Messages" },
    { id: "search", icon: Search, label: "Search" },
    { id: "notifications", icon: Bell, label: "Notifications" },
  ];

  const handleNavClick = (itemId) => {
    setToggle(itemId);
    setIsDrawerOpen(false);
  };

  const NavButton = ({ item, showLabel = false }) => (
    <div
      className={`group relative flex flex-col items-center ${
        showLabel ? "w-full mb-2" : ""
      }`}
    >
      <button
        onClick={() => handleNavClick(item.id)}
        className="flex items-center justify-start gap-3 text-left w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <item.icon
          color={toggle === item.id ? "white" : "gray"}
          size={24}
          strokeWidth={1.5}
        />
        {showLabel && (
          <span className="text-white text-lg font-medium">{item.label}</span>
        )}
      </button>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-base-100 text-gray-200 overflow-hidden relative">
      {/* --- Fixed Left Sidebar --- */}
      <aside className="hidden sm:flex fixed top-0 left-0 h-full w-60 bg-base-100 flex-col border-r border-gray-800 z-20">
        <div className="p-4 text-lg font-semibold flex items-center gap-2">
          <span className="text-orange-500">🟧</span> CodeX Community
        </div>

        <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                toggle === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} strokeWidth={1.5} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => setToggle("add new")}
          className="bg-orange-600 text-white font-medium mx-3 mb-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-500"
        >
          <PlusCircle size={18} /> Create
        </button>
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
        className={`sm:hidden fixed top-0 left-0 h-full w-72 bg-[#141414] border-r border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${
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

            <div className="bg-orange-600 rounded-2xl p-3 mt-4 hover:bg-orange-500 transition-colors cursor-pointer">
              <button
                onClick={() => handleNavClick("add new")}
                className="flex items-center gap-3 w-full"
              >
                <Plus color="white" size={24} strokeWidth={1.5} />
                <span className="text-white text-lg font-semibold">Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Scrollable Content --- */}
      <main
        className="flex-1 h-screen overflow-y-auto px-4 sm:px-8 py-6 mx-auto relative bg-base-100"
        style={{
          marginLeft: "15rem", // same width as left sidebar
          marginRight: "20rem", // same width as right sidebar
        }}
      >
        <div className="rounded-2xl p-6 min-h-[100vh]">
          {toggle === "search" && <SearchFunction />}
          {toggle === "home" && <FetchAllPost />}
          {toggle === "categories" && <CategoryCards />}
          {toggle === "add new" && <MakePosts />}
          {toggle === "message" && <FetchUserNameEmail />}
          {toggle === "posts" && <FetchAllPost />}
        </div>
      </main>

      {/* --- Fixed Right Sidebar --- */}
      <aside className="hidden xl:flex fixed top-0 right-0 h-full w-80 p-6 space-y-6 bg-base-100 border-l border-gray-800 z-20 overflow-y-auto">
        <div>
          <h2 className="font-semibold mb-3 text-lg">Up next</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <p>📘 Webhooks — The Push-Based Design Behind Async Communication</p>
            <p>⚙️ Scaling the Load Balancer Layer: From Bottleneck to Battle-Ready</p>
            <p>💬 How to Handle Bad Interviewers</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3 text-lg">Trending</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <p>🚨 AWS outage hits Coinbase</p>
            <p>🗞️ Trump pardons controversy intensifies</p>
            <p>⚾ Blue Jays reach World Series</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
