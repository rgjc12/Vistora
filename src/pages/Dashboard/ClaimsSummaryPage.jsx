import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import ClaimsSummary from "../../components/dashboard/Provider/ClaimsSummary";
import UserToolBar from "../../components/dashboard/General/UserToolBar";

const ClaimsSummaryPage = () => {
  return (
    <div className="w-full h-full min-h-screen font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <Sidebar tabs={mainDashNav} activeTab={"Claims Summary"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <ClaimsSummary />
        </div>
      </MainContainer>
    </div>
  );
};

export default ClaimsSummaryPage;
