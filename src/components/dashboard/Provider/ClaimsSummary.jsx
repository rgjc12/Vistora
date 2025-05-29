import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClaims, setSearchQuery , removeClaim} from "../../../store/slices/claimsSlice";
import { setActiveTab } from "../../../store/slices/uiSlice";

const ClaimsSummary = ({ onSubmitClick }) => {
  const dispatch = useDispatch();
  const { claims, stats, loading, error } = useSelector(state => state.claims);
  const [filters, setFilters] = useState({
    status: [],
    dateRange: { start: '', end: '' },
    amountRange: { min: '', max: '' }
  });
  const [searchQuery, setSearchQueryLocal] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    dispatch(fetchClaims());
  }, [dispatch]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status) 
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  // Function to handle navigation to Submit Claim page
  const handleSubmitNewClaim = () => {
    dispatch(setActiveTab('submit-claim'));
  };

  const getActionButtons = (claim) => {
    const buttons = [];
    
    if (claim.status === 'Rejected') {
      buttons.push(
        <button key="resubmit" className="text-blue-600 hover:text-blue-800 text-sm mr-2">
          Resubmit
        </button>
      );
    }
    
    if (claim.status === 'Paid') {
      buttons.push(
        <button key="download" className="text-green-600 hover:text-green-800 text-sm mr-2">
          Download EOB
        </button>
      );
    }
    
    buttons.push(
      <button key="view" className="text-gray-600 hover:text-gray-800 text-sm mr-2">
        View
      </button>,
      <button key="edit" className="text-gray-600 hover:text-gray-800 text-sm mr-2">
        Edit
      </button>,
      <button key="track" className="text-purple-600 hover:text-purple-800 text-sm">
        Track
      </button>
    );
    
    return buttons;
  };

  const copyClaimId = (claimId) => {
    navigator.clipboard.writeText(claimId);
    // You could add a toast notification here
  };

  const copyPatientId = (patientId) => {
    navigator.clipboard.writeText(patientId);
    // You could add a toast notification here
  };

  if (loading) {
    return <div className="text-center py-12">Loading claims data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  // Updated mock data with Patient IDs instead 
  const enhancedClaims = [
    {
      id: 'CLM-0583',
      patientId: 'PT-4521',
      provider: 'Dr. Sarah Johnson',
      date: '03/15/2025',
      amount: '$2,450.00',
      status: 'Under Review',
      lastUpdated: '2 hours ago',
      aiFlag: false,
      docsMissing: false,
      patientAge: 38,
      patientGender: 'M'
    },
    {
      id: 'CLM-0584',
      patientId: 'PT-7892',
      provider: 'Metro Health Clinic',
      date: '03/14/2025',
      amount: '$1,200.00',
      status: 'Rejected',
      lastUpdated: '1 day ago',
      aiFlag: true,
      docsMissing: true,
      patientAge: 45,
      patientGender: 'F'
    },
    {
      id: 'CLM-0585',
      patientId: 'PT-3456',
      provider: 'Dr. Michael Chen',
      date: '03/13/2025',
      amount: '$5,800.00',
      status: 'Paid',
      lastUpdated: '3 days ago',
      aiFlag: false,
      docsMissing: false,
      patientAge: 62,
      patientGender: 'M'
    },
    {
      id: 'CLM-0586',
      patientId: 'PT-9123',
      provider: 'City Medical Center',
      date: '03/12/2025',
      amount: '$890.00',
      status: 'Submitted',
      lastUpdated: '4 days ago',
      aiFlag: false,
      docsMissing: false,
      patientAge: 29,
      patientGender: 'F'
    },
    {
      id: 'CLM-0587',
      patientId: 'PT-6754',
      provider: 'Dr. Emily Rodriguez',
      date: '03/11/2025',
      amount: '$3,200.00',
      status: 'Under Review',
      lastUpdated: '5 days ago',
      aiFlag: false,
      docsMissing: false,
      patientAge: 55,
      patientGender: 'F'
    },
    {
      id: 'CLM-0588',
      patientId: 'PT-2847',
      provider: 'Westside Clinic',
      date: '03/10/2025',
      amount: '$1,750.00',
      status: 'Pending Authorization',
      lastUpdated: '6 days ago',
      aiFlag: true,
      docsMissing: false,
      patientAge: 41,
      patientGender: 'M'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Claims Dashboard</h1>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
           onClick={handleSubmitNewClaim}
        >
          + Submit New Claim
        </button>
      </div>

      {/* Action Required Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-600 mr-2">⚠️</span>
          <span className="text-red-800 font-medium">Action Required:</span>
          <span className="text-red-700 ml-2">3 claims need immediate attention</span>
          <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
            View All →
          </button>
        </div>
      </div>

      {/* Enhanced KPI Metrics */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">$ Reimbursed This Month</div>
          <div className="text-2xl font-bold text-green-600">$124,580</div>
          <div className="text-xs text-green-500 mt-1">↑ 12% from last month</div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200 shadow-sm">
          <div className="text-sm text-gray-600">Claims Awaiting Action</div>
          <div className="text-2xl font-bold text-orange-600">8</div>
          <div className="text-xs text-orange-500 mt-1">Requires immediate attention</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Claims in Review</div>
          <div className="text-2xl font-bold text-blue-600">15</div>
          <div className="text-xs text-blue-500 mt-1">Avg 2-3 days processing</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Rejected Claims</div>
          <div className="text-2xl font-bold text-red-600">4</div>
          <div className="text-xs text-red-500 mt-1">Need resubmission</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-600">Avg Time to Payment</div>
          <div className="text-2xl font-bold text-purple-600">5.2 days</div>
          <div className="text-xs text-purple-500 mt-1">↓ 0.8 days improved</div>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-blue-600 mr-2">🤖</span>
            <span className="font-medium text-blue-900">AI Predictions:</span>
            <span className="text-blue-800 ml-2">5 flagged claims may be at risk this week</span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Flagged Claims →
          </button>
        </div>
      </div>

      {/* Improved Sticky Filter Toolbar */}
      <div className="bg-white border rounded-lg p-6 sticky top-0 z-10 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Search & Filter Claims</h3>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Claims
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Patient ID, Claim ID, or Provider..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQueryLocal(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter any part of Patient ID, Claim ID, or Provider name to filter results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Status
              </label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      handleStatusFilter(value);
                      e.target.value = ''; // Reset dropdown
                    }
                  }}
                >
                  <option value="">Select status to filter...</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Pending Authorization">Pending Authorization</option>
                  <option value="Paid">Paid</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Filter claims by their current processing status
              </p>
              
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

            {/* Patient Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Birth Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.dateRange.start}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
              />
              <p className="text-xs text-gray-500 mt-1">
                Filter by patient's date of birth
              </p>
            </div>

            {/* Claim Submission Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.dateRange.end}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
              />
              <p className="text-xs text-gray-500 mt-1">
                Filter by when the claim was submitted
              </p>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Amount Range
              </label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min $"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.amountRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      amountRange: { ...prev.amountRange, min: e.target.value }
                    }))}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max $"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.amountRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      amountRange: { ...prev.amountRange, max: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Set minimum and maximum claim amounts to filter
              </p>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {(filters.status.length > 0 || filters.dateRange.start || filters.dateRange.end || filters.amountRange.min || filters.amountRange.max) ? (
                <span>Filters applied</span>
              ) : (
                <span>No filters applied</span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setFilters({
                    status: [],
                    dateRange: { start: '', end: '' },
                    amountRange: { min: '', max: '' }
                  });
                  setSearchQueryLocal('');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear All Filters
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Results
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Claims Table with Patient IDs */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Claim ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enhancedClaims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span 
                      className="text-blue-600 font-mono text-sm cursor-pointer hover:text-blue-800"
                      onClick={() => copyClaimId(claim.id)}
                      title="Click to copy Claim ID"
                    >
                      {claim.id}
                    </span>
                    <button 
                      className="ml-2 text-gray-400 hover:text-gray-600"
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
                      className="text-purple-600 font-mono text-sm cursor-pointer hover:text-purple-800"
                      onClick={() => copyPatientId(claim.patientId)}
                      title="Click to copy Patient ID"
                    >
                      {claim.patientId}
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
                  <div className="text-sm text-gray-900">{claim.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {claim.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`text-sm font-medium ${
                    parseFloat(claim.amount.replace(/[$,]/g, '')) > 5000 
                      ? 'text-purple-600 font-bold' 
                      : 'text-gray-900'
                  }`}>
                    {claim.amount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      claim.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      claim.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                      claim.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      claim.status === 'Pending Authorization' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {claim.status}
                    </span>
                    {claim.aiFlag && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded" title="AI flagged for review">
                        AI Flag
                      </span>
                    )}
                    {claim.docsMissing && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded" title="Missing required documents">
                        Docs Missing
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {claim.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-1">
                    {getActionButtons(claim)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-blue-600 mr-2">🔒</span>
          <span className="text-blue-800 text-sm">
            <strong>Privacy Protected:</strong> Patient names are not displayed for HIPAA compliance. 
            Use Patient IDs for identification. Full patient details are available in individual claim views for authorized personnel only.
          </span>
        </div>
      </div>

      {/* Enhanced Analytics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Reimbursement Trends (Last 30 Days)</h3>
          <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
            <span className="text-gray-500">Reimbursement Bar Chart</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Claim Volume by Status</h3>
          <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
            <span className="text-gray-500">Status Distribution Donut Chart</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 text-left">
            <div className="text-red-600 font-medium">Fix Rejected Claims</div>
            <div className="text-sm text-red-500 mt-1">4 claims need attention</div>
          </button>
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 text-left">
            <div className="text-blue-600 font-medium">Bulk Upload Documents</div>
            <div className="text-sm text-blue-500 mt-1">Upload multiple files</div>
          </button>
          <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 text-left">
            <div className="text-green-600 font-medium">Generate Reports</div>
            <div className="text-sm text-green-500 mt-1">Monthly summaries</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSummary;