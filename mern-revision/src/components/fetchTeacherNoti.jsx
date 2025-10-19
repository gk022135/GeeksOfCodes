import React, { useEffect, useState } from "react";

export default function TeacherNotifications({ email }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:3000/mern-revision/v1/get/teacher-notifications/${email}`);
      const data = await res.json();
      setNotifications(data.notifications || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Load on mount and refresh every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content transition-all">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Notifications for {email}
      </h1>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500">No notifications found.</div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="card shadow-lg bg-base-200 hover:bg-base-300 transition-all"
            >
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-primary">
                  {notif.heading}
                </h2>
                <p>{notif.description}</p>
                <p className="text-sm opacity-60">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
