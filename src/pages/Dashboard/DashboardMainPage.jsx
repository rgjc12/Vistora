import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";

const DashboardMainPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={""} />
      <MainContainer>
        <div className="w-full flex gap-2 p-4 border border-green-400">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to your dashboard!
          </h1>
        </div>
        <div className="w-full h-full p-4 flex border border-yellow-300">
          rest of content
        </div>
      </MainContainer>
    </div>
  );
};

export default DashboardMainPage;
