import { useState } from "react"
import PageHeader from "./components/PageHeader.jsx"
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react"

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review pending claims", completed: false, priority: "High", dueDate: "2025-05-25" },
    { id: 2, title: "Submit monthly report", completed: true, priority: "Medium", dueDate: "2025-05-20" },
    { id: 3, title: "Update client information", completed: false, priority: "Low", dueDate: "2025-05-30" },
    { id: 4, title: "Schedule team meeting", completed: false, priority: "Medium", dueDate: "2025-05-22" },
  ])

  const [newTask, setNewTask] = useState("")

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = () => {
    if (newTask.trim() === "") return

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: "Medium",
      dueDate: new Date().toISOString().split("T")[0],
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="p-6">
      <PageHeader title="Tasks" />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-l"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r flex items-center" onClick={addTask}>
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Task</th>
                <th className="text-left p-2">Priority</th>
                <th className="text-left p-2">Due Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className={`border-b ${task.completed ? "bg-gray-50" : ""}`}>
                  <td className="p-2">
                    <button onClick={() => toggleTaskStatus(task.id)}>
                      {task.completed ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                    </button>
                  </td>
                  <td className={`p-2 ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-2">{task.dueDate}</td>
                  <td className="p-2">
                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteTask(task.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Tasks
