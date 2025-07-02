
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

  // Mock data for dashboard widgets
  const claimsData = [
    { type: "Approved Claims", count: 5, date: "June 2025", color: "bg-green-600", icon: CheckCircle },
    { type: "Pending Claims", count: 5, date: "June 2025", color: "bg-yellow-600", icon: Clock },
    { type: "Flagged Claims", count: 5, date: "June 2025", color: "bg-red-600", icon: Flag },
    { type: "Forwarded Claims", count: 5, date: "June 2025", color: "bg-purple-600", icon: ArrowUpRight },
  ];

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
      icon: AlertTriangle
    },
    {
      id: 2,
      type: "info",
      title: "Appeal Submitted for claim",
      time: "1h ago",
      icon: FileText
    },
    {
      id: 3,
      type: "message",
      title: 'Alice Smith sent message: "Review urgent..."',
      time: "1h ago",
      icon: MessageSquare
    },
    {
      id: 4,
      type: "message",
      title: 'Alice Smith sent message: "Review urgent..."',
      time: "1h ago",
      icon: MessageSquare
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
          {/* Claims Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {claimsData.map((claim, index) => {
              const IconComponent = claim.icon;
              return (
                <div 
                  key={index} 
                  className={`${claim.color} text-white p-6 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:brightness-110`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="w-7 h-7 transition-transform duration-300 ease-in-out hover:rotate-12" />
                  </div>
                  <div className="text-4xl font-bold mb-2 transition-all duration-300">{claim.count}</div>
                  <div className="text-base font-semibold opacity-95 transition-opacity duration-300 hover:opacity-100">{claim.type}</div>
                  <div className="text-sm opacity-80 mt-3 font-medium">{claim.date}</div>
                </div>
              );
            })}
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
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div key={notification.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-sm">
                    <div className={`p-1 rounded-full ${
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full bg-red-50 text-red-700 border border-red-200 py-3 px-4 rounded-xl hover:bg-red-100 transition-all duration-300 ease-in-out text-base font-semibold hover:scale-105 hover:shadow-md transform">
                Review New Claims
              </button>
              
              <button className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out text-base font-semibold hover:scale-105 hover:shadow-md transform">
                View Flagged Claims
              </button>
              
              <button className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out text-base font-semibold hover:scale-105 hover:shadow-md transform">
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPADashboard;
