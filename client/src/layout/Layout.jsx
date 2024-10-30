import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <Sidebar />
      <Outlet />
    </div>
  );
};
