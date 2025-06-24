import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { mainDashNav } from "../../../components/dashboard/ProviderSidebarNavList";
import MainContainer from "../../../components/dashboard/MainContainer";
import UserToolBar from "../../../components/dashboard/General/UserToolBar";
import { mainDashTPANav } from "../../../components/dashboard/TPA/TPASidebarNavList";
import TPADashboard from "../../../components/dashboard/TPA/TPADashboard";

const DashboardTpaHome = () => {
  return (
    <div className="w-full h-full min-h-screen font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <Sidebar tabs={mainDashTPANav} activeTab={"Dashboard"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <TPADashboard />
        </div>
      </MainContainer>
    </div>
  );
};

export default DashboardTpaHome;
