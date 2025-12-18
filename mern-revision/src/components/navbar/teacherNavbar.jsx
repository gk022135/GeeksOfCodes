import { useState } from "react";
import {
    FaChalkboardTeacher,
    FaPlusCircle,
    FaClipboardList,
    FaMapMarkedAlt,
    FaArchive,
    FaBars,
    FaTimes,
    FaUserCircle,
} from "react-icons/fa";
import { MdNotificationsActive, MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import ThemeSelector from "../../themectrl";

export default function TeacherNavbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

    const navItems = [
        { to: "/teacher", label: "Dashboard", icon: <MdDashboard size={22} /> },
        { to: "/teacher/all-class", label: "All Classes", icon: <FaChalkboardTeacher size={20} /> },
        { to: "/teacher/create-class", label: "Create Class", icon: <FaPlusCircle size={20} /> },
        { to: "/teacher/attendance", label: "Attendance", icon: <FaClipboardList size={20} /> },
        { to: "/teacher/set-location", label: "Location", icon: <FaMapMarkedAlt size={20} /> },
        { to: "/teacher/add-resource", label: "Resources", icon: <FaArchive size={20} /> },
        { to: "/teacher/notifications", label: "Notifications", icon: <MdNotificationsActive size={22} /> },
    ];

    return (
        <>
            {/* ================= TOP BAR ================= */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-base-100 border-b border-base-300 shadow-sm z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="lg:hidden btn btn-ghost btn-sm btn-circle"
                        aria-label="Open menu"
                    >
                        <FaBars size={20} />
                    </button>

                    {/* Desktop Collapse Button */}
                    <button
                        onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
                        className="hidden lg:flex btn btn-ghost btn-sm btn-circle"
                        aria-label="Toggle sidebar"
                    >
                        <FaBars size={20} />
                    </button>

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                            <span className="text-red-500 font-bold">GFC</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-white antialiased text-3xl p-10">
                                <span className="text-yellow-400 antialiased font-bold">Teachers Pannel</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <button className="btn btn-ghost btn-sm btn-circle">
                        <div className="indicator">
                            <MdNotificationsActive size={20} />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                            <div className="w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <FaUserCircle className="text-primary" size={24} color="white"/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-50 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                            <li className="menu-title">
                                <a href="/teacher/profile">
                                    <span>Teacher Account</span>
                                </a>
                            </li>
                            <li><a>Profile Settings</a></li>
                            <li><a>Preferences</a></li>
                            <div className="divider my-0"></div>
                            <li>
                                <a className="text-error">
                                    <BiLogOut size={16} />
                                    Logout
                                </a>
                            </li>
                        </ul>
                        <ThemeSelector />
                    </div>
                </div>
            </header>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside
                className={`hidden lg:flex fixed top-16 left-0 h-[calc(100vh-4rem)] bg-base-100 border-r border-base-300 flex-col z-30 transition-all duration-300 shadow-sm
                    ${isDesktopCollapsed ? 'w-20' : 'w-72'}`}
            >
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            {...item}
                            collapsed={isDesktopCollapsed}
                        />
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className={`p-4 border-t border-base-300 ${isDesktopCollapsed ? 'hidden' : 'block'}`}>
                    <div className="bg-primary/10 rounded-xl p-3">
                        <p className="text-sm font-semibold text-primary mb-1">Need Help?</p>
                        <p className="text-xs text-base-content/60">Check our documentation</p>
                    </div>
                </div>
            </aside>

            {/* ================= MOBILE OVERLAY ================= */}
            {drawerOpen && (
                <div
                    onClick={() => setDrawerOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                />
            )}

            {/* ================= MOBILE DRAWER ================= */}
            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-base-100 z-50 shadow-2xl transform transition-transform duration-300 lg:hidden
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-base-300 bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                            <FaChalkboardTeacher className="text-primary-content" size={22} />
                        </div>
                        <div>
                            <h2 className="font-bold text-base">Teacher Hub</h2>
                            <p className="text-xs text-base-content/60">Navigation Menu</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Drawer Navigation */}
                <nav className="p-3 space-y-2 overflow-y-auto h-[calc(100%-4rem)]">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            {...item}
                            onClick={() => setDrawerOpen(false)}
                        />
                    ))}

                    <div className="divider"></div>

                    {/* Additional Actions */}
                    <a href="/teacher/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base-content hover:bg-base-200 transition-colors font-medium">
                        <FaUserCircle size={20} />
                        <span>Profile</span>
                    </a>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-colors font-medium">
                        <BiLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>
        </>
    );
}

/* ========== Reusable Nav Item ========== */
function NavItem({ to, label, icon, onClick, collapsed = false }) {
    // Mock active state - replace with actual NavLink logic
    const isActive = window.location.pathname === to;

    return (
        <a
            href={to}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                    : "text-base-content hover:bg-base-200 hover:shadow-md"
                }
                ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : ''}
        >
            <span className={`flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                {icon}
            </span>
            {!collapsed && <span className="truncate">{label}</span>}
        </a>
    );
}
