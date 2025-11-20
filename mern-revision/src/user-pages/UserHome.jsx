import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Code, LogOut, Users, Calendar, QrCode, CheckSquare, MessageCircle, Activity, Bell, Settings, Search, SquareArrowRight } from 'lucide-react';

import Todo_Page from "./Todo_redir";
import { NavLink, useNavigate } from 'react-router-dom';


const UserHome = () => {
    const navigate = useNavigate();
    const [clickType, setClickType] = useState(null);
    const [activeClasses, setActiveClasses] = useState(0);

    const [userInfo, setUserInfo] = useState(() => {
        const dataFromLocalStorage = localStorage.getItem("UserData");
        setActiveClasses(localStorage.getItem("activeClasses"))
        return dataFromLocalStorage
            ? JSON.parse(dataFromLocalStorage)
            : {
                name: "Gaurav KLumar",
                email: "22bcs037@smvdu.ac.in",
                role: "Student",
                picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            };
    });

    useEffect(() => {
        // If you want to fetch or update user data from an API, do it here.
        // setUserInfo(fetchedUserData);
    }, []);

    const clickHandler = (type) => {
        setClickType(prev => prev === type ? null : type);
    };

    // Dashboard items configuration
    const mainFeatures = [
        {
            id: 'qr-scanner',
            title: 'G1/G2 Entries',
            description: 'Scan QR codes for gate access',
            icon: QrCode,
            color: 'from-purple-500 to-pink-500',
            url: '/qrscanner'
        },
        {
            id: 'attendance',
            title: 'Mark Attendance',
            description: 'Track your class attendance',
            icon: CheckSquare,
            color: 'from-green-500 to-emerald-500',
            url: '/all-classes-student'
        },
        {
            id: 'classes',
            title: 'All Available Classes',
            description: 'Browse all your courses',
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            url: '/all-classes'
        }
    ];

    const sidebarItems = [
        {
            id: 'code-editor',
            title: 'Monaic Code',
            description: 'VS-Code editor for real-time collaboration',
            icon: Code,
            color: 'from-orange-500 to-red-500',
            url: '/code-editor'
        },
        {
            id: 'profile',
            title: 'Profile',
            description: 'View and edit your profile',
            icon: User,
            color: 'from-indigo-500 to-purple-500',
            url: '/User-profile'
        },
        {
            id: 'logout',
            title: 'Logout',
            description: 'Sign out of your account',
            icon: LogOut,
            color: 'from-red-500 to-pink-500',
            url: '/logout'
        }
    ];

    const FloatingShape = ({ className }) => (
        <div className={`absolute rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-pulse ${className}`} />
    );

    const FeatureCard = ({ feature, onClick }) => (
        <div
            className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
            onClick={() => onClick(feature.id)}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

            <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
                <a className=' ' href={feature.url}>{<ChevronRight color='green' size={30} />}</a>
            </div>

            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-300" />
        </div>
    );

    const SidebarCard = ({ item, isActive }) => (
        <div
            className={`relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${isActive ? 'bg-white/20 border-2 border-white/30' : 'bg-white/10 border border-white/20 hover:bg-white/15'
                }`}
            onClick={() => clickHandler(item.id)}
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    <p className="text-gray-300 text-xs mt-1">{item.description}</p>
                    <a href={item.url} >{<SquareArrowRight size={30} color='pink' />}</a>
                </div>
            </div>
        </div>
    );

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-300 text-sm">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <FloatingShape className="w-72 h-72 top-10 -left-36 animate-bounce" />
            <FloatingShape className="w-96 h-96 top-1/2 -right-48 animate-pulse" />
            <FloatingShape className="w-64 h-64 bottom-10 left-1/3 animate-bounce" />

            {/* Header */}
            <div className="relative z-10 text-center py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-white">Hello! </span>
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Student</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        How's Your Class Going?
                    </h2>
                    <h3 className="text-2xl font-semibold text-white mb-8">
                        Your <span className="text-red-500">Ultimate</span> Utility Hub!
                    </h3>
                    {/* <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Welcome to <span className="text-yellow-400 font-semibold text-2xl">Uniator</span>,
                        a versatile web platform integrating real-time code collaboration, secure gate pass system
                        with QR scanning, attendance tracker, advanced to-do list with backend support, and community
                        discussion forum - making it an all-in-one solution for students and organizations.
                    </p> */}
                </div>
            </div>

            {/* Main Dashboard */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src={userInfo.picture}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                                />
                                <div>
                                    <h3 className="font-semibold text-white">{userInfo.name}</h3>
                                    <p className="text-gray-300 text-sm">{userInfo.role === "normal-user" ? "Student" : "user"}({userInfo.StudentDepAndYear})</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {sidebarItems.map((item) => (
                                    <SidebarCard
                                        key={item.id}
                                        item={item}
                                        isActive={clickType === item.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mainFeatures.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    onClick={clickHandler}
                                />
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard
                                title="Classes Today"
                                value={activeClasses}
                                icon={Calendar}
                                color="from-blue-500 to-cyan-500"
                            />
                            <StatCard
                                title="Attendance Rate"
                                value="94%"
                                icon={CheckSquare}
                                color="from-green-500 to-emerald-500"
                            />
                        </div>

                        {/* Recent Activities */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <Activity className="w-5 h-5 mr-2" />
                                Recent Activities
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { action: "Attended Data Structures class", time: "2 hours ago" },
                                    { action: "Completed Python assignment", time: "5 hours ago" },
                                    { action: "Joined study group discussion", time: "1 day ago" }
                                ].map((activity, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                        <span className="text-white text-sm">{activity.action}</span>
                                        <span className="text-gray-400 text-xs">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                    onClick={() => navigate('/todo-home')}
                                >
                                    New Todo
                                </button>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                                    onClick={() => {
                                        navigate('/upload-pyq')
                                    }}
                                >
                                    Previous Year
                                </button>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                                    onClick={() => {
                                        navigate('/discussion')
                                    }}
                                >
                                    Join Forum
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <Bell className="w-5 h-5 mr-2" />
                                Notifications
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-white text-sm">New assignment posted</p>
                                    <p className="text-gray-400 text-xs">Math 101 - Due tomorrow</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-white text-sm">Class cancelled</p>
                                    <p className="text-gray-400 text-xs">Physics Lab - Today 2 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <button className="w-full flex items-center justify-center space-x-2 text-white hover:text-gray-300 transition-colors"
                                onClick={() => {
                                    navigate('/setting')
                                }}>
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;