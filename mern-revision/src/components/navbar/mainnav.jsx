import {
  House,
  LayoutGrid,
  Mail,
  Bell,
  Search,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeSelector from "../../themectrl";

export default function Mainnav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { to: "/all-posts", icon: House, label: "Home" },
    { to: "/categories", icon: LayoutGrid, label: "Categories" },
    { to: "/messages", icon: Mail, label: "Messages" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
  ];

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      onClick={() => setIsDrawerOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
        ${isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"}`
      }
    >
      <Icon size={20} strokeWidth={1.5} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden sm:flex w-60 bg-base-100 border-r border-gray-800 flex-col">
        <a href="/">
          <div className="p-4 text-lg font-semibold">
            🟧 GeeksOfCode
          </div>
        </a>
        <div className=" text-white mx-3 mb-4 rounded-lg flex items-center justify-center gap-2">
          <ThemeSelector />
        </div>

        <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>


        <NavLink
          to="/makepost"
          className="bg-orange-600 text-white mx-3 mb-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-500"
        >
          <PlusCircle size={18} /> Create
        </NavLink>
      </aside>

      {/* ================= MOBILE MENU BUTTON ================= */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-black/90 p-3 rounded-2xl"
      >
        <Menu />
      </button>

      {/* ================= MOBILE OVERLAY ================= */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="sm:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`sm:hidden fixed top-0 left-0 h-full w-72 bg-[#141414] z-50 transform transition-transform
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button onClick={() => setIsDrawerOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <NavLink
            to="/makepost"
            onClick={() => setIsDrawerOpen(false)}
            className="bg-orange-600 text-white rounded-xl p-3 flex items-center gap-3"
          >
            <PlusCircle /> Add New
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
