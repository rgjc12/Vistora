import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClaims,
  setSearchQuery,
  removeClaim,
} from "../../../store/slices/claimsSlice";
import SearchBar from "../General/SearchBar";
import Pagination from "../General/Pagination";
import { useNavigate } from "react-router-dom"

const Claims = () => {
  const navigate = useNavigate()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)

  useEffect(() => {
    loadClaimsFromStorage()
  }, [])

  // Add this useEffect after the existing useEffect
  useEffect(() => {
    // Check if we should filter drafts based on navigation state
    const state = window.history.state
    if (state?.filterDrafts) {
      setFilterStatus("draft")
    }
  }, [])

  const loadClaimsFromStorage = () => {
    try {
      const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")

      // Transform the stored claims to match the expected format
      const transformedClaims = storedClaims.map((claim) => {
        // Calculate age from date of birth
        const calculateAge = (dateOfBirth) => {
          if (!dateOfBirth) return "N/A"
          const today = new Date()
          const birthDate = new Date(dateOfBirth)
          let age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
          }
          return age
        }

        return {
          id: claim.id,
          claimId: claim.claimId,
          name: `${claim.patient?.firstName || ""} ${claim.patient?.lastName || ""}`.trim() || "Unknown Patient",
          provider: claim.provider?.name || "Unknown Provider",
          details: `${claim.service?.diagnosis?.primary || "No diagnosis"} - ${claim.service?.procedures?.[0]?.code || "No procedure"}`,
          phoneNumber: claim.patient?.phone || "N/A",
          status: claim.isDraft ? "Draft" : getRandomStatus(),
          dateOfService: claim.service?.dateOfService || "N/A",
          totalCharges:
            claim.service?.procedures?.reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0) || 0,
          insurance: claim.insurance?.primary?.company || "Unknown Insurance",
          savedAt: claim.savedAt,
          isDraft: claim.isDraft,
          fullData: claim,
          patientAge: calculateAge(claim.patient?.dateOfBirth),
          patientGender: claim.patient?.gender || "N/A",
        }
      })

      setClaims(transformedClaims)
      setLoading(false)
    } catch (error) {
      console.error("Error loading claims:", error)
      setLoading(false)
    }
  }

  const getRandomStatus = () => {
    const statuses = ["In Review", "Approved", "Pending", "Requires Info"]
    const weights = [0.4, 0.3, 0.2, 0.1] // 40% In Review, 30% Approved, etc.
    const random = Math.random()
    let sum = 0
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i]
      if (random <= sum) return statuses[i]
    }
    return statuses[0]
  }

  const handleRemoveClaim = (claimId) => {
    if (window.confirm("Are you sure you want to remove this claim?")) {
      try {
        const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")
        const updatedClaims = storedClaims.filter((claim) => claim.id !== claimId)
        localStorage.setItem("vistora_claims", JSON.stringify(updatedClaims))
        loadClaimsFromStorage() // Reload the claims
      } catch (error) {
        console.error("Error removing claim:", error)
      }
    }
  }

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim)
    setShowViewModal(true)
  }

  const handleEditDraft = (claim) => {
    console.log("Editing claim:", claim) // Debug log

    // Store the full claim data for editing with proper structure
    const claimDataToEdit = {
      ...claim.fullData,
      uploadedFiles: claim.fullData.uploadedFiles || [],
    }

    console.log("Storing claim data for editing:", claimDataToEdit) // Debug log
    localStorage.setItem("edit_claim_draft", JSON.stringify(claimDataToEdit))

    // Navigate to submit claim page
    navigate("/submit-claim")
  }

  const updateClaimStatus = (claimId, newStatus) => {
    try {
      const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")
      const updatedClaims = storedClaims.map((claim) =>
        claim.id === claimId ? { ...claim, status: newStatus } : claim,
      )
      localStorage.setItem("vistora_claims", JSON.stringify(updatedClaims))
      loadClaimsFromStorage()
    } catch (error) {
      console.error("Error updating claim status:", error)
    }
  }

  // Filter claims based on search query and status
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      searchQuery === "" ||
      claim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "draft" && claim.isDraft) ||
      (filterStatus === "submitted" && !claim.isDraft)

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "bg-amber-100 text-amber-800"
      case "In Review":
        return "bg-blue-100 text-blue-800"
      case "Approved":
        return "bg-emerald-100 text-emerald-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Requires Info":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // View Modal Component
  const ViewModal = () => {
    if (!selectedClaim || !showViewModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Claim Details
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Claim Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Claim ID</div>
                  <div className="text-lg font-bold text-emerald-600">{selectedClaim.claimId}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedClaim.status)}`}
                  >
                    {selectedClaim.status}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Total Amount</div>
                  <div className="text-2xl font-bold text-emerald-600">${selectedClaim.totalCharges.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Date of Service</div>
                  <div className="text-slate-900">{selectedClaim.dateOfService}</div>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Name</div>
                  <div className="text-slate-900">{selectedClaim.name}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Date of Birth</div>
                  <div className="text-slate-900">{selectedClaim.fullData.patient?.dateOfBirth || "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Phone</div>
                  <div className="text-slate-900">{selectedClaim.phoneNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Email</div>
                  <div className="text-slate-900">{selectedClaim.fullData.patient?.email || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Provider Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Provider Name</div>
                  <div className="text-slate-900">{selectedClaim.provider}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">NPI</div>
                  <div className="text-slate-900">{selectedClaim.fullData.provider?.npi || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Service Details
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Primary Diagnosis</div>
                  <div className="text-slate-900">{selectedClaim.fullData.service?.diagnosis?.primary || "N/A"}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Procedures</div>
                  <div className="space-y-2">
                    {selectedClaim.fullData.service?.procedures?.map((proc, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold">
                          {proc.code} - {proc.description}
                        </div>
                        <div className="text-sm text-slate-600">
                          Units: {proc.units} | Charges: ${proc.charges}
                        </div>
                      </div>
                    )) || "No procedures"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            {selectedClaim.isDraft && (
              <button
                onClick={() => {
                  setShowViewModal(false)
                  handleEditDraft(selectedClaim)
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
              >
                Edit Draft
              </button>
            )}
            <button
              onClick={() => setShowViewModal(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-['Manrope',_sans-serif]">Loading claims data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Claims Management
          </h1>
          <p className="text-slate-600 mt-1">Manage your submitted claims and drafts</p>
        </div>
        <button
          onClick={() => navigate("/submit-claim")}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <span>+</span>
          <span>Submit New Claim</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search claims by patient name, claim ID, provider..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <select
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Claims</option>
              <option value="draft">Drafts Only</option>
              <option value="submitted">Submitted Only</option>
            </select>
            <button
              onClick={loadClaimsFromStorage}
              className="px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Claims Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-emerald-600 text-xl">📋</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                {claims.length}
              </div>
              <div className="text-emerald-700 text-sm font-semibold">Total Claims</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-amber-600 text-xl">📝</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                {claims.filter((c) => c.isDraft).length}
              </div>
              <div className="text-amber-700 text-sm font-semibold">Draft Claims</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 text-xl">⏳</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                {claims.filter((c) => c.status === "In Review").length}
              </div>
              <div className="text-blue-700 text-sm font-semibold">In Review</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                {claims.filter((c) => c.status === "Approved").length}
              </div>
              <div className="text-green-700 text-sm font-semibold">Approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {filteredClaims.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              No Claims Found
            </h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "No claims match your current search or filter criteria."
                : "You haven't created any claims yet. Start by submitting your first claim."}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <button
                onClick={() => navigate("/submit-claim")}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold"
              >
                Submit Your First Claim
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Date of Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total Charges
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{claim.claimId}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      <div>{claim.name}</div>
                      <div className="text-xs text-slate-500">
                        Age: {claim.patientAge}, Gender: {claim.patientGender}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{claim.provider}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{claim.details}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{claim.dateOfService}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      ${claim.totalCharges.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(claim)}
                          className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold hover:bg-emerald-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          View
                        </button>
                        {claim.isDraft && (
                          <button
                            onClick={() => handleEditDraft(claim)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveClaim(claim.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredClaims.length > 0 && (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {filteredClaims.length} of {claims.length} claims
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">
                Previous
              </button>
              <span className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold">1</span>
              <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      <ViewModal />
    </div>
  )
}

export default Claims