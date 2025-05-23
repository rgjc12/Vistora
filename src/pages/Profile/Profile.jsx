import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import ClaimsSummary from './components/ClaimsSummary';
import Claims from './components/Claims';
import Notifications from './components/Notifications';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';
import Settings from './components/Settings';
import CommunityForum from './components/CommunityForum';

const App = () => {
  const activeTab = useSelector(state => state.ui.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'claims-summary':
        return <ClaimsSummary />;
      case 'claims':
        return <Claims />;
      case 'notifications':
        return <Notifications />;
      case 'tasks':
        return <Tasks />;
      case 'task-details':
        return <TaskDetails />;
      case 'community-forum':
        return <CommunityForum />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a section from the sidebar to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;