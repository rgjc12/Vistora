import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { mainDashTPANav } from "../../../components/dashboard/TPA/TPASidebarNavList";
import MainContainer from "../../../components/dashboard/MainContainer";
import UserToolBar from "../../../components/dashboard/General/UserToolBar";
import AppealsManagement from "../../../components/dashboard/TPA/AppealsManagement";

const AppealsManagementPage = () => {
  return (
    <div className="w-full h-full min-h-screen font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <Sidebar tabs={mainDashTPANav} activeTab={"Appeals Management"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <AppealsManagement />
        </div>
      </MainContainer>
    </div>
  );
};

export default AppealsManagementPage;
