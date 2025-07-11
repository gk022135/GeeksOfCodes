import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEdit, FaEye, FaHeart, FaFileAlt } from "react-icons/fa";

function ProfileLeft() {
    const userData = JSON.parse(localStorage.getItem("UserData")) || {
        name: "Gaurav Kumar",
        email: "gaurav@example.com",
        description: "Full Stack Developer passionate about web and AI.",
        location: "Delhi, India",
        github: "https://github.com/gk022135@",
        linkedin: "https://linkedin.com/in/gaurav",
        skills: [],
        stats: { views: "1.2k", posts: 12, likes: 400 },
    };

    return (
        <div className="min-h-screen bg-bas p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-md mx-auto lg:max-w-lg xl:max-w-xl">
                {/* Main Profile Card */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/25">

                    {/* Header Section with Avatar */}
                    <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-6 sm:p-8">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            {/* Enhanced Avatar */}
                            <div className="relative group">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg ring-4 ring-white/20 transition-all duration-300 group-hover:ring-white/40 group-hover:scale-105">
                                    {userData.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300"></div>
                            </div>

                            {/* User Info */}
                            <div className="text-center sm:text-left flex-1 break-words whitespace-normal">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent break-words whitespace-normal">
                                    {userData.name}
                                </h1>

                                <p className="text-white/70 text-sm sm:text-base mb-2 break-words whitespace-normal">
                                    {userData.email}
                                </p>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-white/60 break-words whitespace-normal">
                                    <FaMapMarkerAlt className="text-xs sm:text-sm" />
                                    <span className="text-xs sm:text-sm break-words whitespace-normal">
                                        {userData.location ? (userData.location) : ("not found")}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6 space-y-6">

                        {/* Description */}
                        <div className="space-y-3">
                            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                                {userData.description ? (userData.description) : ("-----")}
                            </p>

                            {/* Edit Profile Button */}
                            <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-purple-600 hover:to-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-xl font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-purple-500/25 flex items-center justify-center gap-2 group"

                            onClick={() => { window.open("/Update", "_self"); }}
                            >
                                <FaEdit className="group-hover:rotate-12 transition-transform duration-300" />
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                                Connect
                            </h3>

                            <div className="grid grid-cols-1 gap-2">
                                <a
                                    href={userData.github ? (userData.github) : ("------")}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                                >
                                    <FaGithub className="text-white/70 group-hover:text-white text-lg" />
                                    <span className="text-white/70 group-hover:text-white text-sm">GitHub Profile</span>
                                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>

                                <a
                                    href={userData.linkedin? (userData.linkedin) : ("-----")}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                                >
                                    <FaLinkedin className="text-white/70 group-hover:text-blue-400 text-lg" />
                                    <span className="text-white/70 group-hover:text-white text-sm">LinkedIn Profile</span>
                                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                                Skills & Technologies
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                {userData.skills && userData.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-lg text-center group hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/30 transition-all duration-300 cursor-default"
                                    >
                                        <span className="text-white/80 group-hover:text-white text-xs sm:text-sm font-medium">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Community Stats */}
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400"></div>
                                Community Stats
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-3 sm:p-4 rounded-xl border border-blue-400/20 text-center group hover:from-blue-500/30 hover:to-blue-600/20 transition-all duration-300">
                                    <FaEye className="text-blue-400 text-lg sm:text-xl mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                                    <p className="text-white font-bold text-sm sm:text-base">{userData.stats && userData.stats.views}</p>
                                    <p className="text-white/60 text-xs">Views</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-3 sm:p-4 rounded-xl border border-purple-400/20 text-center group hover:from-purple-500/30 hover:to-purple-600/20 transition-all duration-300">
                                    <FaFileAlt className="text-purple-400 text-lg sm:text-xl mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                                    <p className="text-white font-bold text-sm sm:text-base">{userData.stats && userData.stats.posts}</p>
                                    <p className="text-white/60 text-xs">Posts</p>
                                </div>

                                <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 p-3 sm:p-4 rounded-xl border border-pink-400/20 text-center group hover:from-pink-500/30 hover:to-pink-600/20 transition-all duration-300">
                                    <FaHeart className="text-pink-400 text-lg sm:text-xl mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                                    <p className="text-white font-bold text-sm sm:text-base">{userData.stats && userData.stats.likes}</p>
                                    <p className="text-white/60 text-xs">Likes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;