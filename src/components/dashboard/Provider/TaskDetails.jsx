import React, { useEffect, useState} from "react";
// import { useSelector, useDispatch } from "react-redux";

import { useParams, useNavigate } from "react-router-dom"
// import {
//   fetchTaskDetails,
//   setNewComment,
//   addComment,
//   updateTaskProgress,
// } from "../../../store/slices/tasksSlice";

//import { setActiveTab } from "../store/slices/uiSlice";

// Toast notification component
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
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>

    {/* Content skeleton */}
    <div className="bg-white p-6 rounded-lg border">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
)

const TaskDetails = ({ taskId: propTaskId, task: propTask }) => {
  const navigate = useNavigate()
  const params = useParams()
  const taskId = propTaskId || params?.taskId

  const [task, setTask] = useState(propTask || null)
  const [loading, setLoading] = useState(!propTask)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assignee, setAssignee] = useState("")
  const [toast, setToast] = useState(null)
  const [selectedUser, setSelectedUser] = useState("") // Moved to top level
  const users = [
    { id: 1, name: "John Smith", role: "Claims Specialist" },
    { id: 2, name: "Sarah Johnson", role: "Medical Coder" },
    { id: 3, name: "Michael Brown", role: "Claims Auditor" },
    { id: 4, name: "Emily Davis", role: "Provider Relations" },
    { id: 5, name: "David Wilson", role: "Member Services" },
  ]

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
    if (!propTask && taskId) {
      loadTaskDetails()
    }
    loadComments()
  }, [taskId, propTask])

  const loadTaskDetails = () => {
    try {
      // In a real app, this would fetch from an API
      // For now, we'll generate a sample task or get from localStorage
      const storedTasks = JSON.parse(localStorage.getItem("vistora_tasks") || "[]")
      const foundTask = storedTasks.find((t) => t.id === taskId)

      if (foundTask) {
        setTask(foundTask)
      } else {
        const sampleTask = {
          id: taskId,
          title: "Review High-Value Claim",
          description:
            "Review and verify the medical necessity for a high-value claim submission. Ensure all required documentation is present and procedures are properly coded.",
          type: "claim",
          priority: "high",
          status: "pending",
          assignee: "unassigned",
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          claimId: "CLM-2024-001234",
          estimatedHours: 2,
          tags: ["urgent", "high-value", "review-required"],
          claimData: {
            patient: {
              firstName: "John",
              lastName: "Smith",
              dateOfBirth: "1980-05-15",
              phone: "(555) 123-4567",
              email: "john.smith@email.com",
            },
            provider: {
              name: "City Medical Center",
              npi: "1234567890",
            },
            service: {
              dateOfService: "2024-01-15",
              diagnosis: {
                primary: "M79.3 - Panniculitis, unspecified",
              },
              procedures: [
                {
                  code: "99213",
                  description: "Office visit, established patient",
                  units: "1",
                  charges: "250.00",
                },
                {
                  code: "76700",
                  description: "Abdominal ultrasound",
                  units: "1",
                  charges: "450.00",
                },
              ],
            },
          },
        }
        setTask(sampleTask)
      }

      setLoading(false)
    } catch (error) {
      console.error("Error loading task details:", error)
      setLoading(false)
    }
  }

  const loadComments = () => {
    // Load comments from localStorage or generate sample comments
    const sampleComments = [
      {
        id: 1,
        author: "Dr. Sarah Wilson",
        content: "Initial review shows all documentation is present. Proceeding with medical necessity verification.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        type: "update",
      },
      {
        id: 2,
        author: "System",
        content: "Task assigned to Dr. Sarah Wilson",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        type: "system",
      },
      {
        id: 3,
        author: "Claims Manager",
        content: "High priority claim flagged for immediate review due to amount exceeding $500.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: "note",
      },
    ]
    setComments(sampleComments)
  }

  const handleStatusChange = (newStatus) => {
    if (!task) return

    const updatedTask = { ...task, status: newStatus }
    if (newStatus === "completed") {
      updatedTask.completedAt = new Date().toISOString()
    }

    setTask(updatedTask)

    addNotification("task", "Task Status Updated", `Task "${task.title}" status changed to ${newStatus}`, task.id)

    showToast(`Task status updated to ${newStatus}`, "success")

    // Add system comment
    const systemComment = {
      id: comments.length + 1,
      author: "System",
      content: `Task status changed to ${newStatus}`,
      timestamp: new Date().toISOString(),
      type: "system",
    }
    setComments([systemComment, ...comments])
  }

  const handleAssignTask = () => {
    if (!assignee.trim()) return

    const updatedTask = {
      ...task,
      assignee: assignee.trim(),
      status: task.status === "pending" ? "in_progress" : task.status,
    }
    setTask(updatedTask)

    addNotification("task", "Task Assigned", `Task "${task.title}" has been assigned to ${assignee}`, task.id)

    showToast(`Task assigned to ${assignee}`, "success")

    // Add system comment
    const systemComment = {
      id: comments.length + 1,
      author: "System",
      content: `Task assigned to ${assignee}`,
      timestamp: new Date().toISOString(),
      type: "system",
    }
    setComments([systemComment, ...comments])

    setShowAssignModal(false)
    setAssignee("")
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: "Current User", // In a real app, this would be the logged-in user
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      type: "comment",
    }

    setComments([comment, ...comments])
    setNewComment("")
    showToast("Comment added successfully", "success")
  }

  const handleViewClaim = () => {
    if (task?.claimId) {
      navigate(`/dashboard/claims?claimId=${task.claimId}`)
    }
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
    const date = new Date(dueDateString)
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
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

  const getCommentIcon = (type) => {
    switch (type) {
      case "system":
        return "⚙️"
      case "update":
        return "📝"
      case "note":
        return "💬"
      default:
        return "💬"
    }
  }

  // Assign Modal
  const AssignModal = () => {
    // const [selectedUser, setSelectedUser] = useState("") // Moved to top level
    // const users = [
    //   { id: 1, name: "John Smith", role: "Claims Specialist" },
    //   { id: 2, name: "Sarah Johnson", role: "Medical Coder" },
    //   { id: 3, name: "Michael Brown", role: "Claims Auditor" },
    //   { id: 4, name: "Emily Davis", role: "Provider Relations" },
    //   { id: 5, name: "David Wilson", role: "Member Services" },
    // ]

    const handleAssign = () => {
      if (selectedUser) {
        const updatedTask = {
          ...task,
          assignee: selectedUser,
          status: task.status === "pending" ? "in_progress" : task.status,
        }
        setTask(updatedTask)

        addNotification("task", "Task Assigned", `Task "${task.title}" has been assigned to ${selectedUser}`, task.id)

        showToast(`Task assigned to ${selectedUser}`, "success")

        // Add system comment
        const systemComment = {
          id: comments.length + 1,
          author: "System",
          content: `Task assigned to ${selectedUser}`,
          timestamp: new Date().toISOString(),
          type: "system",
        }
        setComments([systemComment, ...comments])

        setShowAssignModal(false)
      }
    }

    return showAssignModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👤</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Assign Task</h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-slate-600 mb-4">Select a team member to assign this task to:</p>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.name)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedUser === user.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.role}</div>
                    </div>
                    {selectedUser === user.name && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Or enter a custom assignee:</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Enter assignee name..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowAssignModal(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedUser && !assignee.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    ) : null
  }

  if (loading) {
    return <SkeletonLoader />
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Task Not Found</h3>
        <p className="text-slate-600 mb-6">The requested task could not be found.</p>
        <button
          onClick={() => navigate("/dashboard/tasks")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
        >
          Back to Tasks
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif]">
      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard/tasks")}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            ← Back
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getTypeIcon(task.type)}</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
              <p className="text-slate-600">Task ID: {task.id}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          {task.status !== "completed" && (
            <>
              {task.assignee === "unassigned" && (
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                >
                  Assign Task
                </button>
              )}
              <button
                onClick={() => handleStatusChange("completed")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
              >
                Mark Complete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Overview */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Task Overview</h2>
              <div className="flex space-x-2">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(task.status)}`}
                >
                  {task.status.replace("_", " ").toUpperCase()}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getPriorityColor(task.priority)}`}
                >
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-700">{task.description}</p>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Claim Information */}
          {task.type === "claim" && task.claimData && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-emerald-900">Related Claim Information</h2>
                <button
                  onClick={handleViewClaim}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold"
                >
                  View Related Claim
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Claim Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Claim ID:</span> {task.claimId}
                    </div>
                    <div>
                      <span className="font-medium">Username:</span> {task.username}
                    </div>
                    <div>
                      <span className="font-medium">Service Date:</span> {task.claimData.service?.dateOfService}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Patient Info</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">DOB:</span> {task.claimData.patient?.dateOfBirth}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {task.claimData.patient?.phone}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Provider</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {task.claimData.provider?.name}
                    </div>
                    <div>
                      <span className="font-medium">NPI:</span> {task.claimData.provider?.npi}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Diagnosis</h3>
                  <div className="text-sm">{task.claimData.service?.diagnosis?.primary}</div>
                </div>
              </div>

              {task.claimData.service?.procedures && (
                <div className="mt-4">
                  <h3 className="font-semibold text-emerald-900 mb-2">Procedures</h3>
                  <div className="space-y-2">
                    {task.claimData.service.procedures.map((proc, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="font-medium">
                          {proc.code} - {proc.description}
                        </div>
                        <div className="text-sm text-emerald-700">
                          Units: {proc.units} | Charges: ${proc.charges}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Comments & Updates</h2>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                >
                  Add Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getCommentIcon(comment.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-900">{comment.author}</span>
                        <span className="text-sm text-slate-500">{getTimeAgo(comment.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 ml-8">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Details */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Task Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-slate-500 mb-1">Type</div>
                <div className="text-slate-900 capitalize">{task.type}</div>
              </div>

              <div>
                <div className="text-sm font-semib old text-slate-500 mb-1">Assignee</div>
                <div className="text-slate-900">
                  {task.assignee === "unassigned" ? <span className="text-orange-600">Unassigned</span> : task.assignee}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-500 mb-1">Created</div>
                <div className="text-slate-900">{new Date(task.createdAt).toLocaleString()}</div>
                <div className="text-sm text-slate-500">{getTimeAgo(task.createdAt)}</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-500 mb-1">Due Date</div>
                <div className="text-slate-900">{new Date(task.dueDate).toLocaleString()}</div>
                <div
                  className={`text-sm ${getDaysUntilDue(task.dueDate) < 0 ? "text-red-600 font-semibold" : "text-slate-500"}`}
                >
                  {getDaysUntilDue(task.dueDate) < 0
                    ? `Overdue by ${Math.abs(getDaysUntilDue(task.dueDate))} days`
                    : `Due in ${getDaysUntilDue(task.dueDate)} days`}
                </div>
              </div>

              {task.estimatedHours && (
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Estimated Hours</div>
                  <div className="text-slate-900">{task.estimatedHours} hours</div>
                </div>
              )}

              {task.completedAt && (
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Completed</div>
                  <div className="text-slate-900">{new Date(task.completedAt).toLocaleString()}</div>
                  <div className="text-sm text-green-600">{getTimeAgo(task.completedAt)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Status Actions */}
          {task.status !== "completed" && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Update Status</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleStatusChange("pending")}
                  disabled={task.status === "pending"}
                  className="w-full px-4 py-2 bg-orange-100 text-orange-800 border border-orange-200 rounded-lg hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                >
                  Set as Pending
                </button>
                <button
                  onClick={() => handleStatusChange("in_progress")}
                  disabled={task.status === "in_progress"}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                >
                  Set as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange("completed")}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          )}

          {/* Related Tasks */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Tasks</h3>
            <div className="space-y-3">
              <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-slate-900">Review Patient History</div>
                <div className="text-sm text-slate-500">Due in 2 days</div>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-slate-900">Verify Insurance Coverage</div>
                <div className="text-sm text-slate-500">Completed 1 day ago</div>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-slate-900">Contact Provider for Additional Info</div>
                <div className="text-sm text-slate-500">Due in 5 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      <AssignModal />
    </div>
  )
}

export default TaskDetails
