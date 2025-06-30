
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  UserMinus,
  Calendar,
  Shield,
  X,
  Save,
  ChevronDown,
  User,
  Mail,
  MapPin,
  Activity,
} from "lucide-react";

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [regionFilter, setRegionFilter] = useState("All regions");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [showUserActivityLogs, setShowUserActivityLogs] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Eleanor Pena",
      email: "eleanor.pena@tpacompany.com",
      role: "Admin",
      regionAccess: "North America",
      lastActive: "2024-01-15T10:30:00Z",
      status: "Active",
      avatar: "EP",
      color: "bg-blue-500",
      joinDate: "2023-06-15",
      twoFactorEnabled: true,
    },
    {
      id: 2,
      name: "Wade Warren",
      email: "wade.warren@tpacompany.com",
      role: "Reviewer",
      regionAccess: "Europe",
      lastActive: "2024-01-14T15:45:00Z",
      status: "Active",
      avatar: "WW",
      color: "bg-orange-500",
      joinDate: "2023-08-20",
      twoFactorEnabled: false,
    },
    {
      id: 3,
      name: "Jenny Wilson",
      email: "jenny.wilson@tpacompany.com",
      role: "Reviewer",
      regionAccess: "Asia Pacific",
      lastActive: "2024-01-13T09:15:00Z",
      status: "Active",
      avatar: "JW",
      color: "bg-purple-500",
      joinDate: "2023-09-10",
      twoFactorEnabled: true,
    },
    {
      id: 4,
      name: "Robert Fox",
      email: "robert.fox@tpacompany.com",
      role: "Admin",
      regionAccess: "Global",
      lastActive: "2024-01-10T12:00:00Z",
      status: "Disabled",
      avatar: "RF",
      color: "bg-green-500",
      joinDate: "2023-05-01",
      twoFactorEnabled: true,
    },
  ]);

  // Mock data for activity logs
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      userName: "Eleanor Pena",
      action: "Approved Claim #482",
      timestamp: "2024-01-15T10:30:00Z",
      module: "Claims Review",
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      userName: "Wade Warren",
      action: "Flagged Claim #483 for review",
      timestamp: "2024-01-14T15:45:00Z",
      module: "Claims Review",
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      userName: "Jenny Wilson",
      action: "Updated team member permissions",
      timestamp: "2024-01-13T09:15:00Z",
      module: "Team Management",
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      userName: "Eleanor Pena",
      action: "Logged into system",
      timestamp: "2024-01-15T08:00:00Z",
      module: "Authentication",
      ipAddress: "192.168.1.100",
    },
    {
      id: 5,
      userName: "Eleanor Pena",
      action: "Downloaded claims report",
      timestamp: "2024-01-15T11:15:00Z",
      module: "Reports",
      ipAddress: "192.168.1.100",
    },
    {
      id: 6,
      userName: "Wade Warren",
      action: "Updated provider information",
      timestamp: "2024-01-14T14:30:00Z",
      module: "Provider Management",
      ipAddress: "192.168.1.101",
    },
    {
      id: 7,
      userName: "Wade Warren",
      action: "Reviewed Appeal #891",
      timestamp: "2024-01-14T16:00:00Z",
      module: "Appeals Management",
      ipAddress: "192.168.1.101",
    },
    {
      id: 8,
      userName: "Jenny Wilson",
      action: "Processed reimbursement batch",
      timestamp: "2024-01-13T10:45:00Z",
      module: "Reimbursements",
      ipAddress: "192.168.1.102",
    },
    {
      id: 9,
      userName: "Jenny Wilson",
      action: "Generated audit report",
      timestamp: "2024-01-13T14:20:00Z",
      module: "Audit",
      ipAddress: "192.168.1.102",
    },
    {
      id: 10,
      userName: "Robert Fox",
      action: "Updated security settings",
      timestamp: "2024-01-10T09:30:00Z",
      module: "Settings",
      ipAddress: "192.168.1.103",
    },
    {
      id: 11,
      userName: "Robert Fox",
      action: "Reviewed fraud alerts",
      timestamp: "2024-01-10T13:45:00Z",
      module: "Fraud Detection",
      ipAddress: "192.168.1.103",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Viewer",
    regionAccess: "",
    twoFactorEnabled: false,
    forcePasswordReset: false,
    accessExpiry: "",
  });

  const roles = ["All roles", "Admin", "Reviewer", "Viewer"];
  const regions = ["All regions", "North America", "Europe", "Asia Pacific", "Global"];
  const roleOptions = ["Admin", "Reviewer", "Viewer"];
  const regionOptions = ["North America", "Europe", "Asia Pacific", "Global"];

  const formatTimeAgo = (dateString) => {
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

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All roles" || member.role === roleFilter;
    const matchesRegion = regionFilter === "All regions" || member.regionAccess === regionFilter;
    
    return matchesSearch && matchesRole && matchesRegion;
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: teamMembers.length + 1,
        ...newMember,
        status: "Active",
        avatar: newMember.name.split(" ").map(n => n[0]).join(""),
        color: `bg-${['blue', 'green', 'purple', 'orange', 'pink'][Math.floor(Math.random() * 5)]}-500`,
        lastActive: new Date().toISOString(),
        joinDate: new Date().toISOString().split('T')[0],
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({
        name: "",
        email: "",
        role: "Viewer",
        regionAccess: "",
        twoFactorEnabled: false,
        forcePasswordReset: false,
        accessExpiry: "",
      });
      setShowAddModal(false);
    }
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setNewMember({ ...member });
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleUpdateMember = () => {
    setTeamMembers(teamMembers.map(member => 
      member.id === selectedMember.id ? { ...member, ...newMember } : member
    ));
    setShowEditModal(false);
    setSelectedMember(null);
    setNewMember({
      name: "",
      email: "",
      role: "Viewer",
      regionAccess: "",
      twoFactorEnabled: false,
      forcePasswordReset: false,
      accessExpiry: "",
    });
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    setActiveDropdown(null);
  };

  const handleSuspendMember = (memberId) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === "Active" ? "Disabled" : "Active" }
        : member
    ));
    setActiveDropdown(null);
  };

  const handleViewUserActivityLog = (member) => {
    setSelectedMember(member);
    setShowUserActivityLogs(true);
    setActiveDropdown(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Reviewer":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Viewer":
        return "bg-gray-50 text-gray-700 border-gray-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-50 text-green-700 border border-green-100" 
      : "bg-red-50 text-red-700 border border-red-100";
  };

  const getUserActivityLogs = (userName) => {
    return activityLogs.filter(log => log.userName === userName)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (showUserActivityLogs && selectedMember) {
    const userLogs = getUserActivityLogs(selectedMember.name);
    
    return (
      <div className="space-y-8 font-['Manrope',_sans-serif] p-6">
        {/* User Activity Logs Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              Activity Log - {selectedMember.name}
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor {selectedMember.name}'s actions and system access
            </p>
          </div>
          <button
            onClick={() => {
              setShowUserActivityLogs(false);
              setSelectedMember(null);
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <X className="w-4 h-4" />
            Back to Team
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${selectedMember.color} rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-sm`}>
              {selectedMember.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
              <p className="text-gray-600">{selectedMember.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleColor(selectedMember.role)}`}>
                  {selectedMember.role}
                </span>
                <span className="text-sm text-gray-500">{selectedMember.regionAccess}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMember.status)}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedMember.status === "Active" ? "bg-green-500" : "bg-red-400"}`}></div>
                  {selectedMember.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Active</p>
              <p className="font-medium text-gray-700">{formatTimeAgo(selectedMember.lastActive)}</p>
            </div>
          </div>
        </div>

        {/* Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Actions</p>
                <p className="text-2xl font-semibold text-gray-900">{userLogs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Modules Accessed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(userLogs.map(log => log.module)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Days Active</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userLogs.length > 0 
                    ? Math.ceil((new Date() - new Date(Math.min(...userLogs.map(log => new Date(log.timestamp))))) / (1000 * 60 * 60 * 24))
                    : 0
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">IP Addresses</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(userLogs.map(log => log.ipAddress)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Logs Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-900">Activity History</h3>
          </div>
          <div className="overflow-x-auto">
            {userLogs.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Action Taken</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Timestamp</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Module</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {userLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{log.action}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                          {log.module}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-mono text-sm">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Found</h3>
                <p className="text-gray-500">This user has no recorded activity yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showActivityLogs) {
    return (
      <div className="space-y-8 font-['Manrope',_sans-serif] p-6">
        {/* Activity Logs Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              Team Activity Logs
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor team member actions and system access
            </p>
          </div>
          <button
            onClick={() => setShowActivityLogs(false)}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <X className="w-4 h-4" />
            Back to Team
          </button>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">User Name</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Action Taken</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Timestamp</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Module</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="py-5 px-6">
                      <div className="font-medium text-gray-900">{log.userName}</div>
                    </td>
                    <td className="py-5 px-6 text-gray-600">{log.action}</td>
                    <td className="py-5 px-6 text-gray-500">
                      {formatTimeAgo(log.timestamp)}
                    </td>
                    <td className="py-5 px-6">
                      <span className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                        {log.module}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-500 font-mono text-sm">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-['Manrope',_sans-serif] p-6 bg-gray-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="w-fit flex flex-col items-start gap-1">
          <h1 className="text-3xl font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Team Management
          </h1>
          <p className="text-gray-500">
            Manage team members, roles, and permissions
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowActivityLogs(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export Team Activity Logs
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add New Team Member
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 flex-1 min-w-[300px] bg-gray-50/50 rounded-xl px-4 py-3 border border-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-0 outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Name</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Email</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Role</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Region Access</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Last Active</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-5 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 ${member.color} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                        {member.avatar}
                      </div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-gray-600">{member.email}</td>
                  <td className="py-5 px-6">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-gray-600">{member.regionAccess}</td>
                  <td className="py-5 px-6 text-gray-500">{formatTimeAgo(member.lastActive)}</td>
                  <td className="py-5 px-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${member.status === "Active" ? "bg-green-500" : "bg-red-400"}`}></div>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === member.id ? null : member.id);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-150"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {activeDropdown === member.id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition-colors duration-150"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleViewUserActivityLog(member)}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition-colors duration-150"
                          >
                            <Activity className="w-4 h-4" />
                            Activity Log
                          </button>
                          <button
                            onClick={() => handleSuspendMember(member.id)}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition-colors duration-150"
                          >
                            <UserMinus className="w-4 h-4" />
                            {member.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="w-full text-left px-4 py-2.5 hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors duration-150"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Team Member</h2>
                  <p className="text-gray-600">Invite a new member to join your team</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-3 hover:bg-white/80 rounded-2xl transition-all duration-200 group"
                >
                  <X className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    Personal Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Access & Permissions Section */}
                <div className="md:col-span-2 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    Access & Permissions
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Role *
                  </label>
                  <div className="relative">
                    <Shield className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                    >
                      {roleOptions.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Region Access *
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.regionAccess}
                      onChange={(e) => setNewMember({...newMember, regionAccess: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                    >
                      <option value="">Select region</option>
                      {regionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Access Expiry
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="date"
                      value={newMember.accessExpiry}
                      onChange={(e) => setNewMember({...newMember, accessExpiry: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Leave empty for permanent access</p>
                </div>

                {/* Security Settings Section */}
                <div className="md:col-span-2 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    Security Settings
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl border-2 border-transparent hover:border-blue-200 cursor-pointer transition-all duration-200 group">
                      <input
                        type="checkbox"
                        checked={newMember.twoFactorEnabled}
                        onChange={(e) => setNewMember({...newMember, twoFactorEnabled: e.target.checked})}
                        className="mt-1 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 w-5 h-5"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Enable Two-Factor Authentication</span>
                        <p className="text-xs text-gray-500 mt-1">Adds an extra layer of security to the account</p>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl border-2 border-transparent hover:border-blue-200 cursor-pointer transition-all duration-200 group">
                      <input
                        type="checkbox"
                        checked={newMember.forcePasswordReset}
                        onChange={(e) => setNewMember({...newMember, forcePasswordReset: e.target.checked})}
                        className="mt-1 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 w-5 h-5"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Force Password Reset on First Login</span>
                        <p className="text-xs text-gray-500 mt-1">User will be required to set a new password upon first login</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl font-semibold"
                >
                  <Save className="w-5 h-5" />
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Edit Team Member</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-150"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Region Access</label>
                  <select
                    value={newMember.regionAccess}
                    onChange={(e) => setNewMember({...newMember, regionAccess: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    {regionOptions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newMember.twoFactorEnabled}
                      onChange={(e) => setNewMember({...newMember, twoFactorEnabled: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMember}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Update Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
