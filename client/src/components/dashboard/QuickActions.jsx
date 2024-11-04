import { Plus, Users, Calendar, CheckSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const QuickActions = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const navigate = useNavigate();

  const handleActionClick = (actionTitle) => {
    switch (actionTitle) {
      case "New Task":
        setShowNewTaskModal(true);
        break;
      case "Team Members":
        navigate("/team-members");
        break;
      case "Schedule":
        navigate("/schedule");
        break;
      case "My Tasks":
        navigate("/my-tasks");
        break;
      default:
        toast.error("Action not implemented");
    }
  };

  const actions = [
    {
      icon: <Plus className="h-5 w-5" />,
      title: "New Task",
      description: "Create a new task",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Members",
      description: "Manage team members",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Schedule",
      description: "View upcoming deadlines",
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "My Tasks",
      description: "View assigned tasks",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => handleActionClick(action.title)}
          className="flex items-center gap-4 rounded-lg bg-neutral-200 p-4 text-left transition-all hover:shadow-md dark:bg-neutral-900"
        >
          <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
            {action.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {action.description}
            </p>
          </div>
        </button>
      ))}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <CreateTaskModal 
          onClose={() => setShowNewTaskModal(false)}
          onSuccess={() => {
            setShowNewTaskModal(false);
            toast.success("Task created successfully!");
          }}
        />
      )}
    </div>
  );
};
