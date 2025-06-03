import React from "react";

import { useSelector } from "react-redux";
import Sidebar from "../../../components/dashboard/Sidebar";
import MainContainer from "../../../components/dashboard/MainContainer";
import { mainDashNav } from "../../../components/dashboard/ProviderSidebarNavList";
import ClaimsSummary from "../../../components/dashboard/Provider/ClaimsSummary";
import Claims from "../../../components/dashboard/Provider/Claims";
import Notifications from "../../../components/dashboard/General/Notifications";
import Tasks from "../../../components/dashboard/Provider/Tasks";
import Settings from "../../../components/dashboard/General/Settings";
<<<<<<< HEAD:src/pages/Dashboard/Provider Dash/ProviderDash.jsx
=======
import SubmitClaim from "../../../components/dashboard/Provider/SubmitClaim";
>>>>>>> main:src/pages/Dashboard/Profile/Profile.jsx

const ProviderDash = () => {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const renderContent = () => {
    switch (activeTab) {
      case "claims-summary":
        return <ClaimsSummary />;
        case "submit-claim":
        return <SubmitClaim />;
      case "claims":
        return <Claims />;
      case "notifications":
        return <Notifications />;
      case "tasks":
        return <Tasks />;
      /*
      case "task-details":
        return <TaskDetails />;*/
<<<<<<< HEAD:src/pages/Dashboard/Provider Dash/ProviderDash.jsx

=======
>>>>>>> main:src/pages/Dashboard/Profile/Profile.jsx
      case "settings":
        return <Settings />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Select a section from the sidebar to view content
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={""} />
      <MainContainer>
        <div className="w-full flex gap-2 p-4 border border-green-400">
          {renderContent()}
        </div>
      </MainContainer>
    </div>
  );
};

export default ProviderDash;
