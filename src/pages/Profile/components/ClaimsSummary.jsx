import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClaims, setSearchQuery } from "../store/slices/claimsSlice";
import SearchBar from "../components/SearchBar";

const ClaimsSummary = () => {
  const dispatch = useDispatch();
  //const { claims, stats, loading, error } = useSelector(state => state.claims);

  useEffect(() => {
    // dispatch(fetchClaims());
  }, [dispatch]);

  /*
  if (loading) {
    return <div className="text-center py-12">Loading claims data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }*/

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Claims Summary</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">🔔</button>
      </div>

      <SearchBar searchAction={setSearchQuery} />

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Total Claims:</div>
          <div className="text-2xl font-bold text-blue-600">
            {/*stats.total*/}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Active Claims:</div>
          <div className="text-2xl font-bold text-green-600">
            {/*stats.active*/}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Pending Claims:</div>
          <div className="text-2xl font-bold text-yellow-600">
            {/*stats.pending*/}
          </div>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Rejected Claims:</div>
          <div className="text-2xl font-bold text-pink-600">
            {/*stats.rejected*/}
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Claim Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              /*claims*/ Array(3)
                .slice(0, 2)
                .map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {/*claim.name*/}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {/*claim.provider*/}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {/*claim.details*/}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded {
                      claim.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : claim.status === "Active"
                        ? "bg-yellow-100 text-yellow-800"
                        : claim.status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
            }`}
                      >
                        {/*claim.status*/}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Details
                      </button>
                      {claim.status !== "Completed" && (
                        <button className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                          REMOVE
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Submit New Claim +
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Upload Medical Records +
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
          View Reports
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic by Device</h3>
          <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
            <span className="text-gray-500">Bar Chart Placeholder</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic by Location</h3>
          <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
            <span className="text-gray-500">Pie Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSummary;
