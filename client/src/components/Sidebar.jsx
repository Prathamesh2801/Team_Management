import { User2Icon, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      duration: 2000
    });
    
    // Delay logout and navigation to show toast
    setTimeout(() => {
      logout();
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-64 flex-col justify-between bg-neutral-900">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center p-4">
          <User2Icon className="h-6 w-6 text-red-600" />
          <p className="text-xl font-bold text-white">{user?.name}</p>
        </div>
        <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-white">Team Management</p>
          </div>
          <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-white">Dashboard</p>
            </div>
            <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">Teams</p>
            </div>
            <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
            <button 
              onClick={handleLogout}
              className="mt-auto w-full p-4 text-white hover:bg-neutral-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-left"
        toastOptions={{
          className:
            "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200",
          success: {
            icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          }
        }}
      />
    </div>
  );
};
