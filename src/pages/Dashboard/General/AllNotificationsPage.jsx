
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  AlertTriangle, 
  FileText, 
  CheckCircle,
  Clock,
  Flag,
  ArrowUpRight,
  MessageSquare,
  ArrowLeft,
  X
} from "lucide-react";

const AllNotificationsPage = () => {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Same notifications data as in TPADashboard
  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "2 high-risk claims detected",
      time: "25m ago",
      icon: AlertTriangle,
      description: "AI fraud detection system has flagged 2 claims with high-risk patterns. Claims #12045 and #12046 require immediate review.",
      priority: "High",
      actionRequired: "Review Claims",
      claimIds: ["12045", "12046"]
    },
    {
      id: 2,
      type: "info",
      title: "Appeal Submitted for claim",
      time: "1h ago",
      icon: FileText,
      description: "Provider 'Metro Health Center' has submitted an appeal for claim #11892. The appeal contests the denial reason and provides additional documentation.",
      priority: "Medium",
      actionRequired: "Review Appeal",
      claimIds: ["11892"]
    },
    {
      id: 3,
      type: "message",
      title: 'Alice Smith sent message: "Review urgent..."',
      time: "1h ago",
      icon: MessageSquare,
      description: "Alice Smith from Claims Processing team sent: 'Review urgent - Provider Downtown Medical has submitted 15 claims in the last hour with similar patterns. Please investigate for potential fraud.'",
      priority: "High",
      actionRequired: "Reply to Message",
      sender: "Alice Smith"
    },
    {
      id: 4,
      type: "message",
      title: 'Bob Johnson sent message: "Monthly report..."',
      time: "2h ago",
      icon: MessageSquare,
      description: "Bob Johnson from Analytics team sent: 'Monthly fraud detection report is ready for review. We've identified 12 new suspicious patterns across 3 provider networks.'",
      priority: "Low",
      actionRequired: "View Report",
      sender: "Bob Johnson"
    },
    {
      id: 5,
      type: "info",
      title: "System maintenance scheduled",
      time: "3h ago",
      icon: Bell,
      description: "Scheduled system maintenance will occur this weekend from 2 AM to 6 AM EST. All services will be temporarily unavailable during this time.",
      priority: "Medium",
      actionRequired: "Acknowledge",
    },
    {
      id: 6,
      type: "warning",
      title: "Unusual claim pattern detected",
      time: "4h ago",
      icon: Flag,
      description: "Provider 'Westside Clinic' has submitted 10 identical claims within a 2-hour window. This pattern requires investigation.",
      priority: "High",
      actionRequired: "Investigate",
      claimIds: ["12050", "12051", "12052"]
    },
    {
      id: 7,
      type: "info",
      title: "New provider registration",
      time: "6h ago",
      icon: CheckCircle,
      description: "A new provider 'Sunrise Medical Group' has completed registration and is awaiting approval for network participation.",
      priority: "Low",
      actionRequired: "Review Application",
    },
    {
      id: 8,
      type: "message",
      title: 'Carol Wilson sent message: "Budget review..."',
      time: "8h ago",
      icon: MessageSquare,
      description: "Carol Wilson from Finance sent: 'The quarterly budget review is complete. Please review the claims processing cost analysis report.'",
      priority: "Medium",
      actionRequired: "View Report",
      sender: "Carol Wilson"
    }
  ];

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setSelectedNotification(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50" style={{ padding: '0.625vw' }}>
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200" style={{ padding: '0.625vw', marginBottom: '0.625vw' }}>
        <div className="flex items-center" style={{ gap: '0.625vw' }}>
          <button 
            onClick={handleGoBack}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
            style={{ padding: '0.3125vw' }}
          >
            <ArrowLeft style={{ width: '0.625vw', height: '0.625vw' }} className="text-gray-600" />
          </button>
          <div className="bg-blue-100 rounded-xl" style={{ padding: '0.3125vw' }}>
            <Bell style={{ width: '0.8333vw', height: '0.8333vw' }} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
            <p className="text-sm text-gray-600">Manage and review all your notifications</p>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: '0.3125vw' }}>
          <span className="bg-red-100 text-red-600 rounded-full text-sm font-semibold" style={{ padding: '0.2083vw 0.4167vw' }}>
            {notifications.filter(n => n.priority === 'High').length} urgent
          </span>
          <span className="bg-blue-100 text-blue-600 rounded-full text-sm font-semibold" style={{ padding: '0.2083vw 0.4167vw' }}>
            {notifications.length} total
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200" style={{ padding: '0.625vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4167vw' }}>
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div 
                key={notification.id} 
                className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md"
                style={{ padding: '0.5208vw' }}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start" style={{ gap: '0.4167vw' }}>
                  <div className={`rounded-xl transition-all duration-200 ${
                    notification.type === 'warning' ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-200' :
                    notification.type === 'info' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                    'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                  }`} style={{ padding: '0.4167vw' }}>
                    <IconComponent style={{ width: '1.4583vw', height: '1.4583vw' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between" style={{ marginBottom: '0.2083vw' }}>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                        {notification.title}
                      </h3>
                      <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                        {notification.priority === 'High' && (
                          <div className="bg-red-500 rounded-full animate-pulse" style={{ width: '0.4167vw', height: '0.4167vw' }}></div>
                        )}
                        <ArrowUpRight style={{ width: '1.0417vw', height: '1.0417vw' }} className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-blue-800 transition-colors duration-200" style={{ marginBottom: '0.3125vw' }}>
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{notification.time}</span>
                      <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                        {notification.priority && (
                          <span className={`inline-block text-xs font-medium rounded-full ${
                            notification.priority === 'High' ? 'bg-red-100 text-red-700' :
                            notification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`} style={{ padding: '0.1042vw 0.3125vw' }}>
                            {notification.priority} Priority
                          </span>
                        )}
                        {notification.claimIds && (
                          <span className="bg-blue-100 text-blue-700 text-xs font-medium rounded-full" style={{ padding: '0.1042vw 0.3125vw' }}>
                            {notification.claimIds.length} claims
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Detail Modal */}
      {showNotificationModal && selectedNotification && (
        <div className="fixed bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ inset: '0', padding: '0.4167vw' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                  <div className={`rounded-xl ${
                    selectedNotification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    selectedNotification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`} style={{ padding: '0.3125vw' }}>
                    <selectedNotification.icon style={{ width: '0.625vw', height: '0.625vw' }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedNotification.title}</h2>
                    <p className="text-sm text-gray-500">{selectedNotification.time}</p>
                  </div>
                </div>
                <button 
                  onClick={closeNotificationModal}
                  className="hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  style={{ padding: '0.2083vw' }}
                >
                  <X style={{ width: '0.625vw', height: '0.625vw' }} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '0.625vw', display: 'flex', flexDirection: 'column', gap: '0.625vw' }}>
              {/* Priority Badge */}
              <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                <span className={`rounded-full text-sm font-semibold ${
                  selectedNotification.priority === 'High' ? 'bg-red-100 text-red-700' :
                  selectedNotification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`} style={{ padding: '0.3125vw' }}>
                  {selectedNotification.priority} Priority
                </span>
                {selectedNotification.priority === 'High' && (
                  <div className="flex items-center text-red-600" style={{ gap: '0.1042vw' }}>
                    <div className="bg-red-500 rounded-full animate-pulse" style={{ width: '0.2083vw', height: '0.2083vw' }}></div>
                    <span className="text-sm font-medium">Requires Immediate Action</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl" style={{ padding: '0.4167vw' }}>
                <h3 className="font-semibold text-gray-900" style={{ marginBottom: '0.2083vw' }}>Details</h3>
                <p className="text-gray-700 leading-relaxed">{selectedNotification.description}</p>
              </div>

              {/* Additional Info */}
              {selectedNotification.claimIds && (
                <div className="bg-blue-50 rounded-xl" style={{ padding: '0.4167vw' }}>
                  <h3 className="font-semibold text-blue-900" style={{ marginBottom: '0.2083vw' }}>Related Claims</h3>
                  <div className="flex flex-wrap" style={{ gap: '0.2083vw' }}>
                    {selectedNotification.claimIds.map((claimId) => (
                      <span key={claimId} className="bg-blue-200 text-blue-800 rounded-lg text-sm font-medium" style={{ padding: '0.3125vw' }}>
                        #{claimId}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNotification.sender && (
                <div className="bg-purple-50 rounded-xl" style={{ padding: '0.4167vw' }}>
                  <h3 className="font-semibold text-purple-900" style={{ marginBottom: '0.2083vw' }}>From</h3>
                  <p className="text-purple-800 font-medium">{selectedNotification.sender}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex" style={{ gap: '0.3125vw', paddingTop: '0.4167vw' }}>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ padding: '0.3125vw 0.4167vw' }}>
                  {selectedNotification.actionRequired}
                </button>
                <button 
                  onClick={closeNotificationModal}
                  className="border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  style={{ padding: '0.3125vw 0.625vw' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNotificationsPage;
