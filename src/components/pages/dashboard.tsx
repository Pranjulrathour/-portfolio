import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import DashboardGrid from "../dashboard/DashboardGrid";
import TaskBoard from "../dashboard/TaskBoard";
import ActivityFeed from "../dashboard/ActivityFeed";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            <DashboardGrid />
            <TaskBoard />
          </div>
        </main>
        <div className="w-[280px] border-l bg-background">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Home;
