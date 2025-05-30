import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import SubmitClaim from "../../components/dashboard/Provider/SubmitClaim";

const SubmitClaimPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Submit New Claim"} />
      <MainContainer>
        <div className="w-full p-4">
          <SubmitClaim />
        </div>
      </MainContainer>
    </div>
  );
};

export default SubmitClaimPage;
