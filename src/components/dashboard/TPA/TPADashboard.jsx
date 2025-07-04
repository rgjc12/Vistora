import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  Bell, 
  AlertTriangle, 
  FileText, 
  CheckCircle,
  Clock,
  Flag,
  ArrowUpRight,
  MessageSquare,
  MoreHorizontal,
  TrendingUp,
  Activity
} from "lucide-react";

const TPADashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Month");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setSelectedNotification(null);
  };

  const handleViewAllNotifications = () => {
    // Navigate to a dedicated all notifications view
    navigate("/dashboard/general/notifications");
  };

  const handleReviewNewClaims = () => {
    // Navigate to the review claims route
    navigate("/dashboard/tpa/claimsReview");
  };

  const handleGoToFlaggedClaims = () => {
    // Navigate to the flagged claims route (fixed typo)
    navigate("/dashboard/tpa/flaggedClaims");
  };

  const handleAddTeamMember = () => {
    // Navigate to the team management route
    navigate("/dashboard/tpa/teamManagement");
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

  // Enhanced chart data for different periods
  const chartDataByPeriod = {
    Year: [
      { name: "2020", claims: 12400, fraudCases: 340, approvalRate: 87 },
      { name: "2021", claims: 15200, fraudCases: 410, approvalRate: 85 },
      { name: "2022", claims: 18900, fraudCases: 520, approvalRate: 88 },
      { name: "2023", claims: 22100, fraudCases: 630, approvalRate: 90 },
      { name: "2024", claims: 26800, fraudCases: 720, approvalRate: 92 },
      { name: "2025", claims: 31200, fraudCases: 850, approvalRate: 89 },
    ],
    Quarter: [
      { name: "Q1 2024", claims: 6200, fraudCases: 180, approvalRate: 91 },
      { name: "Q2 2024", claims: 7400, fraudCases: 220, approvalRate: 88 },
      { name: "Q3 2024", claims: 6800, fraudCases: 195, approvalRate: 93 },
      { name: "Q4 2024", claims: 6400, fraudCases: 175, approvalRate: 90 },
      { name: "Q1 2025", claims: 7800, fraudCases: 240, approvalRate: 89 },
      { name: "Q2 2025", claims: 8100, fraudCases: 260, approvalRate: 87 },
    ],
    Month: [
      { name: "Jan", claims: 2100, fraudCases: 65, approvalRate: 88 },
      { name: "Feb", claims: 1950, fraudCases: 58, approvalRate: 90 },
      { name: "Mar", claims: 2250, fraudCases: 72, approvalRate: 87 },
      { name: "Apr", claims: 2400, fraudCases: 78, approvalRate: 89 },
      { name: "May", claims: 2600, fraudCases: 85, approvalRate: 86 },
      { name: "Jun", claims: 2300, fraudCases: 68, approvalRate: 91 },
      { name: "Jul", claims: 2150, fraudCases: 62, approvalRate: 92 },
      { name: "Aug", claims: 2050, fraudCases: 59, approvalRate: 90 },
      { name: "Sep", claims: 2400, fraudCases: 74, approvalRate: 88 },
      { name: "Oct", claims: 2500, fraudCases: 81, approvalRate: 87 },
      { name: "Nov", claims: 2200, fraudCases: 67, approvalRate: 89 },
      { name: "Dec", claims: 1900, fraudCases: 55, approvalRate: 93 },
    ]
  };

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



  return (
    <div className="w-full space-y-6 bg-gray-50 min-h-screen" style={{ padding: '0.625vw' }}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 rounded-full text-sm" style={{ padding: '0.3125vw 0.1875vw' }}>
          <AlertTriangle style={{ width: '0.4167vw', height: '0.4167vw' }} />
          Alert: 2 Claims Require your attention
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4" style={{ gap: '0.625vw' }}>
        {/* Left Content - Claims Summary and Charts */}
        <div className="xl:col-span-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.625vw' }}>
          {/* Summary Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ gap: '0.625vw' }}>
            {/* Claims by Status */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:from-emerald-100 hover:to-teal-200" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
                <h3 className="text-lg font-bold text-gray-800">Claims by Status</h3>
                <div className="bg-emerald-200 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <CheckCircle style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-emerald-700" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4167vw' }}>
                <div className="flex items-center justify-between bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full" style={{ width: '0.3125vw', height: '0.3125vw', marginRight: '0.3125vw' }}></div>
                    <span className="text-base font-semibold text-gray-700">Approved</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">24</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="flex items-center">
                    <div className="bg-red-500 rounded-full" style={{ width: '0.3125vw', height: '0.3125vw', marginRight: '0.3125vw' }}></div>
                    <span className="text-base font-semibold text-gray-700">Flagged</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">6</span>
                </div>
              </div>
            </div>

            {/* Fraud Alerts */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 border border-red-200 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:from-red-100 hover:to-orange-200" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
                <h3 className="text-lg font-bold text-gray-800">Fraud Alerts</h3>
                <div className="bg-red-200 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <AlertTriangle style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-red-700" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3125vw' }}>
                <div className="bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700">Total flagged</span>
                    <span className="text-3xl font-bold text-red-600">{fraudAlerts.total}</span>
                  </div>
                  <div className="text-sm text-gray-600" style={{ marginTop: '0.2083vw' }}>AI/Manual detection</div>
                </div>
              </div>
            </div>

            {/* Top Providers */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:from-blue-100 hover:to-indigo-200" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
                <h3 className="text-lg font-bold text-gray-800">Top Providers</h3>
                <div className="bg-blue-200 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <FileText style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-blue-700" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3125vw' }}>
                <div className="bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="text-lg font-bold text-gray-800">{topProvider.name}</div>
                  <div className="text-3xl font-bold text-blue-600">{topProvider.claimCount}</div>
                  <div className="text-sm text-gray-600" style={{ marginTop: '0.1042vw' }}>Claims processed</div>
                </div>
              </div>
            </div>

            {/* Claim Volume */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:from-purple-100 hover:to-pink-200" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
                <h3 className="text-lg font-bold text-gray-800">Claim Volume</h3>
                <div className="bg-purple-200 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <Clock style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-purple-700" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4167vw' }}>
                <div className="flex items-center justify-between bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="flex items-center">
                    <div className="bg-yellow-500 rounded-full" style={{ width: '0.3125vw', height: '0.3125vw', marginRight: '0.3125vw' }}></div>
                    <span className="text-base font-semibold text-gray-700">Pending</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">5</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-xl backdrop-blur-sm" style={{ padding: '0.3125vw' }}>
                  <div className="flex items-center">
                    <div className="bg-purple-500 rounded-full" style={{ width: '0.3125vw', height: '0.3125vw', marginRight: '0.3125vw' }}></div>
                    <span className="text-base font-semibold text-gray-700">Forwarded</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '0.625vw' }}>
            {/* Advanced Claim Analytics Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 backdrop-blur-sm"
              style={{ padding: '0.625vw' }}
            >
              <div className="flex justify-between items-center" style={{ marginBottom: '0.625vw' }}>
                <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl" style={{ padding: '0.2083vw' }}>
                    <TrendingUp style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Claims Analytics Dashboard</h3>
                    <p className="text-sm text-gray-600">Real-time insights & fraud detection</p>
                  </div>
                </div>
                <div className="flex" style={{ gap: '0.2083vw' }}>
                  {["Year", "Quarter", "Month"].map((period) => (
                    <motion.button
                      key={period}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPeriod(period)}
                      className={`text-sm font-semibold rounded-xl transition-all duration-300 ${
                        selectedPeriod === period
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                      }`}
                      style={{ padding: '0.4167vw' }}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Advanced Multi-Line Chart */}
              <motion.div 
                key={selectedPeriod}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ height: '20vw' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartDataByPeriod[selectedPeriod]}>
                    <defs>
                      <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '0.75vw',
                        boxShadow: '0 0.625vw 1.5625vw rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(0.625vw)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '1.25vw' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="claims"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#claimsGradient)"
                      strokeWidth={3}
                      name="Total Claims"
                      animationDuration={2000}
                    />
                    <Area
                      type="monotone"
                      dataKey="fraudCases"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#fraudGradient)"
                      strokeWidth={3}
                      name="Fraud Cases"
                      animationDuration={2000}
                      animationDelay={500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              <div className="grid grid-cols-3" style={{ marginTop: '0.4167vw', gap: '0.4167vw' }}>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200/50" style={{ padding: '0.3125vw' }}>
                  <div className="text-2xl font-bold text-blue-600">
                    {chartDataByPeriod[selectedPeriod].reduce((sum, item) => sum + item.claims, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Claims</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-red-200/50" style={{ padding: '0.3125vw' }}>
                  <div className="text-2xl font-bold text-red-600">
                    {chartDataByPeriod[selectedPeriod].reduce((sum, item) => sum + item.fraudCases, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Fraud Cases</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50" style={{ padding: '0.3125vw' }}>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(chartDataByPeriod[selectedPeriod].reduce((sum, item) => sum + item.approvalRate, 0) / chartDataByPeriod[selectedPeriod].length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Approval</div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Risk Score Breakdown */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg border border-purple-100/50 hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 backdrop-blur-sm"
              style={{ padding: '0.625vw' }}
            >
              <div className="flex justify-between items-center" style={{ marginBottom: '0.625vw' }}>
                <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl" style={{ padding: '0.2083vw' }}>
                    <Activity style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Risk Analysis</h3>
                    <p className="text-sm text-gray-600">AI-Powered Detection</p>
                  </div>
                </div>
                <button className="hover:bg-gray-100 rounded-xl transition-colors duration-200" style={{ padding: '0.2083vw' }}>
                  <MoreHorizontal style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-gray-400" />
                </button>
              </div>

              {/* Redesigned Donut Chart with Center Data */}
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ height: '16.6667vw' }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskScoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        animationBegin={800}
                        animationDuration={1500}
                        strokeWidth={2}
                        stroke="#ffffff"
                      >
                        {riskScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '0.75vw',
                          boxShadow: '0 0.625vw 1.5625vw rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Center Value - Positioned absolutely in center */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    24.25
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Avg Risk</div>
                </motion.div>
              </div>

              {/* Enhanced Legend with percentages */}
              <div className="grid grid-cols-2" style={{ gap: '0.3125vw', marginTop: '0.625vw' }}>
                {riskScoreData.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
                    className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/50"
                    style={{ padding: '0.3125vw' }}
                  >
                    <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                      <div 
                        className="rounded-full shadow-sm" 
                        style={{ 
                          width: '0.3125vw', 
                          height: '0.3125vw',
                          backgroundColor: item.color 
                        }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.value}%</span>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                onClick={() => setShowAnalyticsModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ marginTop: '0.625vw', padding: '0.4167vw' }}
              >
                View Detailed Analysis
              </motion.button>
            </motion.div>
          </div>

          {/* Additional Analytics Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: '0.625vw', marginBottom: '0.625vw' }}
          >
            {/* Claims Processing Timeline */}
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-lg border border-green-100/50 hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2" style={{ padding: '0.625vw' }}>
              <div className="flex items-center" style={{ gap: '0.3125vw', marginBottom: '0.625vw' }}>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <Clock style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Processing Timeline</h3>
                  <p className="text-sm text-gray-600">Average processing times</p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ height: '16.6667vw' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { stage: 'Submitted', avgHours: 0.5, maxHours: 2 },
                    { stage: 'Review', avgHours: 24, maxHours: 72 },
                    { stage: 'Investigation', avgHours: 96, maxHours: 168 },
                    { stage: 'Decision', avgHours: 12, maxHours: 48 },
                    { stage: 'Payment', avgHours: 48, maxHours: 120 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="stage" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '0.75vw',
                        boxShadow: '0 0.625vw 1.5625vw rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="avgHours" 
                      fill="#22c55e" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      name="Average Time"
                    />
                    <Bar 
                      dataKey="maxHours" 
                      fill="#16a34a" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationDelay={300}
                      name="Maximum Time"
                      opacity={0.6}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Fraud Detection Efficiency */}
            <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl shadow-lg border border-orange-100/50 hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2" style={{ padding: '0.625vw' }}>
              <div className="flex items-center" style={{ gap: '0.3125vw', marginBottom: '0.625vw' }}>
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <AlertTriangle style={{ width: '0.5208vw', height: '0.5208vw' }} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Detection Accuracy</h3>
                  <p className="text-sm text-gray-600">AI vs Manual detection</p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{ height: '16.6667vw' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', aiAccuracy: 94, manualAccuracy: 87, falsePositives: 6 },
                    { month: 'Feb', aiAccuracy: 95, manualAccuracy: 89, falsePositives: 5 },
                    { month: 'Mar', aiAccuracy: 96, manualAccuracy: 88, falsePositives: 4 },
                    { month: 'Apr', aiAccuracy: 97, manualAccuracy: 90, falsePositives: 3 },
                    { month: 'May', aiAccuracy: 97, manualAccuracy: 91, falsePositives: 3 },
                    { month: 'Jun', aiAccuracy: 98, manualAccuracy: 89, falsePositives: 2 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      domain={[80, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '0.75vw',
                        boxShadow: '0 0.625vw 1.5625vw rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="aiAccuracy" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                      animationDuration={2000}
                      name="AI Accuracy %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="manualAccuracy" 
                      stroke="#dc2626" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                      animationDuration={2000}
                      animationDelay={500}
                      name="Manual Accuracy %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </motion.div>

          {/* Highlights Section */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1" style={{ padding: '0.625vw' }}>
            <h3 className="text-lg font-semibold text-gray-900" style={{ marginBottom: '0.4167vw' }}>Highlights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3125vw' }}>
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start" style={{ gap: '0.2083vw' }}>
                  <div className="bg-blue-600 rounded-full flex-shrink-0" style={{ width: '0.2083vw', height: '0.2083vw', marginTop: '0.2083vw' }}></div>
                  <div className="text-sm text-gray-700">
                    {highlight.text}{" "}
                    <button className="text-blue-600 hover:text-blue-800 underline">
                      {highlight.link}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '0.625vw' }}>
              <h4 className="font-semibold text-gray-900" style={{ marginBottom: '0.3125vw' }}>AI Smart Suggestions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3125vw' }}>
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start" style={{ gap: '0.2083vw' }}>
                    <div className="bg-green-500 rounded-full flex-shrink-0" style={{ width: '0.2083vw', height: '0.2083vw', marginTop: '0.2083vw' }}></div>
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
        <div className="xl:col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.625vw' }}>
          {/* Notifications Panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" style={{ padding: '0.625vw' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.625vw' }}>
              <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                <div className="bg-blue-100 rounded-xl" style={{ padding: '0.2083vw' }}>
                  <Bell style={{ width: '1.5vw', height: '1.5vw' }} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              </div>
              <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                <span className="bg-red-100 text-red-600 rounded-full text-xs font-semibold" style={{ padding: '0.1042vw 0.2083vw' }}>
                  {notifications.filter(n => n.priority === 'High').length} urgent
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3125vw' }}>
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
                    style={{ padding: '0.4167vw' }}
                  >
                    <div className="flex items-start" style={{ gap: '0.3125vw' }}>
                      <div className={`rounded-xl transition-all duration-200 ${
                        notification.type === 'warning' ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-200' :
                        notification.type === 'info' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                        'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                      }`} style={{ padding: '0.3125vw' }}>
                        <IconComponent style={{ width: '1.2vw', height: '1.2vw' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">{notification.title}</p>
                          <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                            {notification.priority === 'High' && (
                              <div className="bg-red-500 rounded-full animate-pulse" style={{ width: '0.5208vw', height: '0.5208vw' }}></div>
                            )}
                            <button 
                              onClick={() => handleNotificationClick(notification)}
                              className="rounded-lg hover:bg-blue-200 transition-all duration-200 group-hover:scale-110"
                              style={{ padding: '0.2083vw' }}
                            >
                              <ArrowUpRight style={{ width: '1.0vw', height: '1.0vw' }} className="text-gray-400 group-hover:text-blue-600" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500" style={{ marginTop: '0.1042vw' }}>{notification.time}</p>
                        {notification.priority && (
                          <span className={`inline-block text-xs font-medium rounded-full ${
                            notification.priority === 'High' ? 'bg-red-100 text-red-700' :
                            notification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`} style={{ padding: '0.1042vw 0.2083vw', marginTop: '0.2083vw' }}>
                            {notification.priority} Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200" style={{ marginTop: '0.4167vw', paddingTop: '0.4167vw' }}>
              <button 
                  onClick={handleViewAllNotifications}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-all duration-200" style={{ padding: '0.2083vw' }}>
                View All Notifications
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1" style={{ padding: '0.625vw' }}>
            <div className="flex items-center" style={{ gap: '0.3125vw', marginBottom: '0.625vw' }}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg" style={{ padding: '0.3125vw' }}>
                <CheckCircle style={{ width: '0.625vw', height: '0.625vw' }} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5208vw' }}>
              <button 
                  onClick={handleReviewNewClaims}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white rounded-2xl transition-all duration-300 ease-in-out text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transform shadow-lg relative overflow-hidden group border border-emerald-400" style={{ padding: '0.5208vw 0.625vw' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center justify-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-white/20 rounded-lg" style={{ padding: '0.3125vw' }}>
                    <AlertTriangle style={{ width: '1.25vw', height: '1.25vw' }} />
                  </div>
                  Review New Claims
                </span>
              </button>

              <button 
                  onClick={handleGoToFlaggedClaims}
                  className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 hover:from-red-600 hover:via-pink-600 hover:to-rose-700 text-white rounded-2xl transition-all duration-300 ease-in-out text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transform shadow-lg relative overflow-hidden group border border-red-400" style={{ padding: '0.5208vw 0.625vw' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center justify-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-white/20 rounded-lg" style={{ padding: '0.3125vw' }}>
                    <Flag style={{ width: '1.25vw', height: '1.25vw' }} />
                  </div>
                  Go to Flagged Claims
                </span>
              </button>

              <button 
                  onClick={handleAddTeamMember}
                  className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-700 text-white rounded-2xl transition-all duration-300 ease-in-out text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transform shadow-lg relative overflow-hidden group border border-purple-400" style={{ padding: '0.5208vw 0.625vw' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center justify-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-white/20 rounded-lg" style={{ padding: '0.3125vw' }}>
                    <MessageSquare style={{ width: '1.25vw', height: '1.25vw' }} />
                  </div>
                  Add Team Member
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      {showNotificationModal && selectedNotification && (
        <div className="fixed bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ inset: '-5vw', padding: '0.4167vw' }}>
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
                  <span className="text-2xl text-gray-400 hover:text-gray-600">×</span>
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

      {/* Detailed Analytics Modal */}
      {showAnalyticsModal && (
        <div className="fixed bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ inset: '-5vw', padding: '0.4167vw' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl" style={{ padding: '0.625vw' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: '0.3125vw' }}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl" style={{ padding: '0.3125vw' }}>
                    <Activity style={{ width: '0.625vw', height: '0.625vw' }} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Detailed Risk Analytics</h2>
                    <p className="text-sm text-gray-500">Comprehensive AI-powered fraud detection insights</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAnalyticsModal(false)}
                  className="hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  style={{ padding: '0.2083vw' }}
                >
                  <span className="text-2xl text-gray-400 hover:text-gray-600">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '0.625vw', display: 'flex', flexDirection: 'column', gap: '0.8333vw' }}>
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '0.625vw' }}>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200" style={{ padding: '0.625vw' }}>
                  <div className="text-3xl font-bold text-red-600">127</div>
                  <div className="text-sm text-red-700 font-medium">High Risk Claims</div>
                  <div className="text-xs text-red-500" style={{ marginTop: '0.1042vw' }}>↑ 12% from last month</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200" style={{ padding: '0.625vw' }}>
                  <div className="text-3xl font-bold text-yellow-600">89</div>
                  <div className="text-sm text-yellow-700 font-medium">Medium Risk Claims</div>
                  <div className="text-xs text-yellow-500" style={{ marginTop: '0.1042vw' }}>↓ 5% from last month</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200" style={{ padding: '0.625vw' }}>
                  <div className="text-3xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-green-700 font-medium">Detection Accuracy</div>
                  <div className="text-xs text-green-500" style={{ marginTop: '0.1042vw' }}>↑ 2.1% from last month</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200" style={{ padding: '0.625vw' }}>
                  <div className="text-3xl font-bold text-blue-600">$2.4M</div>
                  <div className="text-sm text-blue-700 font-medium">Fraud Prevented</div>
                  <div className="text-xs text-blue-500" style={{ marginTop: '0.1042vw' }}>↑ 18% from last month</div>
                </div>
              </div>

              {/* Risk Distribution by Provider */}
              <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '0.8333vw' }}>
                <div className="bg-gray-50 rounded-xl" style={{ padding: '0.625vw' }}>
                  <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '0.4167vw' }}>Risk Distribution by Provider Type</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { provider: 'Hospitals', high: 45, medium: 23, low: 12 },
                      { provider: 'Clinics', high: 32, medium: 41, low: 8 },
                      { provider: 'Specialists', high: 28, medium: 18, low: 15 },
                      { provider: 'Labs', high: 22, medium: 7, low: 3 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="provider" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Risk" />
                      <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Risk" />
                      <Bar dataKey="low" stackId="a" fill="#10b981" name="Low Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 rounded-xl" style={{ padding: '0.625vw' }}>
                  <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '0.4167vw' }}>Fraud Detection Timeline</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { week: 'Week 1', detected: 23, prevented: 21, falsePos: 2 },
                      { week: 'Week 2', detected: 31, prevented: 28, falsePos: 3 },
                      { week: 'Week 3', detected: 28, prevented: 26, falsePos: 2 },
                      { week: 'Week 4', detected: 35, prevented: 33, falsePos: 2 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="detected" stroke="#8b5cf6" strokeWidth={3} name="Detected" />
                      <Line type="monotone" dataKey="prevented" stroke="#10b981" strokeWidth={3} name="Prevented" />
                      <Line type="monotone" dataKey="falsePos" stroke="#ef4444" strokeWidth={3} name="False Positives" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Model Performance */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200" style={{ padding: '0.625vw' }}>
                <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '0.625vw' }}>AI Model Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '0.625vw' }}>
                  <div className="bg-white rounded-lg" style={{ padding: '0.4167vw' }}>
                    <div className="text-2xl font-bold text-purple-600">97.8%</div>
                    <div className="text-sm text-gray-600">Precision Rate</div>
                    <div className="text-xs text-green-500" style={{ marginTop: '0.1042vw' }}>↑ 0.8% this week</div>
                  </div>
                  <div className="bg-white rounded-lg" style={{ padding: '0.4167vw' }}>
                    <div className="text-2xl font-bold text-purple-600">94.2%</div>
                    <div className="text-sm text-gray-600">Recall Rate</div>
                    <div className="text-xs text-green-500" style={{ marginTop: '0.1042vw' }}>↑ 1.2% this week</div>
                  </div>
                  <div className="bg-white rounded-lg" style={{ padding: '0.4167vw' }}>
                    <div className="text-2xl font-bold text-purple-600">96.0%</div>
                    <div className="text-sm text-gray-600">F1 Score</div>
                    <div className="text-xs text-green-500" style={{ marginTop: '0.1042vw' }}>↑ 1.0% this week</div>
                  </div>
                </div>
              </div>

              {/* Risk Factors Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '0.8333vw' }}>
                <div className="bg-gray-50 rounded-xl" style={{ padding: '0.625vw' }}>
                  <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '0.4167vw' }}>Top Risk Factors</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4167vw' }}>
                    {[
                      { factor: 'Unusual billing patterns', score: 8.7, trend: 'up' },
                      { factor: 'Provider history', score: 7.9, trend: 'stable' },
                      { factor: 'Claim timing anomalies', score: 7.2, trend: 'down' },
                      { factor: 'Patient demographics', score: 6.8, trend: 'up' },
                      { factor: 'Service code patterns', score: 6.3, trend: 'stable' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-lg" style={{ padding: '0.3125vw' }}>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{item.factor}</div>
                          <div className="w-full bg-gray-200 rounded-full" style={{ height: '0.2083vw', marginTop: '0.2083vw' }}>
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full" 
                              style={{ 
                                width: `${item.score * 10}%`,
                                height: '0.2083vw'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right" style={{ marginLeft: '0.4167vw' }}>
                          <div className="text-lg font-bold text-gray-900">{item.score}</div>
                          <div className={`text-xs ${
                            item.trend === 'up' ? 'text-red-500' : 
                            item.trend === 'down' ? 'text-green-500' : 
                            'text-gray-500'
                          }`}>
                            {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl" style={{ padding: '0.625vw' }}>
                  <h3 className="text-lg font-bold text-gray-900" style={{ marginBottom: '0.4167vw' }}>Recent Fraud Patterns</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4167vw' }}>
                    {[
                      { pattern: 'Duplicate claims across providers', cases: 23, severity: 'High' },
                      { pattern: 'Unbundling of services', cases: 18, severity: 'Medium' },
                      { pattern: 'Phantom billing', cases: 12, severity: 'High' },
                      { pattern: 'Upcoding procedures', cases: 15, severity: 'Medium' },
                      { pattern: 'Identity theft claims', cases: 8, severity: 'High' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg border-l-4 border-red-500" style={{ padding: '0.3125vw' }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.pattern}</div>
                            <div className="text-xs text-gray-500" style={{ marginTop: '0.1042vw' }}>{item.cases} cases detected</div>
                          </div>
                          <span className={`text-xs font-medium rounded-full ${
                            item.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`} style={{ padding: '0.1042vw 0.2083vw' }}>
                            {item.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex border-t border-gray-200" style={{ gap: '0.4167vw', paddingTop: '0.625vw' }}>
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ padding: '0.3125vw 0.625vw' }}>
                  Export Report
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ padding: '0.3125vw 0.625vw' }}>
                  Schedule Analysis
                </button>
                <button 
                  onClick={() => setShowAnalyticsModal(false)}
                  className="border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  style={{ padding: '0.3125vw 0.8333vw' }}
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