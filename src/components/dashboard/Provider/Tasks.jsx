import DashButton from "../../buttons/DashButton";
import DashboardStatCard from "../General/DashboardStatCard";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Clock, FileWarning, PlusCircleIcon } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchTasks,
//   setSearchQuery,
//   setFilter,
//   updateTaskProgress,
// } from "../../../store/slices/tasksSlice";
import { useNavigate } from "react-router-dom";
//import { setActiveTab } from "../../../pages/Profile/store/slices/uiSlice";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Skeleton loading component
const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="h-8 bg-gray-200 rounded w-64"></div>
    </div>

    {/* Stats skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>

    {/* Table skeleton */}
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    relatedClaim: "",
    assignedTo: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "dueDate",
    direction: "asc",
  });
  const [toast, setToast] = useState(null);
  const [availableClaims, setAvailableClaims] = useState([]);
  const [aiInsights, setAiInsights] = useState({
    taskEfficiency: 87,
    avgCompletionTime: "2.4 days",
    aiSuggestions: 12,
    automationRate: 34,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    loadTasksFromStorage();
    loadAvailableClaims();

    // Simulate AI insights updating
    const interval = setInterval(() => {
      setAiInsights((prev) => ({
        ...prev,
        taskEfficiency: Math.max(
          80,
          Math.min(95, prev.taskEfficiency + (Math.random() - 0.5) * 3)
        ),
        aiSuggestions: Math.max(
          8,
          Math.min(
            20,
            prev.aiSuggestions + Math.floor((Math.random() - 0.5) * 3)
          )
        ),
        automationRate: Math.max(
          25,
          Math.min(45, prev.automationRate + (Math.random() - 0.5) * 2)
        ),
      }));
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const loadAvailableClaims = () => {
    try {
      const storedClaims = JSON.parse(
        localStorage.getItem("vistora_claims") || "[]"
      );
      const claimOptions = storedClaims.map((claim) => ({
        id: claim.id,
        claimId: claim.claimId,
        provider: claim.provider?.name || "Unknown Provider",
      }));
      setAvailableClaims(claimOptions);
    } catch (error) {
      console.error("Error loading claims:", error);
    }
  };

  const loadTasksFromStorage = () => {
    try {
      const storedTasks = JSON.parse(
        localStorage.getItem("vistora_tasks") || "[]"
      );

      if (storedTasks.length === 0) {
        // Generate sample tasks if none exist
        const sampleTasks = generateSampleTasks();
        localStorage.setItem("vistora_tasks", JSON.stringify(sampleTasks));
        setTasks(sampleTasks);
      } else {
        setTasks(storedTasks);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setLoading(false);
    }
  };

  const generateSampleTasks = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
      {
        id: "task_1",
        title: "Review AI-flagged claim",
        description:
          "AI system has flagged this claim for potential coding issues. Review the rejected claim and identify the reason for rejection. Prepare documentation for resubmission.",
        status: "pending",
        priority: "high",
        createdAt: now.toISOString(),
        dueDate: tomorrow.toISOString(),
        relatedClaim: "CLM-2023-0001",
        assignedTo: "Current User",
        aiGenerated: true,
        aiConfidence: 94,
        comments: [
          {
            id: "comment_1",
            text: "AI Analysis: The claim was rejected due to missing diagnosis code. Confidence: 94%",
            author: "AI Assistant",
            timestamp: now.toISOString(),
            isAI: true,
          },
        ],
      },
      {
        id: "task_2",
        title: "Upload missing documentation (AI Recommended)",
        description:
          "AI has detected missing documentation for the patient's claim. Required documents: Discharge summary, Lab results. Priority set by AI risk assessment.",
        status: "pending",
        priority: "medium",
        createdAt: now.toISOString(),
        dueDate: nextWeek.toISOString(),
        relatedClaim: "CLM-2023-0002",
        assignedTo: "Current User",
        aiGenerated: true,
        aiConfidence: 87,
        comments: [],
      },
      {
        id: "task_3",
        title: "Verify patient insurance",
        description:
          "Contact the insurance provider to verify patient's coverage details before submitting the claim. AI suggests this is routine verification.",
        status: "completed",
        priority: "medium",
        createdAt: new Date(now.getTime() - 86400000 * 3).toISOString(), // 3 days ago
        dueDate: new Date(now.getTime() - 86400000).toISOString(), // Yesterday
        completedAt: now.toISOString(),
        relatedClaim: "CLM-2023-0003",
        assignedTo: "Current User",
        aiGenerated: false,
        comments: [
          {
            id: "comment_2",
            text: "Called insurance provider. Patient has active coverage.",
            author: "Current User",
            timestamp: now.toISOString(),
            isAI: false,
          },
        ],
      },
    ];
  };

  const handleCreateTask = useCallback(() => {
    try {
      const taskId = `task_${Date.now()}`;
      const now = new Date();
      const task = {
        id: taskId,
        ...newTask,
        status: "pending",
        createdAt: now.toISOString(),
        comments: [],
        aiGenerated: false,
        aiConfidence: null,
      };

      const updatedTasks = [...tasks, task];
      localStorage.setItem("vistora_tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setShowCreateModal(false);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        relatedClaim: "",
        assignedTo: "",
      });
      showToast("Task created successfully", "success");
    } catch (error) {
      console.error("Error creating task:", error);
      showToast("Error creating task", "error");
    }
  }, [newTask, tasks]);

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            status: newStatus,
          };

          if (newStatus === "completed") {
            updatedTask.completedAt = new Date().toISOString();
          } else {
            delete updatedTask.completedAt;
          }

          return updatedTask;
        }
        return task;
      });

      localStorage.setItem("vistora_tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(
          updatedTasks.find((task) => task.id === selectedTask.id)
        );
      }

      showToast(
        `Task marked as ${
          newStatus === "completed" ? "completed" : "pending"
        } successfully`,
        "success"
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      showToast("Error updating task status", "error");
    }
  };

  const handleAddComment = (taskId, commentText) => {
    if (!commentText.trim()) return;

    try {
      const commentId = `comment_${Date.now()}`;
      const now = new Date();
      const comment = {
        id: commentId,
        text: commentText,
        author: "Current User",
        timestamp: now.toISOString(),
        isAI: false,
      };

      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            comments: [...(task.comments || []), comment],
          };
        }
        return task;
      });

      localStorage.setItem("vistora_tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(
          updatedTasks.find((task) => task.id === selectedTask.id)
        );
      }

      showToast("Comment added successfully", "success");
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error adding comment:", error);
      showToast("Error adding comment", "error");
      return false; // Return false to indicate failure
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("vistora_tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setShowTaskModal(false);
      showToast("Task deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showToast("Error deleting task", "error");
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleNavigateToRelatedClaim = (claimId) => {
    // In a real app, you would navigate to the claim details page
    // For now, we'll just close the modal and show a toast
    setShowTaskModal(false);
    showToast(`Navigating to claim ${claimId}`, "info");
  };

  // Sort tasks based on sortConfig
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (sortConfig.key === "dueDate") {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Default string comparison for other fields
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  // Handle column sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter tasks based on search query, status, and priority
  const filteredTasks = sortedTasks.filter((task) => {
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.relatedClaim.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (task) => {
    if (task.status === "completed") return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now;
  };

  // Task Modal Component
  const TaskModal = () => {
    const [commentText, setCommentText] = useState("");

    if (!selectedTask || !showTaskModal) return null;

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      const success = handleAddComment(selectedTask.id, commentText);
      if (success) {
        setCommentText("");
      }
    };

    return (
      <div className="fixed inset-0 !mt-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Task Details
                </h2>
                {selectedTask.aiGenerated && (
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
                    <span className="text-purple-600 text-sm">🤖</span>
                    <span className="text-purple-700 text-xs font-semibold">
                      AI Generated
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Task Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Task Title
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {selectedTask.title}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Status
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        selectedTask.status
                      )}`}
                    >
                      {selectedTask.status === "completed"
                        ? "Completed"
                        : "Pending"}
                    </span>
                    {selectedTask.status === "pending" ? (
                      <button
                        onClick={() =>
                          handleUpdateTaskStatus(selectedTask.id, "completed")
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
                        Mark Complete
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleUpdateTaskStatus(selectedTask.id, "pending")
                        }
                        className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700"
                      >
                        Mark Pending
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Priority
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(
                      selectedTask.priority
                    )}`}
                  >
                    {selectedTask.priority.charAt(0).toUpperCase() +
                      selectedTask.priority.slice(1)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Due Date
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      isOverdue(selectedTask)
                        ? "text-red-600"
                        : "text-slate-900"
                    }`}
                  >
                    {formatDate(selectedTask.dueDate)}
                    {isOverdue(selectedTask) && (
                      <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Section */}
            {selectedTask.aiGenerated && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      AI Task Analysis
                    </h3>
                    <p className="text-purple-700 text-sm">
                      Intelligent task prioritization and insights
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="text-sm font-semibold text-slate-700 mb-1">
                      AI Confidence
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedTask.aiConfidence}%
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="text-sm font-semibold text-slate-700 mb-1">
                      Task Type
                    </div>
                    <div className="text-lg font-bold text-indigo-600">
                      AI Generated
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Task Description */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Description
              </h3>
              <p className="text-slate-700 whitespace-pre-wrap">
                {selectedTask.description}
              </p>
            </div>

            {/* Related Claim */}
            {selectedTask.relatedClaim && (
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Related Claim
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-slate-700">
                    Claim ID: {selectedTask.relatedClaim}
                  </div>
                  <button
                    onClick={() =>
                      handleNavigateToRelatedClaim(selectedTask.relatedClaim)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Claim
                  </button>
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Comments
              </h3>
              <div className="space-y-4 mb-6">
                {selectedTask.comments && selectedTask.comments.length > 0 ? (
                  selectedTask.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-lg ${
                        comment.isAI
                          ? "bg-purple-50 border border-purple-200"
                          : "bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium text-slate-900">
                            {comment.author}
                          </div>
                          {comment.isAI && (
                            <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                              <span className="text-purple-600 text-xs">
                                🤖
                              </span>
                              <span className="text-purple-700 text-xs font-semibold">
                                AI
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-slate-700">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500">No comments yet.</div>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Add Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!commentText.trim()}
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-between">
            <button
              onClick={() => handleDeleteTask(selectedTask.id)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold"
            >
              Delete Task
            </button>
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Create Task Modal - FIXED INPUT ISSUE
  const CreateTaskModal = useCallback(() => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 !mt-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Create New Task
                </h2>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
                  <span className="text-purple-600 text-sm">🤖</span>
                  <span className="text-purple-700 text-xs font-semibold">
                    AI Assisted
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter task title (AI will suggest improvements)"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter task description (AI will analyze for completeness)"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Priority * (AI Recommended)
                  </label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="relatedClaim"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Related Claim (Optional)
                </label>
                <select
                  id="relatedClaim"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTask.relatedClaim}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      relatedClaim: e.target.value,
                    }))
                  }
                >
                  <option value="">None</option>
                  {availableClaims.map((claim) => (
                    <option key={claim.id} value={claim.claimId}>
                      {claim.claimId} - {claim.provider}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Assigned To *
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter assignee name"
                  value={newTask.assignedTo}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      assignedTo: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 font-semibold"
              disabled={
                !newTask.title ||
                !newTask.description ||
                !newTask.dueDate ||
                !newTask.assignedTo
              }
            >
              🤖 Create AI-Enhanced Task
            </button>
          </div>
        </div>
      </div>
    );
  }, [showCreateModal, newTask, availableClaims, handleCreateTask]);

  if (loading) {
    return <SkeletonLoader />;
  }

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter((task) => isOverdue(task)).length;
  const aiGeneratedTasks = tasks.filter((task) => task.aiGenerated).length;

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-fit flex flex-col items-start gap-0">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              AI-Powered Task Management
            </h1>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full">
              <span className="text-purple-600 text-lg">🤖</span>
              <span className="text-purple-700 text-sm font-semibold">
                Intelligent Automation
              </span>
            </div>
          </div>
          <p className="text-[0.9rem] text-neutral-400">
            AI-enhanced task tracking and management
          </p>
        </div>

        <DashButton
          icon={<PlusCircleIcon />}
          text={"Create AI-Enhanced Task"}
          action={() => setShowCreateModal(true)}
          primary={true}
        />
      </div>

      {/* AI Insights Card */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-bold text-purple-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              AI Task Intelligence
            </h3>
            <p className="text-purple-700">
              Real-time task optimization and insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="text-sm font-semibold text-slate-700 mb-1">
              Task Efficiency
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {aiInsights.taskEfficiency.toFixed(0)}%
            </div>
            <div className="text-xs text-slate-500">AI Optimized</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="text-sm font-semibold text-slate-700 mb-1">
              Avg Completion
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {aiInsights.avgCompletionTime}
            </div>
            <div className="text-xs text-slate-500">AI Predicted</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="text-sm font-semibold text-slate-700 mb-1">
              AI Suggestions
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {aiInsights.aiSuggestions}
            </div>
            <div className="text-xs text-slate-500">This Week</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="text-sm font-semibold text-slate-700 mb-1">
              Automation Rate
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {aiInsights.automationRate.toFixed(0)}%
            </div>
            <div className="text-xs text-slate-500">AI Automated</div>
          </div>
        </div>
      </div>

      {/* Task Summary Cards */}
      <div className="flex flex-wrap w-full gap-2 xl:gap-3">
        <DashboardStatCard
          cardTitle={"Total Tasks"}
          cardNumber={totalTasks.toString()}
          icon={<Clock className="size-[24px]" />}
        />
        <DashboardStatCard
          cardTitle={"AI Generated Tasks"}
          cardNumber={aiGeneratedTasks.toString()}
          cardAnalytics={"Smart automation"}
          cardHighlighted={aiGeneratedTasks > 0}
          icon={<Clock className="size-[24px]" />}
        />
        <DashboardStatCard
          cardTitle={"Pending Tasks"}
          cardNumber={pendingTasks.toString()}
          cardHighlighted={pendingTasks > 0}
          icon={<Clock className="size-[24px]" />}
        />
        <DashboardStatCard
          cardTitle={"Overdue Tasks"}
          cardNumber={overdueTasks.toString()}
          cardHighlighted={overdueTasks > 0}
          icon={<FileWarning className="size-[24px]" />}
        />
        <DashboardStatCard
          cardTitle={"Completed Tasks"}
          cardNumber={completedTasks.toString()}
          icon={<CheckCircle className="size-[24px]" />}
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-white py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">
              AI-Enhanced Search & Filter
            </h3>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full">
              <span className="text-purple-600 text-sm">🤖</span>
              <span className="text-purple-700 text-xs font-semibold">
                Smart Search
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="AI-powered search by title, description, or related claim..."
                className="w-full text-sm pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-3.5 text-purple-400">
                🔍
              </span>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterStatus === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All Tasks
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterStatus === "pending"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterStatus === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </button>
          </div>

          {/* Priority Filter */}
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterPriority === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterPriority("all")}
            >
              All Priorities
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterPriority === "high"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterPriority("high")}
            >
              High
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterPriority === "medium"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterPriority("medium")}
            >
              Medium
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-lg ${
                filterPriority === "low"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilterPriority("low")}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-3 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-purple-600 text-lg">🤖</span>
            <span className="text-purple-700 font-semibold">
              AI-Enhanced Tasks Table
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("title")}
                >
                  Task{" "}
                  {sortConfig.key === "title" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("dueDate")}
                >
                  Due Date{" "}
                  {sortConfig.key === "dueDate" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Related Claim
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No tasks found. Try adjusting your search or filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`hover:bg-gray-50 ${
                      isOverdue(task)
                        ? "bg-red-50 border-l-4 border-red-400"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium text-blue-600">
                          {task.title}
                        </div>
                        {task.aiGenerated && (
                          <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                            <span className="text-purple-600 text-xs">🤖</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {task.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          isOverdue(task) ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {formatDate(task.dueDate)}
                        {isOverdue(task) && (
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                            Overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.aiGenerated ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-600 text-sm">🤖</span>
                          <span className="text-xs text-purple-700 font-medium">
                            AI Generated
                          </span>
                          {task.aiConfidence && (
                            <span className="text-xs text-purple-600">
                              ({task.aiConfidence}%)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Manual</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {task.relatedClaim || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewTask(task)}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          View
                        </button>
                        {task.status === "pending" ? (
                          <button
                            onClick={() =>
                              handleUpdateTaskStatus(task.id, "completed")
                            }
                            className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                          >
                            Complete
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleUpdateTaskStatus(task.id, "pending")
                            }
                            className="text-yellow-600 hover:text-yellow-900 px-2 py-1 rounded hover:bg-yellow-50"
                          >
                            Reopen
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal />

      {/* Create Task Modal */}
      <CreateTaskModal />
    </div>
  );
};

export default Tasks;
