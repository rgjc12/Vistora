
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
      <div className="font-['Manrope',_sans-serif]" style={{ padding: '0.3125vw' }}>
        {/* User Activity Logs Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
          <div>
            <h1 className="font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]" style={{ fontSize: '1.5625vw' }}>
              Activity Log - {selectedMember.name}
            </h1>
            <p className="text-gray-500" style={{ marginTop: '0.1042vw' }}>
              Monitor {selectedMember.name}'s actions and system access
            </p>
          </div>
          <button
            onClick={() => {
              setShowUserActivityLogs(false);
              setSelectedMember(null);
            }}
            className="flex items-center text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            style={{ gap: '0.1042vw', padding: '0.2604vw 0.2604vw' }}
          >
            <X style={{ width: '0.2083vw', height: '0.2083vw' }} />
            Back to Team
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100" style={{ padding: '0.3125vw', marginBottom: '0.4167vw' }}>
          <div className="flex items-center" style={{ gap: '0.2083vw' }}>
            <div className={`${selectedMember.color} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`} style={{ width: '0.8333vw', height: '0.8333vw', fontSize: '1.0417vw' }}>
              {selectedMember.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900" style={{ fontSize: '1.0417vw' }}>{selectedMember.name}</h3>
              <p className="text-gray-600">{selectedMember.email}</p>
              <div className="flex items-center" style={{ gap: '0.2083vw', marginTop: '0.1042vw' }}>
                <span className={`text-xs font-medium rounded-full border ${getRoleColor(selectedMember.role)}`} style={{ padding: '0.0625vw 0.1563vw' }}>
                  {selectedMember.role}
                </span>
                <span className="text-sm text-gray-500">{selectedMember.regionAccess}</span>
                <span className={`inline-flex items-center text-xs font-medium rounded-full ${getStatusColor(selectedMember.status)}`} style={{ gap: '0.0521vw', padding: '0.0521vw 0.1042vw' }}>
                  <div className={`rounded-full ${selectedMember.status === "Active" ? "bg-green-500" : "bg-red-400"}`} style={{ width: '0.078125vw', height: '0.078125vw' }}></div>
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
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '0.3125vw', marginBottom: '0.4167vw' }}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: '0.3125vw' }}>
            <div className="flex items-center" style={{ gap: '0.1563vw' }}>
              <div className="bg-blue-100 rounded-xl flex items-center justify-center" style={{ width: '0.625vw', height: '0.625vw' }}>
                <Activity style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Actions</p>
                <p className="font-semibold text-gray-900" style={{ fontSize: '1.25vw' }}>{userLogs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: '0.3125vw' }}>
            <div className="flex items-center" style={{ gap: '0.1563vw' }}>
              <div className="bg-green-100 rounded-xl flex items-center justify-center" style={{ width: '0.625vw', height: '0.625vw' }}>
                <Shield style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Modules Accessed</p>
                <p className="font-semibold text-gray-900" style={{ fontSize: '1.25vw' }}>
                  {new Set(userLogs.map(log => log.module)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: '0.3125vw' }}>
            <div className="flex items-center" style={{ gap: '0.1563vw' }}>
              <div className="bg-purple-100 rounded-xl flex items-center justify-center" style={{ width: '0.625vw', height: '0.625vw' }}>
                <Calendar style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Days Active</p>
                <p className="font-semibold text-gray-900" style={{ fontSize: '1.25vw' }}>
                  {userLogs.length > 0 
                    ? Math.ceil((new Date() - new Date(Math.min(...userLogs.map(log => new Date(log.timestamp))))) / (1000 * 60 * 60 * 24))
                    : 0
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: '0.3125vw' }}>
            <div className="flex items-center" style={{ gap: '0.1563vw' }}>
              <div className="bg-orange-100 rounded-xl flex items-center justify-center" style={{ width: '0.625vw', height: '0.625vw' }}>
                <MapPin style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">IP Addresses</p>
                <p className="font-semibold text-gray-900" style={{ fontSize: '1.25vw' }}>
                  {new Set(userLogs.map(log => log.ipAddress)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Logs Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/50" style={{ padding: '0.25vw 0.3125vw' }}>
            <h3 className="font-semibold text-gray-900" style={{ fontSize: '0.9375vw' }}>Activity History</h3>
          </div>
          <div className="overflow-x-auto">
            {userLogs.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2083vw 0.3125vw' }}>Action Taken</th>
                    <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2083vw 0.3125vw' }}>Timestamp</th>
                    <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2083vw 0.3125vw' }}>Module</th>
                    <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2083vw 0.3125vw' }}>IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {userLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                      <td style={{ padding: '0.2083vw 0.3125vw' }}>
                        <div className="font-medium text-gray-900">{log.action}</div>
                      </td>
                      <td className="text-gray-500" style={{ padding: '0.2083vw 0.3125vw' }}>
                        <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                      <td style={{ padding: '0.2083vw 0.3125vw' }}>
                        <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100" style={{ padding: '0.0625vw 0.1563vw' }}>
                          {log.module}
                        </span>
                      </td>
                      <td className="text-gray-500 font-mono text-sm" style={{ padding: '0.2083vw 0.3125vw' }}>{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center" style={{ padding: '0.625vw' }}>
                <div className="bg-gray-100 rounded-full flex items-center justify-center mx-auto" style={{ width: '0.8333vw', height: '0.8333vw', marginBottom: '0.2083vw' }}>
                  <Activity style={{ width: '0.4167vw', height: '0.4167vw' }} className="text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900" style={{ fontSize: '0.9375vw', marginBottom: '0.1042vw' }}>No Activity Found</h3>
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
      <div className="font-['Manrope',_sans-serif]" style={{ padding: '0.3125vw' }}>
        {/* Activity Logs Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '0.4167vw' }}>
          <div>
            <h1 className="font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]" style={{ fontSize: '1.5625vw' }}>
              Team Activity Logs
            </h1>
            <p className="text-gray-500" style={{ marginTop: '0.1042vw' }}>
              Monitor team member actions and system access
            </p>
          </div>
          <button
            onClick={() => setShowActivityLogs(false)}
            className="flex items-center text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            style={{ gap: '0.1042vw', padding: '0.2604vw 0.2604vw' }}
          >
            <X style={{ width: '0.2083vw', height: '0.2083vw' }} />
            Back to Team
          </button>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>User Name</th>
                  <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Action Taken</th>
                  <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Timestamp</th>
                  <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Module</th>
                  <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td style={{ padding: '0.2604vw 0.3125vw' }}>
                      <div className="font-medium text-gray-900">{log.userName}</div>
                    </td>
                    <td className="text-gray-600" style={{ padding: '0.2604vw 0.3125vw' }}>{log.action}</td>
                    <td className="text-gray-500" style={{ padding: '0.2604vw 0.3125vw' }}>
                      {formatTimeAgo(log.timestamp)}
                    </td>
                    <td style={{ padding: '0.2604vw 0.3125vw' }}>
                      <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100" style={{ padding: '0.0625vw 0.1563vw' }}>
                        {log.module}
                      </span>
                    </td>
                    <td className="text-gray-500 font-mono text-sm" style={{ padding: '0.2604vw 0.3125vw' }}>{log.ipAddress}</td>
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
    <div className="bg-gray-50/30 min-h-screen font-['Manrope',_sans-serif]" style={{ padding: '0.3125vw' }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between" style={{ gap: '0.3125vw', marginBottom: '0.4167vw' }}>
        <div className="w-fit flex flex-col items-start" style={{ gap: '0.0521vw' }}>
          <h1 className="font-semibold text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]" style={{ fontSize: '1.5625vw' }}>
            Team Management
          </h1>
          <p className="text-gray-500">
            Manage team members, roles, and permissions
          </p>
        </div>

        <div className="flex items-center" style={{ gap: '0.2083vw' }}>
          <button
            onClick={() => setShowActivityLogs(true)}
            className="flex items-center text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            style={{ gap: '0.1042vw', padding: '0.2604vw 0.2604vw' }}
          >
            <Download style={{ width: '0.2083vw', height: '0.2083vw' }} />
            Export Team Activity Logs
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            style={{ gap: '0.1042vw', padding: '0.2604vw 0.2604vw' }}
          >
            <Plus style={{ width: '0.2083vw', height: '0.2083vw' }} />
            Add New Team Member
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ gap: '0.2083vw', padding: '0.3125vw', marginBottom: '0.4167vw' }}>
        <div className="flex items-center flex-1 bg-gray-50/50 rounded-xl border border-gray-100" style={{ gap: '0.1563vw', minWidth: '15.625vw', padding: '0.2083vw 0.1563vw' }}>
          <Search style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-0 outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center" style={{ gap: '0.2083vw' }}>
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              style={{ padding: '0.1563vw 0.2083vw', paddingRight: '0.5208vw' }}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ width: '0.2083vw', height: '0.2083vw', right: '0.1563vw' }} />
          </div>

          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              style={{ padding: '0.1563vw 0.2083vw', paddingRight: '0.5208vw' }}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <ChevronDown className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ width: '0.2083vw', height: '0.2083vw', right: '0.1563vw' }} />
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Name</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Email</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Role</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Region Access</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Last Active</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Status</th>
                <th className="text-left font-semibold text-gray-700" style={{ padding: '0.2604vw 0.3125vw' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td style={{ padding: '0.2604vw 0.3125vw' }}>
                    <div className="flex items-center" style={{ gap: '0.1563vw' }}>
                      <div className={`${member.color} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm`} style={{ width: '0.5729vw', height: '0.5729vw' }}>
                        {member.avatar}
                      </div>
                      <div className="font-semibold text-gray-900">{member.name}</div>
                    </div>
                  </td>
                  <td className="text-gray-600" style={{ padding: '0.2604vw 0.3125vw' }}>{member.email}</td>
                  <td style={{ padding: '0.2604vw 0.3125vw' }}>
                    <span className={`text-xs font-medium rounded-full border ${getRoleColor(member.role)}`} style={{ padding: '0.0625vw 0.1563vw' }}>
                      {member.role}
                    </span>
                  </td>
                  <td className="text-gray-600" style={{ padding: '0.2604vw 0.3125vw' }}>{member.regionAccess}</td>
                  <td className="text-gray-500" style={{ padding: '0.2604vw 0.3125vw' }}>{formatTimeAgo(member.lastActive)}</td>
                  <td style={{ padding: '0.2604vw 0.3125vw' }}>
                    <span className={`inline-flex items-center text-xs font-medium rounded-full ${getStatusColor(member.status)}`} style={{ gap: '0.1042vw', padding: '0.0625vw 0.1563vw' }}>
                      <div className={`rounded-full ${member.status === "Active" ? "bg-green-500" : "bg-red-400"}`} style={{ width: '0.1042vw', height: '0.1042vw' }}></div>
                      {member.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.2604vw 0.3125vw' }}>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === member.id ? null : member.id);
                        }}
                        className="hover:bg-gray-100 rounded-xl transition-colors duration-150"
                        style={{ padding: '0.1042vw' }}
                      >
                        <MoreVertical style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-gray-500" />
                      </button>

                      {activeDropdown === member.id && (
                        <div className="absolute right-0 top-full bg-white border border-gray-100 rounded-xl shadow-lg z-50" style={{ marginTop: '0.1042vw', width: '12.5vw', padding: '0.0521vw' }}>
                          <button
                            onClick={() => handleEditMember(member)}
                            className="w-full text-left hover:bg-gray-50 flex items-center text-gray-700 transition-colors duration-150"
                            style={{ gap: '0.1042vw', padding: '0.2083vw 0.2083vw' }}
                          >
                            <Edit style={{ width: '0.2083vw', height: '0.2083vw' }} />
                            Edit
                          </button>
                          <button
                            onClick={() =>handleViewUserActivityLog(member)}
                            className="w-full text-left hover:bg-gray-50 flex items-center text-gray-700 transition-colors duration-150"
                            style={{ gap: '0.1042vw', padding: '0.2083vw 0.2083vw' }}
                          >
                            <Activity style={{ width: '0.2083vw', height: '0.2083vw' }} />
                            Activity Log
                          </button>
                          <button
                            onClick={() => handleSuspendMember(member.id)}
                            className="w-full text-left hover:bg-gray-50 flex items-center text-gray-700 transition-colors duration-150"
                            style={{ gap: '0.1042vw', padding: '0.2083vw 0.2083vw' }}
                          >
                            <UserMinus style={{ width: '0.2083vw', height: '0.2083vw' }} />
                            {member.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                          <hr className="border-gray-100" style={{ margin: '0.0521vw 0' }} />
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="w-full text-left hover:bg-red-50 flex items-center text-red-600 transition-colors duration-150"
                            style={{ gap: '0.1042vw', padding: '0.2083vw 0.2083vw' }}
                          >
                            <Trash2 style={{ width: '0.2083vw', height: '0.2083vw' }} />
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


      {showAddModal && (
        <div className="fixed bg-black/50 backdrop-blur-md flex items-center justify-center z-50 slick-scrollbar" style={{ inset: '-2.6042vw', padding: '0.2083vw' }}>
          <div className="bg-white rounded-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100 slick-scrollbar" style={{ maxWidth: '52.0833vw' }}>
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-gray-100" style={{ padding: '0.4167vw' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900" style={{ fontSize: '1.5625vw', marginBottom: '0.1042vw' }}>Add New Team Member</h2>
                  <p className="text-gray-600">Invite a new member to join your team</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-white/80 rounded-2xl transition-all duration-200 group"
                  style={{ padding: '0.1563vw' }}
                >
                  <X style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div style={{ padding: '0.4167vw' }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0.3125vw' }}>
                {/* Personal Information Section */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-blue-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <User style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-blue-600" />
                    </div>
                    Personal Information
                  </h3>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter full name"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.2083vw', padding: '0.2083vw' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter email address"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.2083vw', padding: '0.2083vw' }}
                    />
                  </div>
                </div>

                {/* Access & Permissions Section */}
                <div className="md:col-span-2" style={{ marginTop: '0.4167vw' }}>
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-purple-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <Shield style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-purple-600" />
                    </div>
                    Access & Permissions
                  </h3>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Role *
                  </label>
                  <div className="relative">
                    <Shield style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.625vw', padding: '0.2083vw' }}
                    >
                      {roleOptions.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <ChevronDown style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ right: '0.2083vw' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Region Access *
                  </label>
                  <div className="relative">
                    <MapPin style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.regionAccess}
                      onChange={(e) => setNewMember({...newMember, regionAccess: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.625vw', padding: '0.2083vw' }}
                    >
                      <option value="">Select region</option>
                      {regionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <ChevronDown style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ right: '0.2083vw' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Access Expiry
                  </label>
                  <div className="relative">
                    <Calendar style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="date"
                      value={newMember.accessExpiry}
                      onChange={(e) => setNewMember({...newMember, accessExpiry: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.2083vw', padding: '0.2083vw' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Leave empty for permanent access</p>
                </div>

                {/* Security Settings Section */}
                <div className="md:col-span-2" style={{ marginTop: '0.4167vw' }}>
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-green-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <Shield style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-green-600" />
                    </div>
                    Security Settings
                  </h3>
                  <div className="grid grid-cols-1" style={{ gap: '0.2083vw' }}>
                    <label className="flex items-start bg-gray-50/50 rounded-2xl border-2 border-transparent hover:border-blue-200 cursor-pointer transition-all duration-200 group" style={{ gap: '0.2083vw', padding: '0.2083vw' }}>
                      <input
                        type="checkbox"
                        checked={newMember.twoFactorEnabled}
                        onChange={(e) => setNewMember({...newMember, twoFactorEnabled: e.target.checked})}
                        className="rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        style={{ marginTop: '0.0521vw', width: '0.2604vw', height: '0.2604vw' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Enable Two-Factor Authentication</span>
                        <p className="text-xs text-gray-500" style={{ marginTop: '0.0521vw' }}>Adds an extra layer of security to the account</p>
                      </div>
                    </label>

                    <label className="flex items-start bg-gray-50/50 rounded-2xl border-2 border-transparent hover:border-blue-200 cursor-pointer transition-all duration-200 group" style={{ gap: '0.2083vw', padding: '0.2083vw' }}>
                      <input
                        type="checkbox"
                        checked={newMember.forcePasswordReset}
                        onChange={(e) => setNewMember({...newMember, forcePasswordReset: e.target.checked})}
                        className="rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        style={{ marginTop: '0.0521vw', width: '0.2604vw', height: '0.2604vw' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Force Password Reset on First Login</span>
                        <p className="text-xs text-gray-500" style={{ marginTop: '0.0521vw' }}>User will be required to set a new password upon first login</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex border-t border-gray-200" style={{ gap: '0.2083vw', marginTop: '0.5208vw', paddingTop: '0.3125vw' }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                  style={{ padding: '0.4167vw 0.4167vw' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl font-semibold"
                  style={{ padding: '0.4167vw 0.4167vw', gap: '0.1563vw' }}
                >
                  <Save style={{ width: '0.2604vw', height: '0.2604vw' }} />
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed bg-black/50 backdrop-blur-lg flex items-center justify-center z-50" style={{ inset: '-3.125vw', padding: '0.2083vw' }}>
          <div className="bg-white rounded-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100" style={{ maxWidth: '52.0833vw' }}>
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-b border-gray-100" style={{ padding: '0.3125vw' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: '0.2083vw' }}>
                  <div className={`${selectedMember.color} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`} style={{ width: '0.8333vw', height: '0.8333vw', fontSize: '1.0417vw' }}>
                    {selectedMember.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900" style={{ fontSize: '1.5625vw', marginBottom: '0.0521vw' }}>Edit Team Member</h2>
                    <p className="text-gray-600">Update member information and permissions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="hover:bg-white/80 rounded-2xl transition-all duration-200 group"
                  style={{ padding: '0.1563vw' }}
                >
                  <X style={{ width: '0.3125vw', height: '0.3125vw' }} className="text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div style={{ padding: '0.4167vw' }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0.3125vw' }}>
                {/* Personal Information Section */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-blue-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <User style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-blue-600" />
                    </div>
                    Personal Information
                  </h3>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter full name"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.2083vw', padding: '0.2083vw' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      placeholder="Enter email address"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.2083vw', padding: '0.2083vw' }}
                    />
                  </div>
                </div>

                {/* Access & Permissions Section */}
                <div className="md:col-span-2" style={{ marginTop: '0.4167vw' }}>
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-purple-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <Shield style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-purple-600" />
                    </div>
                    Access & Permissions
                  </h3>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Role *
                  </label>
                  <div className="relative">
                    <Shield style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.625vw', padding: '0.2083vw' }}
                    >
                      {roleOptions.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <ChevronDown style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ right: '0.2083vw' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '0.1042vw' }}>
                  <label className="block text-sm font-semibold text-gray-700">
                    Region Access *
                  </label>
                  <div className="relative">
                    <MapPin style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
                    <select
                      value={newMember.regionAccess}
                      onChange={(e) => setNewMember({...newMember, regionAccess: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none"
                      style={{ paddingLeft: '0.625vw', paddingRight: '0.625vw', padding: '0.2083vw' }}
                    >
                      {regionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <ChevronDown style={{ width: '0.2604vw', height: '0.2604vw' }} className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ right: '0.2083vw' }} />
                  </div>
                </div>

                {/* Security Settings Section */}
                <div className="md:col-span-2" style={{ marginTop: '0.4167vw' }}>
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.3125vw', gap: '0.1042vw' }}>
                    <div className="bg-green-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <Shield style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-green-600" />
                    </div>
                    Security Settings
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100" style={{ padding: '0.3125vw' }}>
                    <label className="flex items-start cursor-pointer group" style={{ gap: '0.2083vw' }}>
                      <input
                        type="checkbox"
                        checked={newMember.twoFactorEnabled}
                        onChange={(e) => setNewMember({...newMember, twoFactorEnabled: e.target.checked})}
                        className="rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        style={{ marginTop: '0.0521vw', width: '0.2604vw', height: '0.2604vw' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                          Two-Factor Authentication
                        </span>
                        <p className="text-xs text-gray-600" style={{ marginTop: '0.0521vw' }}>
                          Adds an extra layer of security to the account
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Member Status */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '0.9375vw', marginBottom: '0.2083vw', gap: '0.1042vw' }}>
                    <div className="bg-amber-100 rounded-lg flex items-center justify-center" style={{ width: '0.4167vw', height: '0.4167vw' }}>
                      <User style={{ width: '0.2083vw', height: '0.2083vw' }} className="text-amber-600" />
                    </div>
                    Current Status
                  </h3>
                  <div className="flex items-center bg-gray-50 rounded-2xl" style={{ gap: '0.3125vw', padding: '0.2083vw' }}>
                    <div className="flex items-center" style={{ gap: '0.1042vw' }}>
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <span className={`inline-flex items-center text-xs font-medium rounded-full ${getStatusColor(selectedMember.status)}`} style={{ gap: '0.1042vw', padding: '0.0625vw 0.1563vw' }}>
                        <div className={`rounded-full ${selectedMember.status === "Active" ? "bg-green-500" : "bg-red-400"}`} style={{ width: '0.1042vw', height: '0.1042vw' }}></div>
                        {selectedMember.status}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '0.1042vw' }}>
                      <span className="text-sm font-medium text-gray-700">Last Active:</span>
                      <span className="text-sm text-gray-600">{formatTimeAgo(selectedMember.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex border-t border-gray-200" style={{ gap: '0.2083vw', marginTop: '0.5208vw', paddingTop: '0.3125vw' }}>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                  style={{ padding: '0.4167vw 0.4167vw' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMember}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl font-semibold"
                  style={{ padding: '0.4167vw 0.4167vw', gap: '0.1563vw' }}
                >
                  <Save style={{ width: '0.2604vw', height: '0.2604vw' }} />
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
