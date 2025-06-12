"use client";
import React from "react";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import MainContainer from "../../components/dashboard/MainContainer";
import Sidebar from "../../components/dashboard/Sidebar";
import UserToolBar from "../../components/dashboard/General/UserToolBar";
import HelpAndSupport from "../../components/dashboard/General/HelpAndSupport";

const HelpAndSupportPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Help & Support"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <HelpAndSupport />
        </div>
      </MainContainer>
    </div>
  );
};

export default HelpAndSupportPage;
