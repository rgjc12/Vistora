import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import Notifications from "../../components/dashboard/General/Notifications";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";

const NotificationsPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Notifications"} />
      <MainContainer>
        <div className="w-full p-4">
          <Notifications />
        </div>
      </MainContainer>
    </div>
  );
};

export default NotificationsPage;
