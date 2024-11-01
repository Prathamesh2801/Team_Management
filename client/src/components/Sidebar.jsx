import React, { useState } from "react";
import {
  User2Icon,
  CheckCircle,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Building2,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SidebarItem = ({ icon: Icon, text, onClick, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => (children ? setIsOpen(!isOpen) : onClick?.())}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-700 transition-colors duration-200 hover:bg-indigo-50 dark:text-neutral-300 dark:hover:bg-indigo-900/20"
      >
        {Icon && (
          <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        )}
        <span className="flex-1 text-left">{text}</span>
        {children && (
          <span className="text-neutral-400 dark:text-neutral-500">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </button>
      {children && isOpen && (
        <div className="ml-4 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      duration: 2000,
    });
    setTimeout(() => {
      logout();
      navigate("/");
    }, 1500);
  };

  const sidebarContent = (
    <>
      <div className="flex w-full flex-1 flex-col border-r-[1px] border-neutral-700 bg-neutral-200 dark:bg-neutral-900">
        <div className="bg-gradient-to-r from-indigo-50 to-neutral-200 p-3 dark:from-indigo-950 dark:to-neutral-900">
          <div className="flex items-center gap-2 rounded-lg bg-neutral-200/80 p-2 backdrop-blur-sm dark:bg-neutral-900/80">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800">
              <User2Icon className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {user?.name}'s Workspace
            </span>
          </div>
        </div>

        <span className="mx-auto my-4 h-[1px] w-[90%] border-0 bg-neutral-700"></span>

        <div className="px-3">
          <div className="flex items-center gap-2 rounded-md bg-neutral-200 px-3 py-1.5 text-sm text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400">
            <span>Quick Find</span>
            <span className="ml-auto rounded bg-neutral-200 px-1.5 py-0.5 text-xs dark:bg-neutral-700">
              ⌘K
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-1 px-3">
          <SidebarItem icon={LayoutDashboard} text="Dashboard" />
          <SidebarItem icon={Users} text="Team Management">
            <SidebarItem text="Engineering" />
            <SidebarItem text="Design" />
            <SidebarItem text="Marketing" />
          </SidebarItem>
          <SidebarItem icon={Building2} text="Teams">
            <SidebarItem text="Team One" />
            <SidebarItem text="Team Two" />
          </SidebarItem>
        </div>

        {/* <div className="mt-4 px-3">
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-neutral-700 hover:bg-indigo-50 dark:text-neutral-300 dark:hover:bg-indigo-900/20">
            <Plus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>New page</span>
          </button>
        </div> */}
      </div>

      <div className="mt-auto bg-neutral-200 p-3 dark:bg-neutral-900">
        <button
          onClick={handleLogout}
          className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 px-3 py-2 text-sm text-white transition-opacity duration-200 hover:opacity-90 dark:from-indigo-600 dark:to-indigo-700"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-lg dark:bg-neutral-800 lg:hidden"
      >
        {isMobileOpen ? (
          <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        ) : (
          <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 transform lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex h-full w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          {sidebarContent}
        </div>

        <div
          className={`-z-40 fixed inset-0 bg-neutral-900/20 dark:bg-black/50 backdrop-blur-sm transition-opacity ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />
      </div>

      <div className="hidden h-screen w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:flex">
        {sidebarContent}
      </div>

      <Toaster
        position="bottom-left"
        toastOptions={{
          className:
            "!bg-white !text-neutral-900 dark:!bg-neutral-800 dark:!text-neutral-200",
          success: {
            icon: (
              <CheckCircle className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            ),
          },
        }}
      />
    </>
  );
};
