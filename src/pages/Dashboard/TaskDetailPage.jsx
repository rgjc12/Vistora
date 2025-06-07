import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MainContainer from "../../components/dashboard/MainContainer";
import TaskDetails from "../../components/dashboard/Provider/TaskDetails";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import UserToolBar from "../../components/dashboard/General/UserToolBar";

const TaskDetailPage = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={"Tasks"} />
      <MainContainer>
        <UserToolBar />
        <div className="w-full p-4">
          <TaskDetails />
        </div>
      </MainContainer>
    </div>
  );
};

export default TaskDetailPage;
