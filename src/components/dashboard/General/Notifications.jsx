import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashButton from "../../buttons/DashButton";

// Toast notification component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Skeleton loading component
const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="h-8 bg-gray-200 rounded w-64"></div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>

    {/* Tabs skeleton */}
    <div className="flex space-x-4 border-b">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
      ))}
    </div>

    {/* Notifications skeleton */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      ))}
    </div>
  </div>
);

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    try {
      // Load notifications from localStorage
      const storedNotifications = JSON.parse(
        localStorage.getItem("vistora_notifications") || "[]"
      );
      setNotifications(storedNotifications);
      setLoading(false);
    } catch (error) {
      console.error("Error loading notifications:", error);
      setLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    );

    setNotifications(updatedNotifications);
    localStorage.setItem(
      "vistora_notifications",
      JSON.stringify(updatedNotifications)
    );
    showToast("Notification marked as read", "success");
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "vistora_notifications",
      JSON.stringify(updatedNotifications)
    );
    showToast("All notifications marked as read", "success");
  };

  const handleDeleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "vistora_notifications",
      JSON.stringify(updatedNotifications)
    );
    showToast("Notification deleted", "success");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
      localStorage.setItem("vistora_notifications", JSON.stringify([]));
      showToast("All notifications cleared", "success");
    }
  };

  const handleAction = (notification) => {
    // Mark as read first
    handleMarkAsRead(notification.id);

    // Navigate based on notification type
    if (notification.type === "claim" && notification.claimId) {
      // Store the claim ID to highlight when navigating to claims page
      localStorage.setItem("highlightClaimId", notification.claimId);
      navigate("/dashboard/claims");
    } else if (notification.type === "task" && notification.taskId) {
      navigate("/dashboard/tasks");
    } else {
      navigate(notification.actionUrl || "/dashboard");
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return "1 month ago";
    return `${diffInMonths} months ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "claim":
        return "📋";
      case "task":
        return "📝";
      case "system":
        return "⚙️";
      case "alert":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.type === activeTab;
  });

  // Notification counts
  const notificationCounts = {
    all: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    claim: notifications.filter((n) => n.type === "claim").length,
    task: notifications.filter((n) => n.type === "task").length,
    system: notifications.filter((n) => n.type === "system").length,
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-fit flex flex-col items-start gap-0">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Notifications
          </h1>
          <p className="text-[0.9rem] text-neutral-400">
            Stay updated on claims, tasks, and system alerts
          </p>
        </div>
        <div className="flex space-x-3">
          {notificationCounts.unread === 0 ? (
            <DashButton text={"Mark All As Read"} primary={true} />
          ) : (
            <DashButton
              text={"Mark All As Read"}
              primary={true}
              action={handleMarkAllAsRead}
            />
          )}
          {notifications.length === 0 ? (
            <DashButton text={"Clear All"} secondary={true} />
          ) : (
            <DashButton
              text={"Clear All"}
              action={handleClearAll}
              secondary={true}
            />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === "all"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            All
            {notificationCounts.all > 0 && (
              <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {notificationCounts.all}
              </span>
            )}
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === "unread"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Unread
            {notificationCounts.unread > 0 && (
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                {notificationCounts.unread}
              </span>
            )}
            {activeTab === "unread" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("claim")}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === "claim"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Claims
            {notificationCounts.claim > 0 && (
              <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {notificationCounts.claim}
              </span>
            )}
            {activeTab === "claim" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("task")}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === "task"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Tasks
            {notificationCounts.task > 0 && (
              <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {notificationCounts.task}
              </span>
            )}
            {activeTab === "task" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === "system"
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            System
            {notificationCounts.system > 0 && (
              <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {notificationCounts.system}
              </span>
            )}
            {activeTab === "system" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No Notifications
            </h3>
            <p className="text-slate-600">
              {activeTab === "all"
                ? "You don't have any notifications at the moment."
                : `You don't have any ${
                    activeTab === "unread" ? "unread" : activeTab
                  } notifications.`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white border-2 rounded-2xl p-6 shadow-sm transition-all duration-200 ${
                notification.isRead
                  ? "border-slate-200"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.isRead ? "bg-slate-100" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-bold ${
                        notification.isRead ? "text-slate-900" : "text-blue-900"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {notification.priority && (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {notification.priority.toUpperCase()}
                        </span>
                      )}
                      <span className="text-sm text-slate-500">
                        {new Date(notification.timestamp).toLocaleString()} (
                        {getTimeAgo(notification.timestamp)})
                      </span>
                    </div>
                  </div>
                  <p
                    className={`mb-3 ${
                      notification.isRead ? "text-slate-600" : "text-blue-800"
                    }`}
                  >
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAction(notification)}
                        className={`text-sm font-semibold ${
                          notification.isRead
                            ? "text-blue-600 hover:text-blue-800"
                            : "text-blue-700 hover:text-blue-900"
                        }`}
                      >
                        {notification.actionText || "View Details"}
                      </button>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-sm text-slate-600 hover:text-slate-800"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
