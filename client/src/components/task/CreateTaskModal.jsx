import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

export const CreateTaskModal = ({ onClose, onSuccess }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
    teamId: "",
    assignedTo: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", taskData);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
        <h2 className="mb-4 text-xl font-bold">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}; 