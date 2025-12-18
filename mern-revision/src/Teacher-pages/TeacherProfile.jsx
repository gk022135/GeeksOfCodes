import { useState, useEffect } from "react";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaBuilding, 
  FaShieldAlt, 
  FaEdit, 
  FaSave,
  FaTimes,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaAward,
  FaUsers,
  FaPhone,
  FaBook
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    message: "",
    phone: "",
    bio: "",
    specialization: "",
  });

  const [editForm, setEditForm] = useState(teacherData);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("UserData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userData = {
        name: parsedData.name || "Teacher Name",
        email: parsedData.email || "teacher@example.com",
        department: parsedData.Department || parsedData.department || "Not Set",
        role: parsedData.role || "Teacher",
        message: parsedData.message || "",
        phone: parsedData.phone || "Not provided",
        bio: parsedData.bio || "No bio available",
        specialization: parsedData.specialization || "General Education",
      };
      setTeacherData(userData);
      setEditForm(userData);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update localStorage with new data
    const storedData = localStorage.getItem("UserData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = {
        ...parsedData,
        name: editForm.name,
        department: editForm.department,
        phone: editForm.phone,
        bio: editForm.bio,
        specialization: editForm.specialization,
      };
      localStorage.setItem("UserData", JSON.stringify(updatedData));
    }
    
    setTeacherData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(teacherData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          {/* Cover Banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary to-secondary relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Info */}
          <div className="px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-base-100 border-4 border-base-100 shadow-xl flex items-center justify-center">
                  <FaUserCircle className="text-primary w-20 h-20 sm:w-28 sm:h-28" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-success w-8 h-8 rounded-full border-4 border-base-100 flex items-center justify-center">
                  <MdVerified className="text-success-content" size={16} />
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 sm:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content flex items-center gap-2">
                      {teacherData.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="badge badge-primary badge-lg gap-2">
                        <FaShieldAlt size={14} />
                        {teacherData.role}
                      </span>
                      <span className="badge badge-outline gap-2">
                        <FaBuilding size={14} />
                        {teacherData.department}
                      </span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  {!isEditing ? (
                    <button 
                      onClick={handleEdit}
                      className="btn btn-primary gap-2 self-start sm:self-auto"
                    >
                      <FaEdit size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2 self-start sm:self-auto">
                      <button 
                        onClick={handleSave}
                        className="btn btn-success gap-2"
                      >
                        <FaSave size={16} />
                        Save
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="btn btn-ghost gap-2"
                      >
                        <FaTimes size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Message/Status */}
                {teacherData.message && (
                  <div className="alert alert-success mt-4">
                    <MdVerified size={20} />
                    <span>{teacherData.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
              <h2 className="text-xl font-bold text-base-content mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <InfoItem 
                  icon={<FaEnvelope className="text-primary" />}
                  label="Email"
                  value={teacherData.email}
                  isEditing={false}
                />
                
                <InfoItem 
                  icon={<FaPhone className="text-success" />}
                  label="Phone"
                  value={teacherData.phone}
                  isEditing={isEditing}
                  onChange={(val) => handleInputChange('phone', val)}
                />
                
                <InfoItem 
                  icon={<FaBuilding className="text-info" />}
                  label="Department"
                  value={teacherData.department}
                  isEditing={isEditing}
                  onChange={(val) => handleInputChange('department', val)}
                />
                
                <InfoItem 
                  icon={<FaShieldAlt className="text-warning" />}
                  label="Role"
                  value={teacherData.role}
                  isEditing={false}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
              <h2 className="text-xl font-bold text-base-content mb-4">Quick Stats</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <StatCard 
                  icon={<FaChalkboardTeacher className="text-primary" />}
                  value="12"
                  label="Classes"
                />
                <StatCard 
                  icon={<FaUsers className="text-success" />}
                  value="248"
                  label="Students"
                />
                <StatCard 
                  icon={<FaAward className="text-warning" />}
                  value="4.8"
                  label="Rating"
                />
                <StatCard 
                  icon={<FaBook className="text-info" />}
                  value="45"
                  label="Resources"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Section */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
              <h2 className="text-xl font-bold text-base-content mb-4">About</h2>
              
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-base-content/70 leading-relaxed">
                  {teacherData.bio}
                </p>
              )}
            </div>

            {/* Specialization */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
              <h2 className="text-xl font-bold text-base-content mb-4">Specialization</h2>
              
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Your specialization..."
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaBook className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">{teacherData.specialization}</p>
                    <p className="text-sm text-base-content/60">Primary Area of Expertise</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
              <h2 className="text-xl font-bold text-base-content mb-4">Recent Activity</h2>
              
              <div className="space-y-3">
                <ActivityItem 
                  icon={<FaChalkboardTeacher className="text-primary" />}
                  title="Created new class: Advanced BBA"
                  time="2 hours ago"
                />
                <ActivityItem 
                  icon={<FaUsers className="text-success" />}
                  title="Marked attendance for CS101"
                  time="5 hours ago"
                />
                <ActivityItem 
                  icon={<FaBook className="text-info" />}
                  title="Uploaded new study material"
                  time="1 day ago"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function InfoItem({ icon, label, value, isEditing, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-base-content/60 mb-1">{label}</p>
        {isEditing && onChange ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
        ) : (
          <p className="font-medium text-base-content break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-base-200 rounded-xl p-4 text-center">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-base-content">{value}</p>
      <p className="text-xs text-base-content/60">{label}</p>
    </div>
  );
}

function ActivityItem({ icon, title, time }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors">
      <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-base-content text-sm">{title}</p>
        <p className="text-xs text-base-content/60 mt-1">{time}</p>
      </div>
    </div>
  );
}

export default TeacherProfile;