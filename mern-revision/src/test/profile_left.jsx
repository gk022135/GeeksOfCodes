import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEdit,
  FaEye,
  FaHeart,
  FaFileAlt,
} from "react-icons/fa";

function ProfileLeft() {
  const userData = JSON.parse(localStorage.getItem("UserData")) || {
    name: "Gaurav Kumar",
    email: "gaurav@example.com",
    description: "Full Stack Developer passionate about web and AI.",
    location: "Delhi, India",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    skills: [],
    stats: { views: "1.2k", posts: 12, likes: 400 },
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-xl mx-auto">

        {/* ===== Profile Card ===== */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden">

          {/* ===== Header ===== */}
          <header className="relative px-6 pt-8 pb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

            <div className="relative flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg ring-4 ring-white/20">
                {userData.name.charAt(0).toUpperCase()}
              </div>

              {/* Identity */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-white">
                  {userData.name}
                </h1>

                <p className="text-sm text-white/70 break-all">
                  {userData.email}
                </p>

                <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-white/60 text-sm">
                  <FaMapMarkerAlt />
                  <span>{userData.location || "Location not set"}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ===== Body ===== */}
          <div className="px-6 py-6 space-y-8">

            {/* Bio */}
            <section className="space-y-4">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {userData.description || "No bio added yet."}
              </p>

              <button
                onClick={() => window.open("/Update", "_self")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <FaEdit />
                Edit Profile
              </button>
            </section>

            {/* Social */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white/90">Connect</h3>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={userData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
                >
                  <FaGithub className="text-lg text-white/70" />
                  <span className="text-sm text-white/70">GitHub</span>
                </a>

                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
                >
                  <FaLinkedin className="text-lg text-blue-400" />
                  <span className="text-sm text-white/70">LinkedIn</span>
                </a>
              </div>
            </section>

            {/* Skills */}
            {userData.skills?.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20 text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Stats */}
            <section className="grid grid-cols-3 gap-3">
              <Stat icon={<FaEye />} value={userData.stats.views} label="Views" />
              <Stat icon={<FaFileAlt />} value={userData.stats.posts} label="Posts" />
              <Stat icon={<FaHeart />} value={userData.stats.likes} label="Likes" />
            </section>

          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 py-4">
      <div className="text-white/80 text-lg">{icon}</div>
      <div className="text-white font-semibold text-sm">{value}</div>
      <div className="text-white/50 text-xs">{label}</div>
    </div>
  );
}

export default ProfileLeft;
