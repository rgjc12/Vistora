import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import Tasks from "../../components/dashboard/Provider/Tasks";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import { useSelector } from "react-redux";

const TasksPage = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Tasks"} />
      <MainContainer>
        <div className="w-full p-4">
          <Tasks />
        </div>
      </MainContainer>
    </div>
  );
};

export default TasksPage;
