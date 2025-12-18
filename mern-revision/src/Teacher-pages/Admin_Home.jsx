import { FaChalkboardTeacher, FaPlusCircle, FaClipboardList, FaArchive, FaChartLine, FaUsers } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";

function AdminHome() {
  const stats = [
    { label: "Total Classes", value: "12", color: "text-blue-200" },
    { label: "Active Students", value: "248", color: "text-success" },
    { label: "Today's Attendance", value: "92%", color: "text-info" },
    { label: "Pending Tasks", value: "5", color: "text-warning" },
  ];

  const cards = [
    {
      title: "All Classes",
      to: "/teacher/all-class",
      icon: <FaChalkboardTeacher size={32} />,
      description: "View and manage all your classes",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Create Class",
      to: "/teacher/create-class",
      icon: <FaPlusCircle size={32} />,
      description: "Set up a new class quickly",
      color: "bg-success/10 text-success"
    },
    {
      title: "Attendance",
      to: "/teacher/attendance",
      icon: <FaClipboardList size={32} />,
      description: "Track student attendance records",
      color: "bg-info/10 text-info"
    },
    {
      title: "Resources",
      to: "/teacher/add-resource",
      icon: <FaArchive size={32} />,
      description: "Upload and manage study materials",
      color: "bg-warning/10 text-warning"
    },
    {
      title: "Notifications",
      to: "/teacher/notifications",
      icon: <MdNotificationsActive size={32} />,
      description: "Send alerts to students",
      color: "bg-error/10 text-error"
    },
    {
      title: "Analytics",
      to: "/teacher/analytics",
      icon: <FaChartLine size={32} />,
      description: "View performance insights",
      color: "bg-secondary/10 text-secondary"
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-base-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-base-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl text-yellow-400 sm:text-3xl lg:text-4xl font-bold text-base-content">
                Welcome to <span className="text-primary text-red-500">Teacher Dashboard</span>
              </h1>
              <p className="text-base-content/70 mt-2 text-sm sm:text-base">
                Your Ultimate Class Management Hub
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12 h-12 sm:w-14 sm:h-14">
                  <span className="text-xl">T</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-base-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
              <p className="text-base-content/60 text-xs sm:text-sm mb-1 sm:mb-2">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-4 sm:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-base-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-base-300">
          <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-4 sm:mb-6">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            <ActivityItem 
              icon={<FaUsers className="text-primary" />}
              title="New student enrolled in CS101"
              time="5 minutes ago"
            />
            <ActivityItem 
              icon={<FaClipboardList className="text-success" />}
              title="Attendance marked for Math 202"
              time="1 hour ago"
            />
            <ActivityItem 
              icon={<FaArchive className="text-warning" />}
              title="New resource uploaded"
              time="3 hours ago"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function DashboardCard({ title, to, icon, description, color }) {
  return (
    <a
      href={to}
      className="group bg-base-100 border border-base-300 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 block"
    >
      <div className="flex flex-col h-full">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        
        <h3 className="font-bold text-lg sm:text-xl text-base-content mb-2">
          {title}
        </h3>
        
        <p className="text-base-content/60 text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex text-white items-center font-medium text-sm group-hover:gap-2 transition-all ">
          <span className="text-blue-800">Open</span>
          <BiRightArrowAlt size={20} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

function ActivityItem({ icon, title, time }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-base-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base-content font-medium text-sm sm:text-base truncate">{title}</p>
        <p className="text-base-content/60 text-xs sm:text-sm mt-1">{time}</p>
      </div>
    </div>
  );
}

export default AdminHome;