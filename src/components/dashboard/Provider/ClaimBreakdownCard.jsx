import { useEffect, useState } from "react"
import ClaimsDonutChart from "./ClaimsDonutChart";

const ClaimBreakdownCard = () => {
  const [claimStats, setClaimStats] = useState({
    approved: 320,
    pending: 180,
    rejected: 70,
  })

  const updateClaimStats = () => {
    try {
      // Get claims from localStorage
      const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")

      // Start with base numbers
      const statusCounts = {
        approved: 320,
        pending: 180,
        rejected: 70,
      }

      // Count additional claims from localStorage
      storedClaims.forEach((claim) => {
        if (claim.isDraft) {
          statusCounts.pending++
        } else {
          // For submitted claims, they start as "In Review" which maps to pending
          if (claim.status === "In Review" || !claim.status) {
            statusCounts.pending++
          } else if (claim.status === "Approved") {
            statusCounts.approved++
          } else if (claim.status === "Rejected") {
            statusCounts.rejected++
          }
        }
      })

      setClaimStats(statusCounts)
    } catch (error) {
      console.error("Error updating claim stats:", error)
    }
  }

  useEffect(() => {
    // Initial load
    updateClaimStats()

    // Listen for storage changes (when claims are added)
    const handleStorageChange = (e) => {
      if (e.key === "vistora_claims") {
        updateClaimStats()
      }
    }

    // Also listen for custom events from the same tab
    const handleClaimUpdate = () => {
      updateClaimStats()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("claimUpdated", handleClaimUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("claimUpdated", handleClaimUpdate)
    }
  }, [])

  return (
    <div className="font-['Manrope',_sans-serif] w-full h-full shadow rounded-2xl p-4 flex flex-col gap-2 border border-neutral-200">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-md lg:text-lg">Current Claim Breakdowns</h3>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
          <span className="text-purple-600 text-sm">🤖</span>
          <span className="text-purple-700 text-xs font-semibold">AI Powered</span>
        </div>
      </div>
      <div className="w-full">
        <ClaimsDonutChart />
      </div>
      <div className="w-fit self-end gap-1 px-6 py-2 bg-neutral-200 flex flex-col rounded-[6px]">
        <p className="text-[0.75rem] flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500 text-transparent"></div>
          {claimStats.approved} Approved Claims
        </p>
        <p className="text-[0.75rem] flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 text-transparent"></div>
          {claimStats.pending} Pending Claims
        </p>
        <p className="text-[0.75rem] flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 text-transparent"></div>
          {claimStats.rejected} Rejected Claims
        </p>
      </div>
    </div>
  )
}

export default ClaimBreakdownCard
