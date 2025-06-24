import { useState } from "react"
import {
  X,
  Calendar,
  User,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Download,
  Edit3,
  Flag,
  Send,
  ThumbsUp,
  Filter,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react"

const ClaimsReview = ({ currentPage, setCurrentPage }) => {
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [providerFilter, setProviderFilter] = useState("All Providers")
  const [riskScoreFilter, setRiskScoreFilter] = useState([0, 100])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [showFilters, setShowFilters] = useState(false)
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [itemsPerPage] = useState(10)

  const claimsData = [
    {
      id: "CLM-2024-001",
      patientName: "Sarah Johnson",
      patientId: "PAT-001",
      dateOfBirth: "1985-03-15",
      provider: "Dr. Smith Medical Center",
      providerId: "PRV-001",
      providerSpecialty: "Internal Medicine",
      serviceDate: "2024-01-15",
      submissionDate: "2024-01-16",
      amount: 1250.0,
      processingRate: 94.5,
      riskScore: 25,
      flags: 2,
      status: "Approved",
      diagnosis: "Routine Physical Examination",
      procedureCode: "99213",
      insuranceId: "INS-789456",
      processingTime: "2.1 days",
      notes: "Standard preventive care visit. All documentation complete.",
      adjudicationNotes: "Claim approved after standard review. All documentation verified.",
      statusHistory: [
        { status: "Pending", date: "2024-01-16", user: "System" },
        { status: "Under Review", date: "2024-01-17", user: "John Doe" },
        { status: "Approved", date: "2024-01-18", user: "Jane Smith" },
      ],
      documents: [
        { name: "Medical Report.pdf", type: "pdf", size: "2.3 MB" },
        { name: "Lab Results.pdf", type: "pdf", size: "1.1 MB" },
      ],
      flaggedIndicators: ["None"],
      confidenceLevel: 95,
      auditTrail: [
        { action: "Claim Submitted", timestamp: "2024-01-16 09:30:00", user: "Patient Portal" },
        { action: "Initial Review", timestamp: "2024-01-17 10:15:00", user: "John Doe" },
        { action: "Approved", timestamp: "2024-01-18 14:20:00", user: "Jane Smith" },
      ],
    },
    {
      id: "CLM-2024-002",
      patientName: "Michael Brown",
      patientId: "PAT-002",
      dateOfBirth: "1978-07-22",
      provider: "City General Hospital",
      providerId: "PRV-002",
      providerSpecialty: "Emergency Medicine",
      serviceDate: "2024-01-14",
      submissionDate: "2024-01-15",
      amount: 850.0,
      processingRate: 87.2,
      riskScore: 45,
      flags: 8,
      status: "Pending",
      diagnosis: "Emergency Room Visit - Chest Pain",
      procedureCode: "99284",
      insuranceId: "INS-123789",
      processingTime: "4.2 days",
      notes: "Additional documentation requested for emergency visit validation.",
      adjudicationNotes: "Awaiting additional documentation from provider.",
      statusHistory: [
        { status: "Pending", date: "2024-01-15", user: "System" },
        { status: "Under Review", date: "2024-01-16", user: "John Doe" },
      ],
      documents: [
        { name: "Emergency Report.pdf", type: "pdf", size: "3.2 MB" },
        { name: "EKG Results.pdf", type: "pdf", size: "0.8 MB" },
      ],
      flaggedIndicators: ["Incomplete Documentation", "High Emergency Cost"],
      confidenceLevel: 78,
      auditTrail: [
        { action: "Claim Submitted", timestamp: "2024-01-15 15:45:00", user: "Provider Portal" },
        { action: "Documentation Request", timestamp: "2024-01-16 11:30:00", user: "John Doe" },
      ],
    },
    {
      id: "CLM-2024-003",
      patientName: "Emily Davis",
      patientId: "PAT-003",
      dateOfBirth: "1992-11-08",
      provider: "Wellness Clinic",
      providerId: "PRV-003",
      providerSpecialty: "Surgery",
      serviceDate: "2024-01-13",
      submissionDate: "2024-01-14",
      amount: 2100.0,
      processingRate: 76.1,
      riskScore: 85,
      flags: 15,
      status: "Flagged",
      diagnosis: "Complex Surgical Procedure",
      procedureCode: "47562",
      insuranceId: "INS-456123",
      processingTime: "6.8 days",
      notes: "High-value claim flagged for manual review due to unusual billing patterns.",
      adjudicationNotes: "Flagged for potential billing anomalies. Requires senior review.",
      statusHistory: [
        { status: "Pending", date: "2024-01-14", user: "System" },
        { status: "Flagged", date: "2024-01-15", user: "AI System" },
      ],
      documents: [
        { name: "Surgical Report.pdf", type: "pdf", size: "4.1 MB" },
        { name: "Pre-op Assessment.pdf", type: "pdf", size: "1.5 MB" },
        { name: "Invoice.pdf", type: "pdf", size: "0.9 MB" },
      ],
      flaggedIndicators: ["Suspicious Billing Pattern", "High-Value Claim", "Provider History"],
      confidenceLevel: 92,
      auditTrail: [
        { action: "Claim Submitted", timestamp: "2024-01-14 08:20:00", user: "Provider Portal" },
        { action: "AI Flag Triggered", timestamp: "2024-01-15 09:15:00", user: "AI System" },
        { action: "Assigned for Review", timestamp: "2024-01-15 09:16:00", user: "System" },
      ],
    },
    {
      id: "CLM-2024-004",
      patientName: "Robert Wilson",
      patientId: "PAT-004",
      dateOfBirth: "1965-04-30",
      provider: "Metro Health Services",
      providerId: "PRV-004",
      providerSpecialty: "Cardiology",
      serviceDate: "2024-01-12",
      submissionDate: "2024-01-13",
      amount: 675.0,
      processingRate: 91.8,
      riskScore: 32,
      flags: 4,
      status: "Forwarded",
      diagnosis: "Cardiology Consultation",
      procedureCode: "99243",
      insuranceId: "INS-987654",
      processingTime: "1.8 days",
      notes: "Routine cardiology follow-up. Processing within normal timeframe.",
      adjudicationNotes: "Forwarded to insurer for final approval.",
      statusHistory: [
        { status: "Pending", date: "2024-01-13", user: "System" },
        { status: "Under Review", date: "2024-01-14", user: "Jane Smith" },
        { status: "Forwarded", date: "2024-01-15", user: "Jane Smith" },
      ],
      documents: [
        { name: "Cardiology Report.pdf", type: "pdf", size: "2.1 MB" },
        { name: "Referral Letter.pdf", type: "pdf", size: "0.6 MB" },
      ],
      flaggedIndicators: ["None"],
      confidenceLevel: 88,
      auditTrail: [
        { action: "Claim Submitted", timestamp: "2024-01-13 13:10:00", user: "Provider Portal" },
        { action: "Review Completed", timestamp: "2024-01-14 16:45:00", user: "Jane Smith" },
        { action: "Forwarded to Insurer", timestamp: "2024-01-15 10:30:00", user: "Jane Smith" },
      ],
    },
  ]

  const providers = [...new Set(claimsData.map((claim) => claim.provider))]

  // Filter claims based on all criteria
  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      searchTerm === "" ||
      claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All Status" || claim.status === statusFilter
    const matchesProvider = providerFilter === "All Providers" || claim.provider === providerFilter
    const matchesRiskScore = claim.riskScore >= riskScoreFilter[0] && claim.riskScore <= riskScoreFilter[1]

    const matchesDateRange =
      (!dateRange.start || new Date(claim.serviceDate) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(claim.serviceDate) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesProvider && matchesRiskScore && matchesDateRange
  })

  // Pagination
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage)
  const startIndex = (currentPageNum - 1) * itemsPerPage
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage)

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim)
    setShowModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Flagged":
        return "bg-red-100 text-red-900 border-red-200"
      case "Forwarded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "Flagged":
        return <AlertTriangle className="w-4 h-4" />
      case "Forwarded":
        return <Send className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">Claims Review</h1>
                  <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full flex items-center">
                    🤖 AI-Powered
                  </span>
                </div>
                <p className="text-gray-600 mt-1">Review and manage insurance claims with AI assistance</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500 transition-all duration-200">
                  📊 Export
                </button>
                <button className="px-6 py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-all duration-200 shadow-lg">
                  ➕ New Claim
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6">
              {/* Search Bar */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by Patient Name, Claim ID, or Provider"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-200"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                    >
                      <option>All Status</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Flagged</option>
                      <option>Forwarded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                    <select
                      value={providerFilter}
                      onChange={(e) => setProviderFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                    >
                      <option>All Providers</option>
                      {providers.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Score Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={riskScoreFilter[0]}
                        onChange={(e) => setRiskScoreFilter([Number.parseInt(e.target.value), riskScoreFilter[1]])}
                        className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={riskScoreFilter[1]}
                        onChange={(e) => setRiskScoreFilter([riskScoreFilter[0], Number.parseInt(e.target.value)])}
                        className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="flex-1 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="flex-1 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Claims Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Claims ({filteredClaims.length} total)</h2>
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredClaims.length)} of{" "}
                  {filteredClaims.length}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Claim ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date of Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedClaims.map((claim) => (
                    <tr
                      key={claim.id}
                      className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => handleViewClaim(claim)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{claim.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{claim.patientName}</div>
                        <div className="text-xs text-gray-500">{claim.patientId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{claim.provider}</div>
                        <div className="text-xs text-gray-500">{claim.providerSpecialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {claim.serviceDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            claim.status,
                          )}`}
                        >
                          {getStatusIcon(claim.status)}
                          <span className="ml-1">{claim.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div
                                className={`h-4 rounded-full ${
                                  claim.riskScore >= 70
                                    ? "bg-gradient-to-r from-red-600 to-red-900"
                                    : claim.riskScore >= 40
                                      ? "bg-gradient-to-r from-yellow-400 to-red-600"
                                      : "bg-gradient-to-r from-green-500 to-yellow-400"
                                }`}
                                style={{ width: `${claim.riskScore}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-center">{claim.riskScore}/100</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewClaim(claim)
                          }}
                          className="inline-flex items-center px-3 py-1 text-sm text-red-900 hover:text-red-800 focus:outline-none focus:underline transition-colors duration-150"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {currentPageNum} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                  disabled={currentPageNum === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                  disabled={currentPageNum === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Detail Modal */}
      {showModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">Claim Details</h3>
                  <p className="text-gray-600 mt-1">{selectedClaim.id}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Claim Summary */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">Claim Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Patient Information
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>{" "}
                            <span className="font-medium">{selectedClaim.patientName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">ID:</span>{" "}
                            <span className="font-medium">{selectedClaim.patientId}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">DOB:</span>{" "}
                            <span className="font-medium">{selectedClaim.dateOfBirth}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          Provider Information
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>{" "}
                            <span className="font-medium">{selectedClaim.provider}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">ID:</span>{" "}
                            <span className="font-medium">{selectedClaim.providerId}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Specialty:</span>{" "}
                            <span className="font-medium">{selectedClaim.providerSpecialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-blue-200">
                      <div>
                        <span className="text-gray-600">Date of Service:</span>{" "}
                        <span className="font-medium">{selectedClaim.serviceDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Submission Date:</span>{" "}
                        <span className="font-medium">{selectedClaim.submissionDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Claim Status */}
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-4">Claim Status</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Status:</span>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedClaim.status)}`}
                        >
                          {selectedClaim.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adjudication Notes</label>
                        <textarea
                          value={selectedClaim.adjudicationNotes}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                          rows="3"
                          readOnly
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Status History</h5>
                        <div className="space-y-2">
                          {selectedClaim.statusHistory.map((history, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="font-medium">{history.status}</span>
                              <span className="text-gray-500">
                                {history.date} - {history.user}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documentation */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-900 mb-4">Documentation</h4>
                    <div className="space-y-3">
                      {selectedClaim.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200"
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-green-600 mr-3" />
                            <div>
                              <div className="font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.size}</div>
                            </div>
                          </div>
                          <button className="flex items-center text-green-600 hover:text-green-800">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audit Trail */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-900 mb-4">Audit Trail</h4>
                    <div className="space-y-3">
                      {selectedClaim.auditTrail.map((audit, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-purple-200"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{audit.action}</div>
                            <div className="text-sm text-gray-500">
                              {audit.timestamp} - {audit.user}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* AI/Fraud Score Panel */}
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4">AI Risk Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Risk Score</span>
                          <span className="text-lg font-bold text-gray-900">{selectedClaim.riskScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${
                              selectedClaim.riskScore >= 70
                                ? "bg-gradient-to-r from-red-600 to-red-900"
                                : selectedClaim.riskScore >= 40
                                  ? "bg-gradient-to-r from-yellow-400 to-red-600"
                                  : "bg-gradient-to-r from-green-500 to-yellow-400"
                            }`}
                            style={{ width: `${selectedClaim.riskScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Flagged Indicators</h5>
                        <div className="space-y-1">
                          {selectedClaim.flaggedIndicators.map((indicator, index) => (
                            <div key={index} className="text-sm text-gray-600 flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-2 text-red-500" />
                              {indicator}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Confidence Level:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedClaim.confidenceLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approve for Payment
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">
                        <Send className="w-4 h-4 mr-2" />
                        Forward to Insurer
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors duration-150">
                        <Flag className="w-4 h-4 mr-2" />
                        Manually Flag
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Add Internal Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClaimsReview
