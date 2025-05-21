import { useState } from "react"
import { Search, Plus, Upload, FileText } from "lucide-react"
import { BarChart, PieChart } from "./Charts.jsx"
import PageHeader from "./PageHeader.jsx"

const Claims = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const claimStats = [
    { count: 311, color: "bg-blue-100" },
    { count: 42, color: "bg-green-100" },
    { count: 60, color: "bg-yellow-100" },
    { count: 86, color: "bg-red-100" },
  ]

  const claimData = [
    {
      id: 1,
      name: "Alexander",
      provider: "Foley",
      details: "alexander.foley@gmail.com",
      status: "Completed",
      statusColor: "text-green-600",
    },
    {
      id: 2,
      name: "Alexander",
      provider: "Foley",
      details: "alexander.foley@gmail.com",
      status: "Active",
      statusColor: "text-yellow-600",
    },
  ]

  const deviceData = {
    labels: ["Tablet", "Mac", "iPhone", "Windows", "Android", "Other"],
    data: [15, 25, 30, 20, 10, 15],
  }

  const locationData = {
    labels: ["United States", "Canada", "Mexico", "Other"],
    data: [52.1, 22.8, 13.9, 11.2],
  }

  return (
    <div className="p-6 h-full">
      <PageHeader title="Claims Summary" />

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {claimStats.map((stat, index) => (
          <div key={index} className={`${stat.color} p-4 rounded-md`}>
            <div className="text-sm text-gray-600">Total Claims:</div>
            <div className="text-2xl font-bold">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-md shadow mb-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Provider</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Claim Details</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claimData.map((claim) => (
              <tr key={claim.id} className="border-b">
                <td className="p-3">{claim.name}</td>
                <td className="p-3">{claim.provider}</td>
                <td className="p-3">{claim.details}</td>
                <td className={`p-3 ${claim.statusColor}`}>{claim.status}</td>
                <td className="p-3">
                  {claim.status === "Completed" ? (
                    <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded">Details</button>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded">Details</button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded">Withdraw</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded">
          <Plus size={16} className="mr-2" />
          Submit New Claim
        </button>
        <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded">
          <Upload size={16} className="mr-2" />
          Upload Medical Records
        </button>
        <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded">
          <FileText size={16} className="mr-2" />
          View Reports
        </button>
        <div className="ml-auto">
          <a href="#" className="text-blue-600 hover:underline">
            See All Claims →
          </a>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic by Device</h3>
          <BarChart data={deviceData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic by Location</h3>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <PieChart data={locationData} />
            </div>
            <div className="w-full md:w-1/2">
              <ul>
                {locationData.labels.map((label, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>• {label}</span>
                    <span>{locationData.data[index]}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Claims
