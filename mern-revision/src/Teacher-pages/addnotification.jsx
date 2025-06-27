import { useState, useEffect } from "react";
import { Bell, Plus, Trash2, Eye, AlertCircle, MessageSquare } from "lucide-react";
import { parse } from "date-fns";

function NotificationManager(props) {
    const [data, setData] = useState({
        message: "",
        actions: "view",
        classId: "CSL2222",
        email: "sfkdf",
    });
    const [viewNoti, setViewNoti] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [error, setError] = useState("");

    const url = "http://localhost:3000/mern-revision/v1/notification";

    // Add notification handler
    const clickHandler = async () => {
        if (!data.message.trim()) {
            setError("Please enter a message");
            return;
        }
        if (data.message.trim().split(' ').length > 20) {
            setError("Message must be 20 words or less");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.success) {
                const result = await response.json();
                setData({ ...data, message: "" });
                // Optionally refresh the notifications list
                if (showNotifications) {
                    viewHandler();
                }
                // Show success message (you can replace with toast)
                console.log("Notification added successfully");
            } else {
                setError("Failed to add notification");
            }
        } catch (err) {
            setError("Network error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    // View notifications handler
    const viewHandler = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                setViewNoti(Array.isArray(result.notifications) ? result.notifications : []);
                setShowNotifications(true);
            } else {
                setError("Failed to fetch notifications");
            }
        } catch (err) {
            setError("Network error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    console.log("haan ji", viewNoti);

    // Delete notification handler
    const deleteHandler = async (notificationId) => {
        if (!notificationId) return;

        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Remove from local state
                setViewNoti(prev => prev.filter(noti => noti.id !== notificationId));
                console.log("Notification deleted successfully");
            } else {
                setError("Failed to delete notification");
            }
        } catch (err) {
            setError("Network error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setData({ ...data, message: value });

        // Clear error when user starts typing
        if (error) setError("");
    };

    const wordCount = data.message.trim().split(' ').filter(word => word.length > 0).length;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 text-white">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Bell className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-base-content">Notification Manager</h1>
                </div>
                <p className="text-base-content/70">Manage your notifications efficiently</p>
            </div>

            {/* Add Notification Section */}
            <div className="card bg-base-200 shadow-lg mb-6">
                <div className="card-body">
                    <div className="flex items-center gap-2 mb-4">
                        <Plus className="w-5 h-5 text-primary" />
                        <h2 className="card-title text-primary">Add New Notification</h2>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                            <span className={`label-text-alt ${wordCount > 20 ? 'text-error' : wordCount > 15 ? 'text-warning' : 'text-base-content/60'}`}>
                                {wordCount}/20 words
                            </span>
                        </label>
                        <textarea
                            name="message"
                            className={`textarea textarea-bordered h-24 ${wordCount > 20 ? 'textarea-error' : ''}`}
                            placeholder="Enter your notification message (max 20 words)..."
                            value={data.message}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Add Button */}
                    <div className="card-actions justify-end mt-4">
                        <button
                            className={`btn btn-primary ${loading ? 'loading' : ''}`}
                            onClick={clickHandler}
                            disabled={loading || !data.message.trim()}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />

                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* View Notifications Section */}
            <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-secondary" />
                            <h2 className="card-title text-secondary">Your Notifications</h2>
                        </div>
                        <button
                            className={`btn btn-secondary btn-sm ${loading ? 'loading' : ''}`}
                            onClick={viewHandler}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4" />
                                    {showNotifications ? 'Refresh' : 'View All'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Notifications List */}
                    {showNotifications && (
                        <div className="space-y-3">
                            {!Array.isArray(viewNoti) || viewNoti.length === 0 ? (
                                <div className="text-center py-8">
                                    <Bell className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
                                    <p className="text-base-content/60">No notifications found</p>
                                </div>
                            ) : (
                              "hi"
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificationManager;