import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import { useSelector } from "react-redux";
import Claims from "../../components/dashboard/Provider/Claims";

const ClaimPage = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Claims"} />
      <MainContainer>
        <div className="w-full p-4">
          <Claims />
        </div>
      </MainContainer>
    </div>
  );
};

export default ClaimPage;
