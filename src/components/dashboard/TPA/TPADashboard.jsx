
import React, { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  FileText, 
  CheckCircle,
  Clock,
  Flag,
  ArrowUpRight,
  MessageSquare,
  MoreHorizontal
} from "lucide-react";

const TPADashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Month");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setSelectedNotification(null);
  };

  // Mock data for dashboard widgets
  const claimsData = [
    { type: "Approved Claims", count: 24, date: "June 2025", color: "bg-green-600", icon: CheckCircle },
    { type: "Pending Claims", count: 5, date: "June 2025", color: "bg-yellow-600", icon: Clock },
    { type: "Flagged Claims", count: 6, date: "June 2025", color: "bg-red-600", icon: Flag },
    { type: "Forwarded Claims", count: 5, date: "June 2025", color: "bg-purple-600", icon: ArrowUpRight },
  ];

  // Mock data for additional summary widgets
  const fraudAlerts = {
    total: 9,
    flagged: 9
  };

  const topProvider = {
    name: "City Medical Center",
    claimCount: 18
  };

  // Mock chart data for claim volumes
  const chartData = [
    { month: "Jan", value: 150 },
    { month: "Feb", value: 400 },
    { month: "Mar", value: 800 },
    { month: "Apr", value: 550 },
    { month: "May", value: 950 },
    { month: "Jun", value: 850 },
    { month: "Jul", value: 600 },
    { month: "Aug", value: 750 },
    { month: "Sep", value: 800 },
    { month: "Oct", value: 650 },
    { month: "Nov", value: 250 },
    { month: "Dec", value: 300 },
  ];

  // Mock notifications data
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
    }
  ];

  // Risk score data for donut chart
  const riskScoreData = [
    { type: "Type 1", value: 30, color: "#f97316" },
    { type: "Type 2", value: 25, color: "#8b5cf6" },
    { type: "Type 3", value: 25, color: "#06b6d4" },
    { type: "Type 4", value: 20, color: "#f59e0b" },
  ];

  const highlights = [
    {
      text: "This week there was a decrease in flagged claims.",
      link: "See why"
    },
    {
      text: "You had 5 approved claims this week. That's a 5% increase to last month.",
      link: "See more trends"
    },
    {
      text: "There are 5 pending claims that need your attention.",
      link: "Navigate to your claims review page"
    }
  ];

  const aiSuggestions = [
    {
      text: "Check in on your pending claims. It's been 2 weeks since your last update.",
      link: "See why"
    },
    {
      text: "Your latest trends suggest you're on track to approve 3 more claims this week.",
      link: "See why"
    },
    {
      text: "Reply to Alice Smith."
    }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="w-full space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          <AlertTriangle className="w-4 h-4" />
          Alert: 2 Claims Require your attention
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Content - Claims Summary and Charts */}
        <div className="xl:col-span-3 space-y-6">
          {/* Summary Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Claims by Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Claims by Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-base font-semibold text-gray-700">Approved</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Flag className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-base font-semibold text-gray-700">Flagged</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">6</span>
                </div>
              </div>
            </div>

            {/* Fraud Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fraud Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-700">Total flagged</span>
                  <span className="text-2xl font-bold text-red-600">{fraudAlerts.total}</span>
                </div>
                <div className="text-sm text-gray-500">AI/Manual detection</div>
              </div>
            </div>

            {/* Top Providers */}
            <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Providers</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-lg font-bold text-gray-900">{topProvider.name}</div>
                  <div className="text-2xl font-bold text-blue-600">{topProvider.claimCount}</div>
                </div>
                <div className="text-sm text-gray-500">Claims processed</div>
              </div>
            </div>

            {/* Claim Volume */}
            <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Claim Volume</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-base font-semibold text-gray-700">Pending</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowUpRight className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-base font-semibold text-gray-700">Forwarded</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claim Volume Trends Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Claim Volume Trends</h3>
                <div className="flex gap-2">
                  {["Year", "Quarter", "Month"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 text-sm rounded ${
                        selectedPeriod === period
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Simple Line Chart */}
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 800 250">
                  {/* Grid lines */}
                  {[0, 200, 400, 600, 800, 1000].map((value, index) => (
                    <g key={value}>
                      <line
                        x1="60"
                        y1={220 - (value / 1000) * 180}
                        x2="760"
                        y2={220 - (value / 1000) * 180}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                      <text
                        x="45"
                        y={225 - (value / 1000) * 180}
                        className="text-xs fill-gray-500"
                        textAnchor="end"
                      >
                        {value}
                      </text>
                    </g>
                  ))}
                  
                  {/* Chart line */}
                  <polyline
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    points={chartData.map((point, index) => 
                      `${80 + (index * 55)},${220 - (point.value / maxValue) * 180}`
                    ).join(' ')}
                  />
                  
                  {/* Data points */}
                  {chartData.map((point, index) => (
                    <circle
                      key={index}
                      cx={80 + (index * 55)}
                      cy={220 - (point.value / maxValue) * 180}
                      r="4"
                      fill="#8b5cf6"
                    />
                  ))}
                  
                  {/* X-axis labels */}
                  {chartData.map((point, index) => (
                    <text
                      key={index}
                      x={80 + (index * 55)}
                      y="240"
                      className="text-xs fill-gray-500"
                      textAnchor="middle"
                    >
                      {point.month}
                    </text>
                  ))}
                </svg>
                <div className="absolute bottom-2 right-4 text-xs text-gray-500">
                  Claim Volumes 2025
                </div>
              </div>
            </div>

            {/* Risk Score Breakdown */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Risk Score Breakdown</h3>
                  <p className="text-sm text-gray-500">Risk Score Distribution</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              {/* Donut Chart */}
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {riskScoreData.map((item, index) => {
                    const total = riskScoreData.reduce((sum, d) => sum + d.value, 0);
                    const percentage = (item.value / total) * 100;
                    const circumference = 2 * Math.PI * 70;
                    const strokeDasharray = (percentage / 100) * circumference;
                    const strokeDashoffset = riskScoreData
                      .slice(0, index)
                      .reduce((offset, d) => offset - ((d.value / total) * circumference), circumference);
                    
                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${strokeDasharray} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-gray-900">Avg 24.25</div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {riskScoreData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.type}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                See more
              </button>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">
                    {highlight.text}{" "}
                    <button className="text-blue-600 hover:text-blue-800 underline">
                      {highlight.link}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">AI Smart Suggestions</h4>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm text-gray-700">
                      {suggestion.text}{" "}
                      {suggestion.link && (
                        <button className="text-blue-600 hover:text-blue-800 underline">
                          {suggestion.link}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Notifications and Quick Actions */}
        <div className="xl:col-span-1 space-y-6">
          {/* Notifications Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                  {notifications.filter(n => n.priority === 'High').length} urgent
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl transition-all duration-200 ${
                        notification.type === 'warning' ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-200' :
                        notification.type === 'info' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                        'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">{notification.title}</p>
                          <div className="flex items-center gap-2">
                            {notification.priority === 'High' && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <button 
                              onClick={() => handleNotificationClick(notification)}
                              className="p-1 rounded-lg hover:bg-blue-200 transition-all duration-200 group-hover:scale-110"
                            >
                              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        {notification.priority && (
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                            notification.priority === 'High' ? 'bg-red-100 text-red-700' :
                            notification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {notification.priority} Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                View All Notifications
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-4 rounded-xl transition-all duration-300 ease-in-out text-base font-bold hover:scale-105 hover:shadow-lg transform shadow-md relative overflow-hidden group">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Review New Claims
                </span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-4 rounded-xl transition-all duration-300 ease-in-out text-base font-bold hover:scale-105 hover:shadow-lg transform shadow-md relative overflow-hidden group">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <Flag className="w-5 h-5" />
                  View Flagged Claims
                </span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-4 rounded-xl transition-all duration-300 ease-in-out text-base font-bold hover:scale-105 hover:shadow-lg transform shadow-md relative overflow-hidden group">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Add Team Member
                </span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-4 rounded-xl transition-all duration-300 ease-in-out text-base font-bold hover:scale-105 hover:shadow-lg transform shadow-md relative overflow-hidden group">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate Report
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      {showNotificationModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    selectedNotification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    selectedNotification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <selectedNotification.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedNotification.title}</h2>
                    <p className="text-sm text-gray-500">{selectedNotification.time}</p>
                  </div>
                </div>
                <button 
                  onClick={closeNotificationModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <span className="text-2xl text-gray-400 hover:text-gray-600">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Priority Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedNotification.priority === 'High' ? 'bg-red-100 text-red-700' :
                  selectedNotification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedNotification.priority} Priority
                </span>
                {selectedNotification.priority === 'High' && (
                  <div className="flex items-center gap-1 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Requires Immediate Action</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                <p className="text-gray-700 leading-relaxed">{selectedNotification.description}</p>
              </div>

              {/* Additional Info */}
              {selectedNotification.claimIds && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Related Claims</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotification.claimIds.map((claimId) => (
                      <span key={claimId} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                        #{claimId}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNotification.sender && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">From</h3>
                  <p className="text-purple-800 font-medium">{selectedNotification.sender}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  {selectedNotification.actionRequired}
                </button>
                <button 
                  onClick={closeNotificationModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
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

export default TPADashboard;
