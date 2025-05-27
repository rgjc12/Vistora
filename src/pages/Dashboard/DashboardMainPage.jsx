import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";

import MainContainer from "../../components/dashboard/MainContainer";
import { mainDashNav } from "../../components/dashboard/ProviderSidebarNavList";
import { useSelector } from "react-redux";

const DashboardMainPage = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <p>Loading authentication...</p>;
  }

  if (!isAuthenticated || !user) {
    return <p>No user logged in. Please sign in.</p>;
    // or navigate to login page
    // return <Navigate to="/auth/login" />;
  }

  return (
    <div className="w-full h-full min-h-screen">
      <Sidebar tabs={mainDashNav} activeTab={""} />
      <MainContainer>
        <div className="w-full flex gap-2 p-4 border border-green-400">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to your dashboard!
          </h1>
          <div className="space-y-2 bg-gray-100 p-4 rounded-md shadow">
            <p>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>UID:</strong> {user.uid}
            </p>
            <p>
              <strong>Role:</strong> {user.role || "N/A"}
            </p>
          </div>
        </div>
        <div className="w-full h-full p-4 flex border border-yellow-300">
          rest of content
        </div>
      </MainContainer>
    </div>
  );
};

export default DashboardMainPage;
