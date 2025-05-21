import { useState } from "react"
import PageHeader from "./components/PageHeader.jsx"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "System Update",
      message: "The system will be updated tonight at 2:00 AM EST.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Claim Approved",
      message: "Claim #12345 has been approved and processed.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Pending Review",
      message: "3 claims are pending your review.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "New Feature",
      message: "Check out our new reporting dashboard.",
      time: "3 days ago",
      read: true,
    },
  ])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={20} />
      case "info":
      default:
        return <Info className="text-blue-500" size={20} />
    }
  }

  return (
    <div className="p-6">
      <PageHeader title="Notifications" />

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Bell size={20} className="mr-2 text-blue-500" />
            <h2 className="text-lg font-medium">Your Notifications</h2>
          </div>

          <button className="text-blue-600 text-sm hover:underline" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        <div className="divide-y">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={`p-4 flex ${notification.read ? "bg-gray-50" : "bg-white"}`}>
                <div className="mr-3">{getIcon(notification.type)}</div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                  <div className="mt-2 flex">
                    {!notification.read && (
                      <button
                        className="text-xs text-blue-600 hover:underline mr-3"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No notifications to display</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
