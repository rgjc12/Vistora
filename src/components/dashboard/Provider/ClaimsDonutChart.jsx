import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { claimsBreakdownData } from "../../../lib/mockClaimData";

const ClaimsDonutChart = () => {
  const [chartData, setChartData] = useState([
    { name: "Approved", value: 320, color: "#10b981" },
    { name: "Pending", value: 180, color: "#3b82f6" },
    { name: "Rejected", value: 70, color: "#ef4444" },
  ])

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  const updateChartData = () => {
    try {
      // Get claims from localStorage
      const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")

      // Start with base numbers
      const statusCounts = {
        Approved: 320,
        Pending: 180,
        Rejected: 70,
      }

      // Count additional claims from localStorage
      storedClaims.forEach((claim) => {
        if (claim.isDraft) {
          statusCounts.Pending++
        } else {
          // For submitted claims, they start as "In Review" which maps to Pending
          if (claim.status === "In Review" || !claim.status) {
            statusCounts.Pending++
          } else if (claim.status === "Approved") {
            statusCounts.Approved++
          } else if (claim.status === "Rejected") {
            statusCounts.Rejected++
          }
        }
      })

      // Update chart data
      const newChartData = [
        { name: "Approved", value: statusCounts.Approved, color: "#10b981" },
        { name: "Pending", value: statusCounts.Pending, color: "#3b82f6" },
        { name: "Rejected", value: statusCounts.Rejected, color: "#ef4444" },
      ]

      setChartData(newChartData)
    } catch (error) {
      console.error("Error updating chart data:", error)
    }
  }

  useEffect(() => {
    // Initial load
    updateChartData()

    // Listen for storage changes (when claims are added)
    const handleStorageChange = (e) => {
      if (e.key === "vistora_claims") {
        updateChartData()
      }
    }

    // Also listen for custom events from the same tab
    const handleClaimUpdate = () => {
      updateChartData()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("claimUpdated", handleClaimUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("claimUpdated", handleClaimUpdate)
    }
  }, [])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-gray-600">
            <span className="font-medium">{data.value}</span> claims
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-gray-600 font-medium">
              {entry.value}: {chartData.find((item) => item.name === entry.value)?.value || 0}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-500">Total Claims</div>
          </div>
        </div>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ClaimsDonutChart
