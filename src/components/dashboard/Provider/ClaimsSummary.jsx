import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../buttons/PrimaryButton";
import SmallerButton from "../../buttons/SmallerButton";
import DashButton from "../../buttons/DashButton";
import {
  Ban,
  Clock,
  DollarSign,
  FileWarning,
  Loader,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";
import DashboardStatCard from "../General/DashboardStatCard";
import ReimbursementChartDashboard from "./ReimbursementChartDashboard";
import ClaimBreakdownCard from "./ClaimBreakdownCard";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Skeleton loading component
const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="h-8 bg-gray-200 rounded w-64"></div>
    </div>

    {/* Stats skeleton */}
    <div className="grid grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>

    {/* Table skeleton */}
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClaimsSummary = ({ onSubmitClick }) => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: [],
    dateRange: { start: "", end: "" },
    amountRange: { min: "", max: "" },
  });
  const [searchQuery, setSearchQueryLocal] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedAIInsights, setSelectedAIInsights] = useState(null);
  const [maskedIds, setMaskedIds] = useState(true);
  const [showFlaggedClaimsModal, setShowFlaggedClaimsModal] = useState(false);
  const [flaggedClaimsData, setFlaggedClaimsData] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const addNotification = (type, title, message, claimId = null) => {
    const notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type,
      priority: type === "claim" ? "medium" : "low",
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      actionText: type === "claim" ? "View Claim" : "View Details",
      actionUrl: type === "claim" ? "/dashboard/claims" : "/dashboard",
      claimId,
    };

    const existingNotifications = JSON.parse(
      localStorage.getItem("vistora_notifications") || "[]"
    );
    existingNotifications.unshift(notification);
    localStorage.setItem(
      "vistora_notifications",
      JSON.stringify(existingNotifications)
    );
  };

  useEffect(() => {
    loadClaimsFromStorage();
  }, []);

  const loadClaimsFromStorage = () => {
    try {
      const storedClaims = JSON.parse(
        localStorage.getItem("vistora_claims") || "[]"
      );

      // Transform stored claims to match ClaimsSummary format
      const transformedClaims = storedClaims.map((claim, index) => {
        const totalCharges =
          claim.service?.procedures?.reduce(
            (total, proc) => total + (Number.parseFloat(proc.charges) || 0),
            0
          ) || 0;

        // Generate realistic status based on submission date and draft status
        let status = "Draft";
        if (!claim.isDraft) {
          const daysSinceSubmission = Math.floor(
            (Date.now() - new Date(claim.savedAt).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (daysSinceSubmission >= 5) {
            status = Math.random() > 0.3 ? "Paid" : "Rejected";
          } else if (daysSinceSubmission >= 2) {
            status = "Under Review";
          } else {
            status = "Submitted";
          }
        }

        // Calculate age from date of birth
        const calculateAge = (dateOfBirth) => {
          if (!dateOfBirth) return Math.floor(Math.random() * 60) + 20; // fallback
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age;
        };

        return {
          id: claim.claimId,
          patientId: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
          provider: claim.provider?.name || "Unknown Provider",
          date:
            claim.service?.dateOfService ||
            new Date(claim.savedAt).toLocaleDateString(),
          amount: `$${totalCharges.toFixed(2)}`,
          status: status,
          lastUpdated: getTimeAgo(claim.savedAt),
          aiFlag: Math.random() > 0.8, // 20% chance of AI flag
          docsMissing: Math.random() > 0.9, // 10% chance of missing docs
          patientAge: calculateAge(claim.patient?.dateOfBirth),
          patientGender:
            claim.patient?.gender || (Math.random() > 0.5 ? "M" : "F"),
          fullData: claim,
          isDraft: claim.isDraft,
        };
      });

      setClaims(transformedClaims);
      setLoading(false);
    } catch (error) {
      console.error("Error loading claims:", error);
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const handleSubmitNewClaim = () => {
    navigate("/dashboard/SubmitClaim");
  };

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim);
    setShowViewModal(true);
  };

  const handleEditClaim = (claim) => {
    console.log("Editing claim:", claim); // Debug log

    // Store the full claim data for editing
    const claimDataToEdit = {
      ...claim.fullData,
      uploadedFiles: claim.fullData.uploadedFiles || [],
    };

    localStorage.setItem("edit_claim_draft", JSON.stringify(claimDataToEdit));
    localStorage.setItem("editing_mode", "true");

    // Navigate to submit claim page
    navigate("/dashboard/SubmitClaim");
  };

  const handleTrackClaim = (claim) => {
    showToast(`Tracking claim ${claim.id}: Status - ${claim.status}`, "info");
  };

  const handleResubmitClaim = (claim) => {
    if (claim.status === "Rejected") {
      localStorage.setItem("edit_claim_draft", JSON.stringify(claim.fullData));
      localStorage.setItem("editing_mode", "true");
      navigate("/dashboard/SubmitClaim");
      showToast("Claim loaded for resubmission", "info");
    }
  };

  const handleDownloadEOB = (claim) => {
    if (claim.status === "Paid") {
      showToast(`EOB downloaded for claim ${claim.id}`, "success");
    }
  };

  const handleAIFlagDetails = (claim) => {
    // Generate AI insights based on claim data
    const aiInsights = generateAIInsights(claim);
    setSelectedAIInsights(aiInsights);
    setShowAIModal(true);
  };

  const generateAIInsights = (claim) => {
    // Base insights on claim data or generate random insights
    const insights = {
      claimId: claim.id,
      patientId: claim.patientId,
      riskScore: Math.floor(Math.random() * 40) + 60, // 60-99
      confidenceLevel: Math.floor(Math.random() * 20) + 80, // 80-99
      flags: [],
      recommendations: [],
    };

    // Generate flags based on claim data
    if (claim.status === "Rejected") {
      insights.flags.push("Claim has been rejected previously");
      insights.recommendations.push(
        "Review rejection reason and resubmit with corrections"
      );
    }

    if (claim.docsMissing) {
      insights.flags.push("Missing required documentation");
      insights.recommendations.push("Upload all required supporting documents");
    }

    // Add random flags based on procedure codes if available
    if (claim.fullData?.service?.procedures) {
      const hasProcedureOver1000 = claim.fullData.service.procedures.some(
        (p) => Number.parseFloat(p.charges) > 1000
      );

      if (hasProcedureOver1000) {
        insights.flags.push("High-value procedure detected");
        insights.recommendations.push(
          "Ensure proper authorization is in place"
        );
      }
    }

    // Add more random flags if needed
    const possibleFlags = [
      "Unusual billing pattern detected",
      "Similar claim submitted recently",
      "Procedure code and diagnosis code mismatch",
      "Provider history indicates potential compliance issues",
    ];

    const possibleRecommendations = [
      "Review coding for accuracy",
      "Verify patient eligibility",
      "Check for duplicate submissions",
      "Confirm medical necessity documentation",
    ];

    // Add 1-2 random flags
    const randomFlagCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < randomFlagCount; i++) {
      const randomFlag =
        possibleFlags[Math.floor(Math.random() * possibleFlags.length)];
      if (!insights.flags.includes(randomFlag)) {
        insights.flags.push(randomFlag);
      }
    }

    // Add 1-3 random recommendations
    const randomRecommendationCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < randomRecommendationCount; i++) {
      const randomRecommendation =
        possibleRecommendations[
          Math.floor(Math.random() * possibleRecommendations.length)
        ];
      if (!insights.recommendations.includes(randomRecommendation)) {
        insights.recommendations.push(randomRecommendation);
      }
    }

    return insights;
  };

  const getActionButtons = (claim) => {
    const buttons = [];

    if (claim.status === "Rejected") {
      buttons.push(
        <button
          key="resubmit"
          className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200"
          onClick={() => handleResubmitClaim(claim)}
        >
          Resubmit
        </button>
      );
      buttons.push(
        <button
          key="edit-rejected"
          className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-orange-50 px-2 py-1 rounded transition-all duration-200"
          onClick={() => handleEditClaim(claim)}
        >
          Edit
        </button>
      );
    }

    if (claim.status === "Paid") {
      buttons.push(
        <button
          key="download"
          className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-green-50 px-2 py-1 rounded transition-all duration-200"
          onClick={() => handleDownloadEOB(claim)}
        >
          Download EOB
        </button>
      );
    }

    buttons.push(
      <button
        key="view"
        className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200"
        onClick={() => handleViewClaim(claim)}
      >
        View
      </button>
    );

    if (claim.isDraft) {
      buttons.push(
        <button
          key="edit"
          className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200"
          onClick={() => handleEditClaim(claim)}
        >
          Edit
        </button>
      );
    }

    // Add edit button for AI flagged claims
    if (claim.aiFlag && !claim.isDraft && claim.status !== "Rejected") {
      buttons.push(
        <button
          key="edit-flagged"
          className="text-neutral-600 hover:text-neutral-800 text-xs mr-2 hover:bg-purple-50 px-2 py-1 rounded transition-all duration-200"
          onClick={() => handleEditClaim(claim)}
        >
          Edit
        </button>
      );
    }

    buttons.push(
      <button
        key="track"
        className="text-neutral-600 hover:text-neutral-800 text-xs hover:bg-purple-50 px-2 py-1 rounded transition-all duration-200"
        onClick={() => handleTrackClaim(claim)}
      >
        Track
      </button>
    );

    return buttons;
  };

  const copyClaimId = (claimId) => {
    navigator.clipboard.writeText(claimId);
    alert(`Claim ID ${claimId} copied to clipboard!`);
  };

  const copyPatientId = (patientId) => {
    navigator.clipboard.writeText(patientId);
    showToast(`Patient ID ${patientId} copied to clipboard!`, "success");
  };

  // Filter claims based on search and filters
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      searchQuery === "" ||
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(claim.status);

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    totalReimbursed: claims
      .filter((c) => c.status === "Paid")
      .reduce(
        (sum, c) => sum + Number.parseFloat(c.amount.replace(/[$,]/g, "")),
        0
      ),
    awaitingAction: claims.filter(
      (c) => c.status === "Rejected" || c.docsMissing
    ).length,
    inReview: claims.filter((c) => c.status === "Under Review").length,
    rejected: claims.filter((c) => c.status === "Rejected").length,
    avgProcessingTime: 5.2,
  };

  // View Modal Component
  const ViewModal = () => {
    if (!selectedClaim || !showViewModal) return null;

    return (
      <div className="fixed inset-0 border border-green-300 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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

          <div className="p-6 space-y-6">
            {/* Claim Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Claim ID
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    {selectedClaim.id}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Patient ID
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {selectedClaim.patientId}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Status
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedClaim.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : selectedClaim.status === "Under Review"
                        ? "bg-blue-100 text-blue-800"
                        : selectedClaim.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : selectedClaim.status === "Pending Authorization"
                        ? "bg-orange-100 text-orange-800"
                        : selectedClaim.status === "Draft"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedClaim.status}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Total Amount
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedClaim.amount}
                  </div>
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
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Patient ID
                  </div>
                  <div className="text-slate-900 font-mono">
                    {selectedClaim.patientId}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Demographics
                  </div>
                  <div className="text-slate-900">
                    {selectedClaim.patientAge} years old,{" "}
                    {selectedClaim.patientGender === "M" ? "Male" : "Female"}
                  </div>
                </div>
                {selectedClaim.fullData?.patient && (
                  <>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">
                        Date of Birth
                      </div>
                      <div className="text-slate-900">
                        {selectedClaim.fullData.patient.dateOfBirth}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Provider Information */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Provider Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Provider Name
                  </div>
                  <div className="text-slate-900">{selectedClaim.provider}</div>
                </div>
                {selectedClaim.fullData?.provider?.npi && (
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">
                      NPI
                    </div>
                    <div className="text-slate-900">
                      {selectedClaim.fullData.provider.npi}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details */}
            {selectedClaim.fullData?.service && (
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Service Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">
                      Date of Service
                    </div>
                    <div className="text-slate-900">{selectedClaim.date}</div>
                  </div>
                  {selectedClaim.fullData.service.diagnosis?.primary && (
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">
                        Primary Diagnosis
                      </div>
                      <div className="text-slate-900">
                        {selectedClaim.fullData.service.diagnosis.primary}
                      </div>
                    </div>
                  )}
                  {selectedClaim.fullData.service.procedures && (
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">
                        Procedures
                      </div>
                      <div className="space-y-2">
                        {selectedClaim.fullData.service.procedures.map(
                          (proc, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 p-3 rounded-lg"
                            >
                              <div className="font-semibold">
                                {proc.code}{" "}
                                {proc.description && `- ${proc.description}`}
                              </div>
                              <div className="text-sm text-slate-600">
                                Units: {proc.units} | Charges: ${proc.charges}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            {selectedClaim.isDraft && (
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditClaim(selectedClaim);
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
    );
  };

  // AI Insights Modal component
  const AIInsightsModal = () => {
    if (!selectedAIInsights || !showAIModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">🤖</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  AI Risk Analysis
                </h2>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Claim Identifier */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-500">
                  Claim ID
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {selectedAIInsights.claimId}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">
                  Patient ID
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {selectedAIInsights.patientId}
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold text-slate-900">
                  Risk Assessment
                </div>
                <div
                  className={`text-xl font-bold ${
                    selectedAIInsights.riskScore > 80
                      ? "text-red-600"
                      : selectedAIInsights.riskScore > 70
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedAIInsights.riskScore}/100
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    selectedAIInsights.riskScore > 80
                      ? "bg-red-500"
                      : selectedAIInsights.riskScore > 70
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${selectedAIInsights.riskScore}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                AI Confidence: {selectedAIInsights.confidenceLevel}%
              </div>
            </div>

            {/* Risk Flags */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-lg font-bold text-slate-900 mb-4">
                Risk Flags
              </div>
              <div className="space-y-3">
                {selectedAIInsights.flags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-red-50 p-3 rounded-lg border border-red-100"
                  >
                    <div className="text-red-600 mt-0.5">⚠️</div>
                    <div>
                      <div className="font-medium text-red-800">{flag}</div>
                    </div>
                  </div>
                ))}
                {selectedAIInsights.flags.length === 0 && (
                  <div className="text-slate-600">No risk flags detected</div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-lg font-bold text-slate-900 mb-4">
                AI Recommendations
              </div>
              <div className="space-y-3">
                {selectedAIInsights.recommendations.map(
                  (recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-blue-50 p-3 rounded-lg border border-blue-100"
                    >
                      <div className="text-blue-600 mt-0.5">💡</div>
                      <div>
                        <div className="font-medium text-blue-800">
                          {recommendation}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setShowAIModal(false)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 font-semibold"
            >
              Close Analysis
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleViewFlaggedClaims = () => {
    const flaggedClaims = claims.filter((c) => c.aiFlag);
    setFlaggedClaimsData(
      flaggedClaims.map((claim) => ({
        ...claim,
        flagReasons: generateDetailedFlagReasons(claim),
      }))
    );
    setShowFlaggedClaimsModal(true);
  };

  const generateDetailedFlagReasons = (claim) => {
    const reasons = [];

    // Check actual claim data for flags
    if (claim.fullData) {
      // High amount flag
      const totalAmount = Number.parseFloat(claim.amount.replace(/[$,]/g, ""));
      if (totalAmount > 5000) {
        reasons.push({
          type: "High Value",
          severity: "Medium",
          description: `Claim amount of ${claim.amount} exceeds $5,000 threshold`,
          recommendation:
            "Verify medical necessity and ensure proper authorization",
        });
      }

      // Missing documentation
      if (
        !claim.fullData.uploadedFiles ||
        claim.fullData.uploadedFiles.length === 0
      ) {
        reasons.push({
          type: "Missing Documentation",
          severity: "High",
          description: "No supporting documents uploaded",
          recommendation:
            "Upload required medical records and supporting documentation",
        });
      }

      // Check for procedure codes
      if (claim.fullData.service?.procedures) {
        const procedures = claim.fullData.service.procedures;

        // Multiple procedures flag
        if (procedures.length > 3) {
          reasons.push({
            type: "Multiple Procedures",
            severity: "Medium",
            description: `${procedures.length} procedures billed in single claim`,
            recommendation:
              "Verify all procedures were performed and medically necessary",
          });
        }

        // High-cost procedure codes (example)
        const highCostCodes = ["99213", "99214", "99215", "99223", "99233"];
        const hasHighCostCode = procedures.some((p) =>
          highCostCodes.includes(p.code)
        );
        if (hasHighCostCode) {
          reasons.push({
            type: "High-Cost Procedure",
            severity: "Medium",
            description: "Contains high-reimbursement procedure codes",
            recommendation:
              "Ensure proper documentation supports the level of service",
          });
        }
      }

      // Check diagnosis codes
      if (claim.fullData.service?.diagnosis?.primary) {
        const diagnosisCode = claim.fullData.service.diagnosis.primary;

        // Example: Check for certain diagnosis patterns
        if (diagnosisCode.startsWith("Z")) {
          reasons.push({
            type: "Preventive Care",
            severity: "Low",
            description: "Preventive care diagnosis detected",
            recommendation: "Verify coverage for preventive services",
          });
        }
      }

      // Patient age considerations
      if (claim.patientAge > 65) {
        reasons.push({
          type: "Medicare Patient",
          severity: "Low",
          description: "Patient age suggests Medicare eligibility",
          recommendation: "Verify Medicare as primary payer if applicable",
        });
      }

      // Provider history (simulated)
      if (Math.random() > 0.7) {
        reasons.push({
          type: "Provider Pattern",
          severity: "Medium",
          description: "Provider has elevated claim review rate",
          recommendation: "Additional documentation may be required",
        });
      }
    }

    // If no specific reasons found, add generic ones
    if (reasons.length === 0) {
      reasons.push({
        type: "Routine Review",
        severity: "Low",
        description: "Selected for routine AI quality review",
        recommendation: "No action required - standard processing",
      });
    }

    return reasons;
  };

  // Flagged Claims Modal
  const FlaggedClaimsModal = () => {
    if (!showFlaggedClaimsModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-red-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  AI Flagged Claims Analysis
                </h2>
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
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {flaggedClaimsData.length} Claims Flagged for Review
              </h3>
              <p className="text-slate-600">
                These claims have been identified by our AI system as requiring
                additional attention before processing.
              </p>
            </div>

            <div className="space-y-6">
              {flaggedClaimsData.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white border-2 border-red-100 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-bold text-lg text-slate-900">
                          {claim.id}
                        </div>
                        <div className="text-sm text-slate-600">
                          Patient ID: {claim.patientId} | Amount: {claim.amount}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewClaim(claim)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setShowFlaggedClaimsModal(false);
                          handleEditClaim(claim);
                        }}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm hover:bg-orange-200"
                      >
                        Edit Claim
                      </button>
                      {claim.isDraft && (
                        <button
                          onClick={() => {
                            setShowFlaggedClaimsModal(false);
                            handleEditClaim(claim);
                          }}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200"
                        >
                          Edit Draft
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">
                      Flag Reasons:
                    </h4>
                    {claim.flagReasons.map((reason, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          reason.severity === "High"
                            ? "bg-red-50 border-red-400"
                            : reason.severity === "Medium"
                            ? "bg-orange-50 border-orange-400"
                            : "bg-yellow-50 border-yellow-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-slate-900">
                            {reason.type}
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              reason.severity === "High"
                                ? "bg-red-100 text-red-800"
                                : reason.severity === "Medium"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {reason.severity} Risk
                          </span>
                        </div>
                        <div className="text-sm text-slate-700 mb-2">
                          {reason.description}
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Recommendation:</strong>{" "}
                          {reason.recommendation}
                        </div>
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
              Close Analysis
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap justify-between">
        <div className="w-fit flex flex-col items-start xl:flex-row  xl:items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Claims Dashboard
          </h1>
        </div>

        <DashButton
          icon={<PlusCircleIcon />}
          text={"Submit New Claim"}
          action={handleSubmitNewClaim}
          primary={true}
        />
      </div>

      {/* Action Required Alert */}
      {stats.awaitingAction > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">⚠️</span>
            <span className="text-red-800 font-medium">Action Required:</span>
            <span className="text-red-700 ml-2">
              {stats.awaitingAction} claims need immediate attention
            </span>
            <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>
      )}

      {/* Enhanced KPI Metrics */}
      <div className="flex flex-wrap w-full gap-2 xl:gap-3">
        <DashboardStatCard
          cardTitle={"Reimbursed This Month"}
          cardNumber={"$2,450.00"}
          cardAnalytics={"+12% from last month"}
          cardMoney={true}
          analyticsPositive={true}
          icon={<DollarSign className="size-[24px] " />}
        />
        <DashboardStatCard
          cardTitle={"Claims Awaiting Action"}
          cardNumber={"5"}
          cardAnalytics={"Requires Immediate Attention"}
          cardHighlighted={true}
          icon={<FileWarning className="size-[24px] " />}
        />
        <DashboardStatCard
          cardTitle={"Claims In Review"}
          cardNumber={"2"}
          cardAnalytics={"Avg 2-3 days processing"}
          cardHighlighted={false}
          icon={<Loader className="size-[24px] " />}
        />
        <DashboardStatCard
          cardTitle={"Rejected Claims"}
          cardNumber={"1"}
          cardAnalytics={"Need Resubmission"}
          cardHighlighted={false}
          icon={<Ban className="size-[24px] " />}
        />
        <DashboardStatCard
          cardTitle={"Avg Time to Payment"}
          cardNumber={"5.2 days"}
          cardAnalytics={"0.8 days improvement"}
          cardHighlighted={false}
          icon={<Clock className="size-[24px] " />}
        />
        {/**
           *   <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">$ Reimbursed This Month</div>
          <div className="text-2xl font-bold text-green-600">
            ${stats.totalReimbursed.toLocaleString()}
          </div>
          <div className="text-xs text-green-500 mt-1">
            ↑ 12% from last month
          </div>
        </div>
           *   <div className=" p-6 rounded-lg border-2 border-primary bg-primary-light/10 shadow-sm">
          <div className="text-sm text-gray-600">Claims Awaiting Action</div>
          <div className="text-2xl font-bold ">{stats.awaitingAction}</div>
          <div className="text-xs  mt-1">Requires immediate attention</div>
        </div>
          *<div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Claims in Review</div>
          <div className="text-2xl font-bold ">{stats.inReview}</div>
          <div className="text-xs text-primary mt-1">
            Avg 2-3 days processing
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Rejected Claims</div>
          <div className="text-2xl font-bold ">{stats.rejected}</div>
          <div className="text-xs text-primary mt-1">Need resubmission</div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Avg Time to Payment</div>
          <div className="text-2xl font-bold ">
            {stats.avgProcessingTime} days
          </div>
          <div className="text-xs text-primary">↓ 0.8 days improved</div>
        </div>
        *
           */}
      </div>

      <div className="w-full grid grid-cols-1 min-[1440px]:grid-cols-8 gap-4">
        <div className="col-span-1 min-[1440px]:col-span-5">
          <ReimbursementChartDashboard />
        </div>
        <div className="col-span-1 min-[1440px]:col-span-3">
          <ClaimBreakdownCard />
        </div>
      </div>

      {/* Claims Status Summary Sections -- hidden for now */}
      <div className="grid grid-cols-3 gap-4">
        {/* Approved Claims */}
        {/** 
           * 
           *  <div className=" border-2 border-neutral-100 ounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-medium text-green-900">
                Approved Claims
              </span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {claims.filter((c) => c.status === "Paid").length}
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {claims
              .filter((c) => c.status === "Paid")
              .map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white p-2 rounded border border-green-100 text-sm flex justify-between items-center cursor-pointer hover:bg-green-100 transition-all duration-200"
                  onClick={() => handleViewClaim(claim)}
                >
                  <div>
                    <div className="font-medium text-green-800">{claim.id}</div>
                    <div className="text-xs text-green-600">{claim.amount}</div>
                  </div>
                  <div className="text-xs text-green-700">{claim.date}</div>
                </div>
              ))}
            {claims.filter((c) => c.status === "Paid").length === 0 && (
              <div className="text-sm text-neutral-400 text-center py-2">
                No approved claims
              </div>
            )}
          </div>
        </div>
          */}

        {/* In Progress Claims */}
        {/**
           * 
           *  <div className=" border-2 border-neutral-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⏳</span>
              <span className="font-medium text-yellow-900">
                In Progress Claims
              </span>
            </div>
            <span className="text-2xl font-bold text-yellow-800">
              {
                claims.filter((c) =>
                  [
                    "Submitted",
                    "Under Review",
                    "Pending Authorization",
                  ].includes(c.status)
                ).length
              }
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {claims
              .filter((c) =>
                ["Submitted", "Under Review", "Pending Authorization"].includes(
                  c.status
                )
              )
              .map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white p-2 rounded border border-yellow-100 text-sm flex justify-between items-center cursor-pointer hover:bg-yellow-100 transition-all duration-200"
                  onClick={() => handleViewClaim(claim)}
                >
                  <div>
                    <div className="font-medium text-yellow-800">
                      {claim.id}
                    </div>
                    <div className="text-xs text-yellow-600">
                      {claim.status}
                    </div>
                  </div>
                  <div className="text-xs text-yellow-700">
                    {claim.lastUpdated}
                  </div>
                </div>
              ))}
            {claims.filter((c) =>
              ["Submitted", "Under Review", "Pending Authorization"].includes(
                c.status
              )
            ).length === 0 && (
              <div className="text-sm text-neutral-400 text-center py-2">
                No in-progress claims
              </div>
            )}
          </div>
        </div>
           */}

        {/* Rejected Claims */}
        {/**
           * 
           *  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">✗</span>
              <span className="font-medium text-red-900">Rejected Claims</span>
            </div>
            <span className="text-2xl font-bold text-red-600">
              {claims.filter((c) => c.status === "Rejected").length}
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {claims
              .filter((c) => c.status === "Rejected")
              .map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white p-2 rounded border border-red-100 text-sm flex justify-between items-center cursor-pointer hover:bg-red-100 transition-all duration-200"
                  onClick={() => handleViewClaim(claim)}
                >
                  <div>
                    <div className="font-medium text-red-800">{claim.id}</div>
                    <div className="text-xs text-red-600">
                      Rejected {claim.lastUpdated}
                    </div>
                  </div>
                  <button
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResubmitClaim(claim);
                    }}
                  >
                    Resubmit
                  </button>
                </div>
              ))}
            {claims.filter((c) => c.status === "Rejected").length === 0 && (
              <div className="text-sm text-red-600 text-center py-2">
                No rejected claims
              </div>
            )}
          </div>
        </div>
           * 
           */}
      </div>

      <div className="w-full rounded-2xl flex flex-col gap-0 ">
        {/* Improved Sticky Filter Toolbar */}
        <div className="sticky top-0 z-10">
          <h3 className="text-lg text-gray-900 mb-4">Search & Filter Claims</h3>
          <div className="w-full items-start grid grid-cols-2 md:grid-cols-4 min-[1500px]:grid-cols-8 gap-2">
            <div className="w-full max-w-[900px] col-span-2 md:col-span-4 lg:col-span-3">
              <label className="block text-[0.75rem] font-medium text-gray-700 mb-2">
                Enter any part of Patient ID, Claim ID, or Provider name to
                filter results
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Patient ID, Claim ID, or Provider..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-[8px] text-[0.75rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQueryLocal(e.target.value)}
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  <SearchIcon className="text-neutral-400 size-[18px]" />
                </span>
              </div>
            </div>
            {/* Status Filter Dropdown */}
            <div className="w-full col-span-2 md:col-span-2 lg:col-span-1">
              <label className="block text-[0.75rem] font-medium text-gray-700 mb-2">
                Claim Status
              </label>
              <div className="relative">
                <select
                  className="w-full text-[0.75rem] px-2 py-3 border border-neutral-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      handleStatusFilter(value);
                      e.target.value = ""; // Reset dropdown
                    }
                  }}
                >
                  <option value="">Select status to filter...</option>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Pending Authorization">
                    Pending Authorization
                  </option>
                  <option value="Paid">Paid</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Selected Filters Display */}
              {filters.status.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {filters.status.map((status) => (
                    <span
                      key={status}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {status}
                      <button
                        onClick={() => handleStatusFilter(status)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Date Range Filters */}
            <div className="w-full col-span-1">
              <label className="block text-[0.75rem] font-medium text-gray-700 mb-2">
                Date Range Start
              </label>
              <input
                type="date"
                className="w-full px-2 py-3 text-[0.75rem] border border-neutral-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value },
                  }))
                }
              />
            </div>
            <div className="w-full col-span-1">
              <label className="block text-[0.75rem] font-medium text-gray-700 mb-2">
                Date Range End
              </label>
              <input
                type="date"
                className="w-full text-[0.75rem] px-2 py-3 border border-neutral-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value },
                  }))
                }
              />
            </div>
            {/* Amount Range */}
            <div className="w-full col-span-2">
              <label className="block text-[0.75rem] font-medium text-gray-700 mb-2">
                Amount Range
              </label>
              <div className="flex gap-2 w-fit">
                <input
                  type="number"
                  placeholder="Min $"
                  className="w-fit text-[0.75rem] px-2 py-3 border border-neutral-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.amountRange.min}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      amountRange: {
                        ...prev.amountRange,
                        min: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  type="number"
                  placeholder="Max $"
                  className="w-fit text-[0.75rem] px-2 py-3 border border-neutral-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.amountRange.max}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      amountRange: {
                        ...prev.amountRange,
                        max: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            {/* Filter Actions */}
            <div className="flex items-center gap-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setFilters({
                      status: [],
                      dateRange: { start: "", end: "" },
                      amountRange: { min: "", max: "" },
                    });
                    setSearchQueryLocal("");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
                <DashButton text={"Export Results"} primary={true} />
              </div>
              <div className="text-sm text-gray-600">
                {filters.status.length > 0 ||
                filters.dateRange.start ||
                filters.dateRange.end ||
                filters.amountRange.min ||
                filters.amountRange.max ? (
                  <span>Filters applied</span>
                ) : (
                  <span>No filters applied</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Claims Table */}
        <div className="bg-white shadow rounded-2xl border overflow-hidden my-2">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Provider
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort("amount")}
                >
                  Amount{" "}
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className="text-primary-dark font-mono text-xs cursor-pointer hover:text-primary-light"
                        onClick={() => {
                          copyClaimId(claim.id);
                          setMaskedIds(false);
                        }}
                        onMouseLeave={() => setMaskedIds(true)}
                        title="Click to copy Claim ID"
                      >
                        {maskedIds
                          ? `${claim.id.substring(0, 4)}...${claim.id.slice(
                              -4
                            )}`
                          : claim.id}
                      </span>
                      <button
                        className="ml-2 text-neutral-400 hover:text-neutral-600"
                        onClick={() => copyClaimId(claim.id)}
                        title="Copy Claim ID"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className="text-neutral-400 font-mono text-xs cursor-pointer hover:text-primary-light"
                        onClick={() => {
                          copyPatientId(claim.patientId);
                          setMaskedIds(false);
                        }}
                        onMouseLeave={() => setMaskedIds(true)}
                        title="Click to copy Patient ID"
                      >
                        {maskedIds
                          ? `${claim.patientId.substring(
                              0,
                              3
                            )}...${claim.patientId.slice(-4)}`
                          : claim.patientId}
                      </span>
                      <button
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => copyPatientId(claim.patientId)}
                        title="Copy Patient ID"
                      >
                        📋
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {claim.patientAge}y, {claim.patientGender}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-900">
                      {claim.provider}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                    {claim.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`text-xs font-medium ${
                        Number.parseFloat(claim.amount.replace(/[$,]/g, "")) >
                        5000
                          ? "text-purple-600 font-bold"
                          : "text-gray-900"
                      }`}
                    >
                      {claim.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          claim.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : claim.status === "Under Review"
                            ? "bg-blue-100 text-blue-800"
                            : claim.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : claim.status === "Pending Authorization"
                            ? "bg-orange-100 text-orange-800"
                            : claim.status === "Draft"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {claim.status}
                      </span>
                      {claim.aiFlag && (
                        <span
                          className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded cursor-pointer hover:bg-purple-200"
                          title="AI flagged for review - Click for details"
                          onClick={() => handleAIFlagDetails(claim)}
                        >
                          AI Flag
                        </span>
                      )}
                      {claim.docsMissing && (
                        <span
                          className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded"
                          title="Missing required documents"
                        >
                          Docs Missing
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {claim.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <div className="flex space-x-1">
                      {getActionButtons(claim)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary/10 border border-primary-dark rounded-lg p-4">
        <div className="flex items-center">
          <span className=" mr-2">🔒</span>
          <span className="text-primary text-sm">
            <strong>Privacy Protected:</strong> Patient names are not displayed
            for HIPAA compliance. Use Patient IDs for identification. Full
            patient details are available in individual claim views for
            authorized personnel only.
          </span>
        </div>
      </div>

      {/* View Modal */}
      <ViewModal />

      {/* AI Insights Modal */}
      <AIInsightsModal />

      {/* Flagged Claims Modal */}
      <FlaggedClaimsModal />
    </div>
  );
};

export default ClaimsSummary;
