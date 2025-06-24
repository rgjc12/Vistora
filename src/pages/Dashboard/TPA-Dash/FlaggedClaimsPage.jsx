import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { mainDashTPANav } from "../../../components/dashboard/TPA/TPASidebarNavList";
import MainContainer from "../../../components/dashboard/MainContainer";
import UserToolBar from "../../../components/dashboard/General/UserToolBar";
import FlaggedClaims from "../../../components/dashboard/TPA/FlaggedClaims";

const FlaggedClaimsPage = () => {
  return (
    <div className="w-full h-full min-h-screen font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <Sidebar tabs={mainDashTPANav} activeTab={"Flagged Claims"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <FlaggedClaims />
        </div>
      </MainContainer>
    </div>
  );
};

export default FlaggedClaimsPage;
