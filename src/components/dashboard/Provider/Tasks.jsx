import React, { useEffect } from "react";
/*
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  setSearchQuery,
  setFilter,
  updateTaskProgress,
} from "../../../pages/Profile/store/slices/tasksSlice";
import { setActiveTab } from "../../../pages/Profile/store/slices/uiSlice";*/

const Tasks = () => {
  //const dispatch = useDispatch();
  /*const { recentTasks, activeProjects, loading, error, filters } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);*/

  const handleTaskClick = (taskId) => {
    // In a real app, you might want to fetch task details here
    // and then navigate to the task details page
    //dispatch(setActiveTab("task-details"));
  };

  /*
  if (loading) {
    return <div className="text-center py-12">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }*/

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + New Task
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tasks and projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          /*value={filters.priority}
          onChange={(e) =>
            dispatch(
              setFilter({ filterType: "priority", value: e.target.value })
            )
          }*/
        >
          <option value="all">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          /*value={filters.status}
          onChange={(e) =>
            dispatch(setFilter({ filterType: "status", value: e.target.value }))
          }*/
        >
          <option value="all">Status</option>
          <option value="in-progress">In Progress</option>
          <option value="on-track">On Track</option>
          <option value="review">Review</option>
          <option value="urgent">Urgent</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          /*value={filters.date}
          onChange={(e) =>
            dispatch(setFilter({ filterType: "date", value: e.target.value }))
          }*/
        >
          <option value="all">Date</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
        </select>
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="text-lg font-medium mb-4">Recent Tasks</h2>
        <div className="grid grid-cols-2 gap-4">
          {/*recentTasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{task.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    task.status === "Urgent"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${
                    task.status === "Urgent" ? "bg-red-600" : "bg-yellow-600"
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{task.dueDate}</p>
            </div>
                ))*/}
        </div>
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="text-lg font-medium mb-4">Active Projects</h2>
        <div className="grid grid-cols-3 gap-4">
          {/*
          activeProjects.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{task.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    task.color === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : task.color === "green"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      task.color === "blue"
                        ? "bg-blue-600"
                        : task.color === "green"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{task.due}</p>
            </div>
          ))
                  */}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
