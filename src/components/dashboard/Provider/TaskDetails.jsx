import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchTaskDetails,
  setNewComment,
  addComment,
  updateTaskProgress,
} from "../../../store/slices/tasksSlice";
import { useNavigate } from "react-router-dom";
//import { setActiveTab } from "../store/slices/uiSlice";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTask, loading, error, newComment } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    // In a real app, you would get the task ID from the URL or props
    // For this example, we'll just fetch task ID 3
    dispatch(fetchTaskDetails(3));
  }, [dispatch]);

  const handleBackToTasks = () => {
    //dispatch(setActiveTab("tasks"));
    navigate("/dashboard/tasks");
  };

  if (loading || !currentTask) {
    return <div className="text-center py-12">Loading task details...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={handleBackToTasks}
          >
            ←
          </button>
          <span className="text-sm text-gray-500">Task</span>
          <span className="text-sm text-gray-300"></span>
          <span className="text-sm text-gray-900">Task Details</span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">🔔</button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentTask.title}
        </h1>
        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
          {currentTask.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">📅</span>
              <span className="text-sm">Deadline</span>
              <span className="text-sm font-medium">
                {currentTask.deadline}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">🔴</span>
              <span className="text-sm">Priority</span>
              <span className="text-sm font-medium">
                {currentTask.priority}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{currentTask.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${currentTask.progress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Description</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                ✏️ Edit
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{currentTask.description}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Attachments</h2>
              <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                📎 Upload Files
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentTask.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <span
                    className={`${
                      attachment.type === "pdf"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {attachment.type === "pdf" ? "📄" : "📊"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-gray-500">{attachment.size}</p>
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Comments</h2>
            <div className="space-y-4">
              {currentTask.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="font-medium text-sm">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <textarea
                    placeholder="Write a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={newComment}
                    onChange={(e) => dispatch(setNewComment(e.target.value))}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    onClick={() => dispatch(addComment())}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>{/* Right sidebar content can go here */}</div>
      </div>
    </div>
  );
};

export default TaskDetails;
