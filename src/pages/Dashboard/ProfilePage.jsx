import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import MainContainer from "../../components/dashboard/MainContainer";
import Profile from "../../components/dashboard/General/Profile";

const ProfilePage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Profile"} />
      <MainContainer>
        <Profile />
      </MainContainer>
    </div>
  );
};

export default ProfilePage;
