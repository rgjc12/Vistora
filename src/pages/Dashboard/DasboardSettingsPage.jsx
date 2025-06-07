import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import MainContainer from "../../components/dashboard/MainContainer";
import Settings from "../../components/dashboard/General/Settings";
import UserToolBar from "../../components/dashboard/General/UserToolBar";

const DasboardSettingsPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Settings"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <Settings />
        </div>
      </MainContainer>
    </div>
  );
};

export default DasboardSettingsPage;
