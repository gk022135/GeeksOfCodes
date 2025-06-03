import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

function ProfileLeft() {
    const userData = JSON.parse(localStorage.getItem("UserData1")) || {
        name: "garav Kumar",
        email: "gaurav@example.com",
        description: "Full Stack Developer passionate about web and AI.",
        location: "Delhi, India",
        github: "https://github.com/gk022135@",
        linkedin: "https://linkedin.com/in/gaurav",
        skills: ["React", "Node.js", "Tailwind", "Python"],
        stats: { views: "1.2k", posts: 12, likes: 400 },
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-base-100 rounded-2xl shadow-md w-full max-w-2xl mx-auto text-white text-sm">
            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24  bg-gray-200" />
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-semibold">{userData.name}</h1>
                    <p className="text-gray-500">{userData.email}</p>
                </div>
            </div>

            {/* Description & Edit */}
            <div className="mt-6 flex-row justify-between items-start gap-4">
                <p className="text-gray-700">{userData.description}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition w-full">
                    Edit Profile
                </button>
            </div>

            {/* Links Section */}
            <div className="mt-6 border-t-1 flex-row gap-4 text-gray-600">
                <div className="flex items-center m-1">
                    <FaMapMarkerAlt />
                    <p>{userData.location}</p>
                </div>
                <div className="flex items-center m-1 gap-2">
                    <FaGithub />
                    <a
                        href={userData.github}
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
                <div className="flex items-center m-1 gap-2">
                    <FaLinkedin />
                    <a
                        href={userData.linkedin}
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6 flex-row">
                <h2 className="text-lg font-semibold mb-2 border-b-1">Languages & Skills</h2>
                <div className="grid grid-cols-2 flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>

                    ))}
                </div>
            </div>

            {/* Community Stats */}
            <div className="mt-6 flex-row">
                <h2 className="text-lg font-semibold border-b pb-1 mb-3">
                    Community Stats
                </h2>
                <div className="flex-row gap-4  text-gray-700">
                    <div className="flex-col">
                        <p className="text-sm">Views  <span className="text-sm font-bold">{userData.stats.views}</span></p>

                    </div>
                    <div className="flex-col">
                        <p className="text-sm">Posts <span className="text-sm font-bold">{userData.stats.posts}</span></p>

                    </div>
                    <div className="flex-col">
                        <p className="text-sm">Likes <span className="text-sm font-bold">{userData.stats.likes}</span></p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;

// This component is a simple profile sidebar for a user dashboard.
// It includes an avatar, user information, and links to profile, settings, and logout.
// The component is styled with CSS classes for layout and appearance.
