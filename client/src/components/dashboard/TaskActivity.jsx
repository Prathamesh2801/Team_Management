import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import api from "../../utils/api";

export const TaskActivity = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-900">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
              <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {task.description}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 