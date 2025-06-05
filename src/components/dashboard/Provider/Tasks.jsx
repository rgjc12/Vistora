
import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  setSearchQuery,
  setFilter,
  updateTaskProgress,
} from "../../../store/slices/tasksSlice";
import { useNavigate } from "react-router-dom";
//import { setActiveTab } from "../../../pages/Profile/store/slices/uiSlice";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

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
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  )
}

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

    {/* Task cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  </div>
)

const Tasks = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [toast, setToast] = useState(null)

  // Add a more professional task creation modal
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    type: "claim",
    priority: "medium",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    assignee: "",
    claimId: "",
  })

  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  const addNotification = (type, title, message, taskId = null) => {
    const notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type,
      priority: type === "task" ? "high" : "medium",
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      actionText: type === "task" ? "View Task" : "View Details",
      actionUrl: type === "task" ? "/dashboard/tasks" : "/dashboard",
      taskId,
    }

    const existingNotifications = JSON.parse(localStorage.getItem("vistora_notifications") || "[]")
    existingNotifications.unshift(notification)
    localStorage.setItem("vistora_notifications", JSON.stringify(existingNotifications))
  }

  useEffect(() => {
    generateTasks()
  }, [])

  const generateTasks = () => {
    try {
      // Get claims data to generate claim-related tasks
      const storedClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")

      const claimTasks = []

      // Generate tasks based on claims
      storedClaims.forEach((claim) => {
        const claimId = claim.claimId || `CLM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`

        // Missing documentation task
        if (!claim.uploadedFiles || claim.uploadedFiles.length === 0) {
          claimTasks.push({
            id: `task_${Date.now()}_${Math.random()}`,
            title: "Missing Documentation",
            description: `Upload required medical records for claim ${claimId}`,
            type: "claim",
            priority: "high",
            status: "pending",
            assignee: "unassigned",
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
            createdAt: claim.savedAt,
            claimId: claimId,
            claimData: claim,
          })
        }

        // High value claim review
        const totalCharges =
          claim.service?.procedures?.reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0) || 0

        if (totalCharges > 5000) {
          claimTasks.push({
            id: `task_${Date.now()}_${Math.random()}`,
            title: "High Value Claim Review",
            description: `Review high-value claim ${claimId} ($${totalCharges.toFixed(2)}) for authorization`,
            type: "claim",
            priority: "medium",
            status: "pending",
            assignee: "unassigned",
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
            createdAt: claim.savedAt,
            claimId: claimId,
            claimData: claim,
          })
        }

        // Multiple procedures verification
        if (claim.service?.procedures && claim.service.procedures.length > 2) {
          claimTasks.push({
            id: `task_${Date.now()}_${Math.random()}`,
            title: "Multiple Procedures Verification",
            description: `Verify medical necessity for ${claim.service.procedures.length} procedures in claim ${claimId}`,
            type: "claim",
            priority: "medium",
            status: "pending",
            assignee: "unassigned",
            dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
            createdAt: claim.savedAt,
            claimId: claimId,
            claimData: claim,
          })
        }

        // Draft completion reminder
        if (claim.isDraft) {
          claimTasks.push({
            id: `task_${Date.now()}_${Math.random()}`,
            title: "Complete Draft Claim",
            description: `Finalize and submit draft claim ${claimId}`,
            type: "claim",
            priority: "low",
            status: "pending",
            assignee: "unassigned",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            createdAt: claim.savedAt,
            claimId: claimId,
            claimData: claim,
          })
        }
      })

      // Generate some general administrative tasks
      const adminTasks = [
        {
          id: `task_${Date.now()}_admin1`,
          title: "Monthly Claims Report",
          description: "Generate and review monthly claims processing report",
          type: "administrative",
          priority: "medium",
          status: "pending",
          assignee: "unassigned",
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: `task_${Date.now()}_admin2`,
          title: "Provider Network Update",
          description: "Update provider network information and contracts",
          type: "administrative",
          priority: "low",
          status: "in_progress",
          assignee: "admin_user",
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: `task_${Date.now()}_admin3`,
          title: "System Maintenance",
          description: "Perform routine system maintenance and updates",
          type: "technical",
          priority: "high",
          status: "completed",
          assignee: "tech_team",
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: `task_${Date.now()}_admin4`,
          title: "Compliance Audit Preparation",
          description: "Prepare documentation for upcoming compliance audit",
          type: "compliance",
          priority: "high",
          status: "pending",
          assignee: "compliance_team",
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      const allTasks = [...claimTasks, ...adminTasks]
      setTasks(allTasks)
      setLoading(false)
    } catch (error) {
      console.error("Error generating tasks:", error)
      setLoading(false)
    }
  }

  // Add this function to handle creating a new task
  const handleCreateTask = () => {
    if (!newTaskData.title || !newTaskData.description) {
      showToast("Title and description are required", "error")
      return
    }

    const newTask = {
      id: `task_${Date.now()}_${Math.random()}`,
      ...newTaskData,
      status: "pending",
      createdAt: new Date().toISOString(),
      tags: newTaskData.type === "claim" ? ["claim-related", "review-required"] : ["administrative"],
    }

    setTasks([newTask, ...tasks])
    setShowCreateTaskModal(false)
    setNewTaskData({
      title: "",
      description: "",
      type: "claim",
      priority: "medium",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      assignee: "",
      claimId: "",
    })

    showToast("Task created successfully", "success")

    // Add notification for new task
    addNotification("task", "New Task Created", `A new task "${newTask.title}" has been created`, newTask.id)
  }

  const handleTaskAction = (taskId, action) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    if (action === "complete") {
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, status: "completed", completedAt: new Date().toISOString() } : t)),
      )

      addNotification("task", "Task Completed", `Task "${task.title}" has been marked as completed`, taskId)

      showToast("Task marked as completed", "success")
    } else if (action === "assign") {
      const assignee = prompt("Enter assignee name:")
      if (assignee) {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, assignee: assignee, status: "in_progress" } : t)))

        addNotification("task", "Task Assigned", `Task "${task.title}" has been assigned to ${assignee}`, taskId)

        showToast(`Task assigned to ${assignee}`, "success")
      }
    } else if (action === "view_claim") {
      if (task.claimId) {
        navigate(`/dashboard/claims?claimId=${task.claimId}`)
      }
    }
  }

  const handleViewTask = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 30) return `${diffInDays} days ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths === 1) return "1 month ago"
    return `${diffInMonths} months ago`
  }

  const getDaysUntilDue = (dueDateString) => {
    const now = new Date()
    const dueDate = new Date(dueDateString)
    const diffInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))
    return diffInDays
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "claim":
        return "📋"
      case "administrative":
        return "📊"
      case "technical":
        return "⚙️"
      case "compliance":
        return "🛡️"
      default:
        return "📝"
    }
  }

  // Filter tasks based on filter and search
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter || task.priority === filter || task.type === filter
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.claimId && task.claimId.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  // Task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => t.status !== "completed" && getDaysUntilDue(t.dueDate) < 0).length,
    highPriority: tasks.filter((t) => t.priority === "high" && t.status !== "completed").length,
    claimRelated: tasks.filter((t) => t.type === "claim").length,
  }

  // Task Detail Modal
  const TaskDetailModal = () => {
    if (!selectedTask || !showTaskModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(selectedTask.type)}</span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedTask.title}</h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedTask.status)}`}
                  >
                    {selectedTask.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Priority</div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getPriorityColor(selectedTask.priority)}`}
                  >
                    {selectedTask.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Type</div>
                  <div className="text-slate-900 capitalize">{selectedTask.type}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Assignee</div>
                  <div className="text-slate-900">
                    {selectedTask.assignee === "unassigned" ? "Unassigned" : selectedTask.assignee}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-700">{selectedTask.description}</p>
            </div>

            {/* Claim Information (if applicable) */}
            {selectedTask.type === "claim" && selectedTask.claimData && (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Related Claim Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">Claim ID</div>
                    <div className="text-emerald-900 font-mono">{selectedTask.claimId}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">Username</div>
                    <div className="text-emerald-900 font-mono">{selectedTask.username}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">Provider</div>
                    <div className="text-emerald-900">{selectedTask.claimData.provider?.name || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1">Service Date</div>
                    <div className="text-emerald-900">{selectedTask.claimData.service?.dateOfService || "N/A"}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowTaskModal(false)
                    handleTaskAction(selectedTask.id, "view_claim")
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200"
                >
                  View Related Claim
                </button>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Created</h3>
                <p className="text-slate-700">{new Date(selectedTask.createdAt).toLocaleString()}</p>
                <p className="text-slate-500 text-sm">{getTimeAgo(selectedTask.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Due Date</h3>
                <p className="text-slate-700">{new Date(selectedTask.dueDate).toLocaleString()}</p>
                <p
                  className={`text-sm ${getDaysUntilDue(selectedTask.dueDate) < 0 ? "text-red-600" : "text-slate-500"}`}
                >
                  {getDaysUntilDue(selectedTask.dueDate) < 0
                    ? `Overdue by ${Math.abs(getDaysUntilDue(selectedTask.dueDate))} days`
                    : `Due in ${getDaysUntilDue(selectedTask.dueDate)} days`}
                </p>
              </div>
            </div>

            {selectedTask.completedAt && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Completed</h3>
                <p className="text-slate-700">{new Date(selectedTask.completedAt).toLocaleString()}</p>
                <p className="text-slate-500 text-sm">{getTimeAgo(selectedTask.completedAt)}</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            {selectedTask.status !== "completed" && (
              <>
                {selectedTask.assignee === "unassigned" && (
                  <button
                    onClick={() => {
                      setShowTaskModal(false)
                      handleTaskAction(selectedTask.id, "assign")
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
                  >
                    Assign Task
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowTaskModal(false)
                    handleTaskAction(selectedTask.id, "complete")
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold"
                >
                  Mark Complete
                </button>
              </>
            )}
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Add this component for the create task modal
  const CreateTaskModal = () => {
    if (!showCreateTaskModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Create New Task</h2>
              <button
                onClick={() => setShowCreateTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Task Title *</label>
              <input
                type="text"
                placeholder="Enter task title"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
              <textarea
                placeholder="Enter task description"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                rows={4}
                value={newTaskData.description}
                onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Task Type</label>
                <select
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={newTaskData.type}
                  onChange={(e) => setNewTaskData({ ...newTaskData, type: e.target.value })}
                >
                  <option value="claim">Claim Related</option>
                  <option value="administrative">Administrative</option>
                  <option value="technical">Technical</option>
                  <option value="compliance">Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                <select
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={newTaskData.priority}
                  onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={newTaskData.dueDate}
                  onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              {newTaskData.type === "claim" ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Claim ID (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter related claim ID"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={newTaskData.claimId}
                    onChange={(e) => setNewTaskData({ ...newTaskData, claimId: e.target.value })}
                  />
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Assignee (optional)</label>
              <input
                type="text"
                placeholder="Enter assignee name"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={newTaskData.assignee}
                onChange={(e) => setNewTaskData({ ...newTaskData, assignee: e.target.value })}
              />
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateTaskModal(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              disabled={!newTaskData.title || !newTaskData.description}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <SkeletonLoader />
  }

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Task Management
          </h1>
          <p className="text-slate-600 mt-1">Manage your tasks and assignments</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateTaskModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
          >
            + Create Task
          </button>
          <button
            onClick={generateTasks}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
          >
            🔄 Refresh Tasks
          </button>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 text-xl">📋</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{taskStats.total}</div>
              <div className="text-blue-700 text-sm font-semibold">Total Tasks</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600 text-xl">⏰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-900">{taskStats.pending}</div>
              <div className="text-orange-700 text-sm font-semibold">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-yellow-600 text-xl">🔄</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-900">{taskStats.inProgress}</div>
              <div className="text-yellow-700 text-sm font-semibold">In Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{taskStats.completed}</div>
              <div className="text-green-700 text-sm font-semibold">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {taskStats.overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">⚠️</span>
            <span className="text-red-800 font-medium">Alert:</span>
            <span className="text-red-700 ml-2">{taskStats.overdue} tasks are overdue</span>
          </div>
        </div>
      )}

      {taskStats.highPriority > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-orange-600 mr-2">🔥</span>
            <span className="text-orange-800 font-medium">High Priority:</span>
            <span className="text-orange-700 ml-2">{taskStats.highPriority} high priority tasks need attention</span>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tasks by title, description, claim ID, or username..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <select
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="claim">Claim Related</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Tasks Found</h3>
            <p className="text-slate-600">
              {searchQuery || filter !== "all"
                ? "No tasks match your current search or filter criteria."
                : "No tasks available at the moment."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                task.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : getDaysUntilDue(task.dueDate) < 0
                    ? "border-red-200 bg-red-50"
                    : task.priority === "high"
                      ? "border-orange-200 bg-orange-50"
                      : "border-slate-200"
              }`}
              onClick={() => handleViewTask(task)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(task.type)}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{task.title}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}
                >
                  {task.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              <p className="text-slate-600 mb-4 line-clamp-2">{task.description}</p>

              {task.type === "claim" && task.claimId && (
                <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-emerald-900">Related Claim</div>
                  <div className="text-emerald-800 font-mono text-sm">{task.claimId}</div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div>
                  <div>Created {getTimeAgo(task.createdAt)}</div>
                  <div className={getDaysUntilDue(task.dueDate) < 0 ? "text-red-600 font-semibold" : ""}>
                    {getDaysUntilDue(task.dueDate) < 0
                      ? `Overdue by ${Math.abs(getDaysUntilDue(task.dueDate))} days`
                      : `Due in ${getDaysUntilDue(task.dueDate)} days`}
                  </div>
                </div>
                <div className="text-right">
                  <div>Assignee:</div>
                  <div className="font-semibold">{task.assignee === "unassigned" ? "Unassigned" : task.assignee}</div>
                </div>
              </div>

              <div className="flex space-x-2">
                {task.status !== "completed" && (
                  <>
                    {task.assignee === "unassigned" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTaskAction(task.id, "assign")
                        }}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-semibold"
                      >
                        Assign
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTaskAction(task.id, "complete")
                      }}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-semibold"
                    >
                      Complete
                    </button>
                  </>
                )}
                {task.type === "claim" && task.claimId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTaskAction(task.id, "view_claim")
                    }}
                    className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 text-sm font-semibold"
                  >
                    View Claim
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal />

      {/* Create Task Modal */}
      <CreateTaskModal />
    </div>
  )
}

export default Tasks
