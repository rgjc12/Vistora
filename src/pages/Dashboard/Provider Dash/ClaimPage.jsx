import React from "react";

import Sidebar from "../../../components/dashboard/Sidebar";
import MainContainer from "../../../components/dashboard/MainContainer";
import UserToolBar from "../../../components/dashboard/General/UserToolBar";
import Claims from "../../../components/dashboard/Provider/Claims";
import { mainDashNav } from "../../../components/dashboard/ProviderSidebarNavList";

const ClaimPage = () => {
  return (
    <div className="w-full h-full min-h-screen font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <Sidebar tabs={mainDashNav} activeTab={"Claims"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <Claims />
        </div>
      </MainContainer>
    </div>
  );
};

export default ClaimPage;
