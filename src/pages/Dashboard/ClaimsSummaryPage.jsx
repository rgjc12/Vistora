import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import ClaimsSummary from "../../components/dashboard/Provider/ClaimsSummary";

const ClaimsSummaryPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Claims Summary"} />
      <MainContainer>
        <div className="w-full p-4">
          <ClaimsSummary />
        </div>
      </MainContainer>
    </div>
  );
};

export default ClaimsSummaryPage;
