import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClaims, setSearchQuery, removeClaim } from '../store/slices/claimsSlice';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Claims = () => {
  const dispatch = useDispatch();
  const { claims, loading, error, searchQuery } = useSelector(state => state.claims);

  useEffect(() => {
    dispatch(fetchClaims());
  }, [dispatch]);

  const handleRemoveClaim = (claimId) => {
    if (window.confirm('Are you sure you want to remove this claim?')) {
      dispatch(removeClaim(claimId));
    }
  };

  // Filter claims based on search query
  const filteredClaims = searchQuery 
    ? claims.filter(claim => 
        claim.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        claim.details.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : claims;

  if (loading) {
    return <div className="text-center py-12">Loading claims data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          🔔
        </button>
      </div>

      <SearchBar searchAction={setSearchQuery} placeholder="Search claims..." />

      <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Submit New Claim +
      </button>

      {/* Claims Table */}
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredClaims.map((claim) => (
              <tr key={claim.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{claim.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{claim.provider}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{claim.details}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{claim.phoneNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    claim.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    claim.status === 'Active' ? 'bg-yellow-100 text-yellow-800' : 
                    claim.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Details</button>
                  {claim.status !== 'Completed' && (
                    <button 
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleRemoveClaim(claim.id)}
                    >
                      REMOVE
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalItems={filteredClaims.length} itemsLabel="Claims" />
    </div>
  );
};

export default Claims;