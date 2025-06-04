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
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [selectedAuditClaim, setSelectedAuditClaim] = useState(null)
  const [showFlaggedClaimsModal, setShowFlaggedClaimsModal] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: "lastUpdated", direction: "desc" })

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

        // Calculate time ago for last updated
        const getTimeAgo = (dateString) => {
          const now = new Date()
          const date = new Date(dateString)
          const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

          if (diffInHours < 1) return "Just now"
          if (diffInHours < 24) return `${diffInHours} hours ago`
          const diffInDays = Math.floor(diffInHours / 24)
          if (diffInDays === 1) return "1 day ago"
          if (diffInDays < 30) return `${diffInDays} days ago`
          const diffInMonths = Math.floor(diffInDays / 30)
          if (diffInMonths === 1) return "1 month ago"
          if (diffInMonths < 12) return `${diffInMonths} months ago`
          return `${Math.floor(diffInMonths / 12)} year${Math.floor(diffInMonths / 12) > 1 ? "s" : ""} ago`
        }

        // Generate AI insights for each claim
        const generateAIInsights = (claimData) => {
          const totalAmount =
            claimData.service?.procedures?.reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0) ||
            0

          const isHighValue = totalAmount > 5000
          const isMissingDocs = !claimData.uploadedFiles || claimData.uploadedFiles.length === 0
          const isComplexProcedure = claimData.service?.procedures?.length > 2

          let approvalProbability = 85
          let estimatedDays = "2-3"
          const riskFlags = []
          const confidence = 92

          if (isHighValue) {
            approvalProbability -= 10
            estimatedDays = "3-5"
            riskFlags.push("High-value claim requires additional review")
          }

          if (isMissingDocs) {
            approvalProbability -= 15
            estimatedDays = "5-7"
            riskFlags.push("Missing discharge summary")
          }

          if (isComplexProcedure) {
            approvalProbability -= 5
            riskFlags.push("Multiple procedures require verification")
          }

          const hasRiskFlags = riskFlags.length > 0

          return {
            approvalProbability: Math.max(approvalProbability, 45),
            estimatedDays,
            riskFlags,
            confidence: hasRiskFlags ? confidence - 10 : confidence,
            summary: hasRiskFlags
              ? `This claim may require additional documentation. Estimated approval: ${estimatedDays} days.`
              : `This claim is likely to be approved in ${estimatedDays} days based on similar patterns.`,
            isFlagged: hasRiskFlags,
          }
        }

        // Generate audit trail for each claim
        const generateAuditTrail = (claimData) => {
          const baseTime = new Date(claimData.savedAt)
          const trail = []

          // Initial submission
          trail.push({
            action: "Claim Created",
            timestamp: baseTime.toISOString(),
            actor: "System User",
            details: "Initial claim draft created",
            hash: `0x${Math.random().toString(36).substr(2, 16)}`,
            verified: true,
          })

          // File uploads
          if (claimData.uploadedFiles && claimData.uploadedFiles.length > 0) {
            claimData.uploadedFiles.forEach((file, index) => {
              const uploadTime = new Date(baseTime.getTime() + (index + 1) * 60000)
              trail.push({
                action: "Document Uploaded",
                timestamp: uploadTime.toISOString(),
                actor: "System User",
                details: `Uploaded: ${file.name}`,
                hash: file.hash || `0x${Math.random().toString(36).substr(2, 16)}`,
                verified: true,
              })
            })
          }

          // Status changes for submitted claims
          if (!claimData.isDraft) {
            const submitTime = new Date(baseTime.getTime() + 300000) // 5 minutes later
            trail.push({
              action: "Claim Submitted",
              timestamp: submitTime.toISOString(),
              actor: "System User",
              details: "Claim submitted for processing",
              hash: `0x${Math.random().toString(36).substr(2, 16)}`,
              verified: true,
            })

            const reviewTime = new Date(baseTime.getTime() + 3600000) // 1 hour later
            trail.push({
              action: "Under Review",
              timestamp: reviewTime.toISOString(),
              actor: "TPA Reviewer",
              details: "Claim assigned to reviewer",
              hash: `0x${Math.random().toString(36).substr(2, 16)}`,
              verified: true,
            })
          }

          return trail.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        }

        const aiInsights = generateAIInsights(claim)
        const auditTrail = generateAuditTrail(claim)

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
          lastUpdated: getTimeAgo(claim.savedAt),
          lastUpdatedDate: new Date(claim.savedAt).toLocaleDateString(),
          lastUpdatedTime: new Date(claim.savedAt).toLocaleTimeString(),
          isDraft: claim.isDraft,
          fullData: claim,
          patientAge: calculateAge(claim.patient?.dateOfBirth),
          patientGender: claim.patient?.gender || "N/A",
          aiInsights,
          auditTrail,
          lastUpdatedTimestamp: new Date(claim.savedAt).toLocaleString(), // Full timestamp
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

    // Clear any existing draft data first
    localStorage.removeItem("edit_claim_draft")
    localStorage.removeItem("claim_form_data")

    // Store the complete claim data for editing with proper structure
    const claimDataToEdit = {
      ...claim.fullData,
      uploadedFiles: claim.fullData.uploadedFiles || [],
      // Ensure we preserve the original ID for updating
      originalId: claim.id,
      isEditing: true, // Flag to indicate this is an edit operation
      editingClaimId: claim.id, // Store the ID of the claim being edited
    }

    console.log("Storing claim data for editing:", claimDataToEdit)

    // Store in both possible keys that the form might check
    localStorage.setItem("edit_claim_draft", JSON.stringify(claimDataToEdit))
    localStorage.setItem("claim_form_data", JSON.stringify(claimDataToEdit))

    // Set a flag to indicate we're editing
    localStorage.setItem("editing_mode", "true")

    // Navigate to submit claim page - THIS IS THE KEY FIX
    navigate("/dashboard/SubmitClaim")
  }

  const handleTrackClaim = (claim) => {
    setSelectedAuditClaim(claim)
    setShowAuditModal(true)
  }

  const handleViewFlaggedClaims = () => {
    const flaggedClaims = claims.filter((claim) => claim.aiInsights.isFlagged)
    setShowFlaggedClaimsModal(true)
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

  // Sort claims based on sortConfig
  const sortedClaims = [...claims].sort((a, b) => {
    if (!sortConfig.key) return 0

    if (sortConfig.key === "lastUpdated") {
      // Sort by the actual date for "lastUpdated"
      const dateA = new Date(a.savedAt)
      const dateB = new Date(b.savedAt)
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortConfig.key === "totalCharges") {
      return sortConfig.direction === "asc" ? a.totalCharges - b.totalCharges : b.totalCharges - a.totalCharges
    }

    // Default string comparison for other fields
    const valueA = a[sortConfig.key]
    const valueB = b[sortConfig.key]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Handle column sorting
  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Filter claims based on search query and status
  const filteredClaims = sortedClaims.filter((claim) => {
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

  // AI Insights Sidebar Component
  const AIInsightsSidebar = ({ claim }) => {
    if (!claim?.aiInsights) return null

    const insights = claim.aiInsights

    return (
      <div className="w-80 bg-gradient-to-b from-purple-50 to-indigo-50 border-l-2 border-purple-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-xl">🤖</span>
          </div>
          <div>
            <h3 className="font-bold text-purple-900 text-lg">AI Analysis</h3>
            <p className="text-purple-700 text-sm">Smart claim insights</p>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-xl p-4 mb-4 border border-purple-100">
          <h4 className="font-semibold text-slate-900 mb-2">Prediction Summary</h4>
          <p className="text-sm text-slate-700 mb-3">{insights.summary}</p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Approval Probability</span>
                <span className="font-semibold text-emerald-600">{insights.approvalProbability}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${insights.approvalProbability}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">AI Confidence</span>
                <span className="font-semibold text-purple-600">{insights.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        {insights.riskFlags.length > 0 && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
              <span className="mr-2">⚠️</span>
              Risk Flags
            </h4>
            <div className="space-y-2">
              {insights.riskFlags.map((flag, index) => (
                <div key={index} className="text-sm text-amber-800 bg-amber-100 px-3 py-2 rounded-lg">
                  {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-xl p-4 mt-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Recommendations
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            {insights.riskFlags.length > 0 ? (
              <>
                <div>• Upload missing documentation</div>
                <div>• Verify procedure codes</div>
                <div>• Contact provider for clarification</div>
              </>
            ) : (
              <>
                <div>• All requirements met</div>
                <div>• Ready for processing</div>
                <div>• No action required</div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Audit Trail Modal
  const AuditTrailModal = () => {
    if (!showAuditModal || !selectedAuditClaim) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-xl">🛡️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-900">Tamper-Proof Audit Trail</h2>
                  <p className="text-emerald-700">Claim ID: {selectedAuditClaim.claimId}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-emerald-600">🔒</span>
                  <span className="font-semibold text-emerald-900">Tamperproof, verified via ledger system</span>
                </div>
                <p className="text-emerald-700 text-sm">
                  All actions are cryptographically signed and stored on an immutable blockchain ledger.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedAuditClaim.auditTrail.map((entry, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${entry.verified ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></div>
                        <h4 className="font-semibold text-slate-900">{entry.action}</h4>
                        {entry.verified && <span className="text-emerald-600 text-sm">✓ Verified</span>}
                      </div>
                      <p className="text-slate-700 mb-2">{entry.details}</p>
                      <div className="text-sm text-slate-500 space-y-1">
                        <div>Actor: {entry.actor}</div>
                        <div>Timestamp: {new Date(entry.timestamp).toLocaleString()}</div>
                        <div className="font-mono text-xs bg-slate-100 p-2 rounded">Hash: {entry.hash}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setShowAuditModal(false)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold"
            >
              Close Audit Trail
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Flagged Claims Modal
  const FlaggedClaimsModal = () => {
    if (!showFlaggedClaimsModal) return null

    const flaggedClaims = claims.filter((claim) => claim.aiInsights.isFlagged)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900">AI Flagged Claims</h2>
                  <p className="text-red-700">{flaggedClaims.length} claims require attention</p>
                </div>
              </div>
              <button
                onClick={() => setShowFlaggedClaimsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {flaggedClaims.map((claim) => (
                <div key={claim.id} className="border-2 border-red-100 rounded-xl p-6 bg-red-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{claim.claimId}</h3>
                      <p className="text-slate-600">
                        Patient: {claim.name} | Amount: ${claim.totalCharges.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setShowFlaggedClaimsModal(false)
                          handleViewDetails(claim)
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200"
                      >
                        View Details
                      </button>
                      {claim.isDraft && (
                        <button
                          onClick={() => {
                            setShowFlaggedClaimsModal(false)
                            handleEditDraft(claim)
                          }}
                          className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm hover:bg-orange-200"
                        >
                          Edit Draft
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">Risk Flags:</h4>
                    {claim.aiInsights.riskFlags.map((flag, index) => (
                      <div key={index} className="bg-red-100 border border-red-200 p-3 rounded-lg">
                        <div className="text-red-800">{flag}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setShowFlaggedClaimsModal(false)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced View Modal with AI Sidebar
  const ViewModal = () => {
    if (!selectedClaim || !showViewModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
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
                    <div className="text-sm font-semibold text-slate-500 mb-1">Last Updated</div>
                    <div className="text-slate-900">{selectedClaim.lastUpdatedTimestamp}</div>
                    <div className="text-sm text-slate-500">{selectedClaim.lastUpdated}</div>
                  </div>
                </div>
              </div>

              {/* Tamper-Proof Section */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-xl">🛡️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900">Tamper-Proof Records</h3>
                      <p className="text-emerald-700 text-sm">Blockchain-verified claim integrity</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowViewModal(false)
                      handleTrackClaim(selectedClaim)
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold"
                  >
                    View Audit Trail
                  </button>
                </div>
                <div className="text-sm text-emerald-700">
                  <p>✓ All claim data is cryptographically secured</p>
                  <p>✓ Complete audit trail maintained on immutable ledger</p>
                  <p>✓ Anti-fraud measures automatically applied</p>
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

          {/* AI Insights Sidebar */}
          <AIInsightsSidebar claim={selectedClaim} />
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

  const flaggedClaimsCount = claims.filter((claim) => claim.aiInsights.isFlagged).length

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
      </div>

      {/* AI Predictions Card */}
      {flaggedClaimsCount > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-purple-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  AI Predictions
                </h3>
                <p className="text-purple-700">{flaggedClaimsCount} flagged claims may be at risk this week</p>
              </div>
            </div>
            <button
              onClick={handleViewFlaggedClaims}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 font-semibold"
            >
              View Flagged Claims →
            </button>
          </div>
        </div>
      )}

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

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 text-xl">🤖</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                {flaggedClaimsCount}
              </div>
              <div className="text-purple-700 text-sm font-semibold">AI Flagged</div>
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
                : "You haven't created any claims yet."}
            </p>
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
                  <th
                    className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                    onClick={() => handleSort("lastUpdated")}
                  >
                    Last Updated {sortConfig.key === "lastUpdated" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <span>{claim.claimId}</span>
                        {claim.aiInsights.isFlagged && <span className="text-red-500 text-xs">⚠️</span>}
                      </div>
                    </td>
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
                    <td className="px-6 py-4 text-sm text-slate-900">
                      <div>{claim.lastUpdatedTimestamp}</div>
                      <div className="text-xs text-slate-500">{claim.lastUpdated}</div>
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
                          onClick={() => handleTrackClaim(claim)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-semibold hover:bg-purple-50 px-2 py-1 rounded transition-all duration-200"
                        >
                          Track
                        </button>
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

      {/* Modals */}
      <ViewModal />
      <AuditTrailModal />
      <FlaggedClaimsModal />
    </div>
  )
}

export default Claims
