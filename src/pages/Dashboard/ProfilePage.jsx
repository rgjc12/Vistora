import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/dashboard/Sidebar";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import MainContainer from "../../components/dashboard/MainContainer";
import Profile from "../../components/dashboard/General/Profile";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
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
